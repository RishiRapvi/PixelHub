import { execFile } from "child_process";
import { promisify } from "util";

const run = promisify(execFile);

export const ADB = "/opt/homebrew/bin/adb";

export const ENV: NodeJS.ProcessEnv = {
  ...process.env,
  PATH: "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin",
};

export type AdbDevice = {
  serial: string;
  status: string;
};

export async function runAdb(args: string[]): Promise<{ stdout: string; stderr: string }> {
  return run(ADB, args, { env: ENV });
}

export async function connectKnownTargets(targets: string[]) {
  for (const target of targets) {
    try {
      await runAdb(["connect", target]);
    } catch {
      // Ignore unreachable targets.
    }
  }
}

export async function getAdbDevices(): Promise<AdbDevice[]> {
  const { stdout } = await runAdb(["devices"]);

  if (!stdout) {
    return [];
  }

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
