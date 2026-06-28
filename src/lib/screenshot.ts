import { createWriteStream } from "fs";
import { homedir } from "os";
import { join } from "path";
import { spawn } from "child_process";
import { ADB, ENV } from "./adb";

function timestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

export async function takeScreenshot(): Promise<string> {
  const destination = join(homedir(), "Desktop", `PixelHub-${timestamp()}.png`);

  return new Promise((resolve, reject) => {
    const out = createWriteStream(destination);

    const adb = spawn(ADB, ["exec-out", "screencap", "-p"], {
      env: ENV,
    });

    adb.stdout.pipe(out);

    adb.on("error", reject);

    adb.on("close", (code) => {
      out.close();

      if (code === 0) {
        resolve(destination);
      } else {
        reject(new Error(`adb exited with code ${code}`));
      }
    });
  });
}