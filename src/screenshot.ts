import { showToast, Toast } from "@raycast/api";
import { connectKnownTargets } from "./lib/adb";
import { findOnlineDevice } from "./lib/device";
import { getKnownTargets } from "./lib/preferences";
import { takeScreenshot } from "./lib/screenshot";

export default async function Command() {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Taking screenshot...",
  });

  try {
    await connectKnownTargets(getKnownTargets());

    const device = await findOnlineDevice();
    if (!device) {
      throw new Error("No online device found.");
    }

    const path = await takeScreenshot();

    toast.style = Toast.Style.Success;
    toast.title = "Screenshot saved";
    toast.message = path;
  } catch (error: unknown) {
    toast.style = Toast.Style.Failure;
    toast.title = "Couldn't take screenshot";
    toast.message = error instanceof Error ? error.message : String(error);
  }
}