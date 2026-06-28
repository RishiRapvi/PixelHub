import { Toast, showToast } from "@raycast/api";
import { exec } from "child_process";
import { promisify } from "util";

const run = promisify(exec);

const ADB = "/opt/homebrew/bin/adb";
const SCRCPY = "/opt/homebrew/bin/scrcpy";

const IPS = [
  "192.168.68.66:5555",
  "192.168.68.75:5555",
];

const ENV = {
  ...process.env,
  PATH: "/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin",
};

export default async function Command() {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Looking for your Pixel...",
  });

  try {
    // Try every known IP
    for (const ip of IPS) {
      try {
        await run(`${ADB} connect ${ip}`, { env: ENV });
      } catch {
        // Ignore failed attempts
      }
    }

    // Get connected devices
    const { stdout } = await run(`${ADB} devices`, {
      env: ENV,
    });

    const devices = stdout
      .split("\n")
      .slice(1)
      .map((line) => line.trim())
      .filter((line) => line.endsWith("\tdevice"));

    if (devices.length === 0) {
      throw new Error("No online Pixel found.");
    }

    const serial = devices[0].split("\t")[0];

    toast.title = "Launching scrcpy...";

    exec(
      `${SCRCPY} -s ${serial}`,
      {
        env: ENV,
      },
      async (error, stdout, stderr) => {
        if (error) {
          console.error(stderr);

          await showToast({
            style: Toast.Style.Failure,
            title: "scrcpy failed",
            message: stderr || error.message,
          });

          return;
        }

        console.log(stdout);
      },
    );

    toast.style = Toast.Style.Success;
    toast.title = "Pixel mirrored!";
    toast.message = serial;
  } catch (err: any) {
    console.error(err);

    toast.style = Toast.Style.Failure;
    toast.title = "Couldn't mirror Pixel";
    toast.message = err.message;
  }
}