import { shell } from "./adb";

export type BatteryInfo = {
  level: number;
  status: string;
  health: string;
  temperature: number;
};

const STATUS: Record<number, string> = {
  1: "Unknown",
  2: "Charging",
  3: "Discharging",
  4: "Not Charging",
  5: "Full",
};

const HEALTH: Record<number, string> = {
  1: "Unknown",
  2: "Good",
  3: "Overheat",
  4: "Dead",
  5: "Over Voltage",
  6: "Failure",
  7: "Cold",
};

function getValue(output: string, key: string): string {
  const line = output.split("\n").find((entry) => entry.trim().startsWith(`${key}:`));

  return line?.split(":")[1]?.trim() ?? "";
}

export async function getBatteryInfo(): Promise<BatteryInfo> {
  const output = await shell(["dumpsys", "battery"]);

  return {
    level: Number(getValue(output, "level")),
    status: STATUS[Number(getValue(output, "status"))] ?? "Unknown",
    health: HEALTH[Number(getValue(output, "health"))] ?? "Unknown",
    temperature: Number(getValue(output, "temperature")) / 10,
  };
}
