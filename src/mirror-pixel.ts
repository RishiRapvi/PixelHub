import { Toast, showToast } from "@raycast/api";
import { exec, execFile } from "child_process";
import { promisify } from "util";

const run = promisify(execFile);

const ADB = "/opt/homebrew/bin/adb";
const SCRCPY = "/opt/homebrew/bin/scrcpy";
const KNOWN_TCPIP_TARGETS = ["192.168.68.66:5555", "192.168.68.75:5555"];

const ENV: NodeJS.ProcessEnv = {
  ...process.env,
  PATH: "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin",
};

type AdbDevice = {
  serial: string;
  status: string;
};

async function runAdb(args: string[]) {
  return run(ADB, args, { env: ENV });
}

async function connectKnownTargets() {
  for (const target of KNOWN_TCPIP_TARGETS) {
    try {
      await runAdb(["connect", target]);
    } catch {
      // Ignore unreachable saved IPs.
    }
  }
}

async function getAdbDevices(): Promise<AdbDevice[]> {
  const { stdout } = await runAdb(["devices"]);

  return stdout
    .split("\n")
    .slice(1)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [serial = "", status = ""] = line.split(/\s+/);
      return { serial, status };
    });
}

function chooseOnlineDevice(devices: AdbDevice[]): AdbDevice | undefined {
  return devices.find((device) => device.status === "device");
}

function launchScrcpy(serial: string) {
  const command = `${SCRCPY} -s ${serial}`;

  exec(command, { env: ENV }, (error, stdout, stderr) => {
    if (error) {
      console.error(stderr || error.message);
      return;
    }

    if (stdout) {
      console.log(stdout);
    }
  });
}

export default async function Command() {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Looking for your Pixel...",
  });

  try {
    await connectKnownTargets();

    const devices = await getAdbDevices();
    const device = chooseOnlineDevice(devices);

    if (!device) {
      throw new Error("No online ADB device found. Connect over USB or enable ADB over Wi-Fi.");
    }

    toast.title = "Launching scrcpy...";
    toast.message = device.serial;

    launchScrcpy(device.serial);

    toast.style = Toast.Style.Success;
    toast.title = "Pixel mirrored!";
    toast.message = device.serial;
  } catch (error: unknown) {
    console.error(error);

    toast.style = Toast.Style.Failure;
    toast.title = "Couldn't mirror Pixel";
    toast.message = error instanceof Error ? error.message : String(error);
  }
}
