import { getAdbDevices, type AdbDevice } from "./adb";

export async function findOnlineDevice(): Promise<AdbDevice | undefined> {
  const devices = await getAdbDevices();

  return devices.find((device) => device.status === "device");
}
