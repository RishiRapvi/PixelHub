import { Toast, showToast } from "@raycast/api";
import { connectKnownTargets } from "./lib/adb";
import { findOnlineDevice } from "./lib/device";
import { launchScrcpy } from "./lib/scrcpy";
import { getKnownTargets } from "./lib/preferences";

export default async function Command() {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Looking for your Pixel...",
  });

  try {
    await connectKnownTargets(getKnownTargets());

    const device = await findOnlineDevice();

    if (!device) {
      throw new Error("No online ADB device found. Connect over USB or enable ADB over Wi-Fi.");
    }

    toast.title = "Launching scrcpy...";
    toast.message = device.serial;

    await launchScrcpy(device.serial);

    toast.style = Toast.Style.Success;
    toast.title = "Pixel mirrored!";
    toast.message = device.serial;
  } catch (error: unknown) {
    toast.style = Toast.Style.Failure;
    toast.title = "Couldn't mirror Pixel";
    toast.message = error instanceof Error ? error.message : String(error);
  }
}
