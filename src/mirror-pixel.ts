import { Toast, showToast } from "@raycast/api";
import { exec } from "child_process";
import { ENV, connectKnownTargets, getAdbDevices } from "./lib/adb";

const SCRCPY = "/opt/homebrew/bin/scrcpy";
const KNOWN_TCPIP_TARGETS = ["192.168.68.66:5555", "192.168.68.75:5555"];

type AdbDevice = {
  serial: string;
  status: string;
};

function chooseOnlineDevice(devices: AdbDevice[]): AdbDevice | undefined {
  return devices.find((device) => device.status === "device");
}

function launchScrcpy(serial: string) {
  exec(`${SCRCPY} -s ${serial}`, { env: ENV }, (error, stdout, stderr) => {
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
    await connectKnownTargets(KNOWN_TCPIP_TARGETS);

    const device = chooseOnlineDevice(await getAdbDevices());

    if (!device) {
      throw new Error("No online ADB device found. Connect over USB or enable ADB over Wi-Fi.");
    }

    toast.title = "Launching scrcpy...";
    toast.message = device.serial;

    launchScrcpy(device.serial);

    toast.style = Toast.Style.Success;
    toast.title = "Pixel mirrored!";
    toast.message = device.serial;
  } catch (error) {
    toast.style = Toast.Style.Failure;
    toast.title = "Couldn't mirror Pixel";
    toast.message = error instanceof Error ? error.message : String(error);
  }
}
