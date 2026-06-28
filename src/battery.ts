import { Detail } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { createElement } from "react";
import { connectKnownTargets } from "./lib/adb";
import { getBatteryInfo } from "./lib/battery";
import { findOnlineDevice } from "./lib/device";
import { getKnownTargets } from "./lib/preferences";

async function loadBatteryMarkdown(): Promise<string> {
  await connectKnownTargets(getKnownTargets());

  const device = await findOnlineDevice();
  if (!device) {
    throw new Error("No online device found.");
  }

  const battery = await getBatteryInfo();

  return `# 🔋 Battery\n\n- **Device:** ${device.serial}\n- **Level:** ${battery.level}%\n- **Status:** ${battery.status}\n- **Health:** ${battery.health}\n- **Temperature:** ${battery.temperature.toFixed(1)}°C`;
}

export default function Command() {
  const { data, error, isLoading } = usePromise(loadBatteryMarkdown);

  if (error) {
    return createElement(Detail, {
      markdown: `# Battery Error\n\n${error instanceof Error ? error.message : String(error)}`,
    });
  }

  return createElement(Detail, {
    isLoading,
    markdown: data ?? "# 🔋 Battery\n\nLoading...",
  });
}
