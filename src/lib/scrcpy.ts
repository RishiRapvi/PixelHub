import { exec } from "child_process";
import { ENV } from "./adb";

const SCRCPY = "/opt/homebrew/bin/scrcpy";

export function launchScrcpy(serial: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`${SCRCPY} -s ${serial}`, { env: ENV }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message));
        return;
      }

      if (stdout) {
        console.log(stdout);
      }

      resolve();
    });
  });
}
