import { spawn } from "child_process";
import { ENV } from "./adb";

const SCRCPY = "/opt/homebrew/bin/scrcpy";

export function launchScrcpy(serial: string): void {
  const child = spawn(SCRCPY, ["-s", serial], {
    env: ENV,
    detached: true,
    stdio: "ignore",
  });

  child.unref();
}
