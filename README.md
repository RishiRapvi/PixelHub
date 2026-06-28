# PixelHub

Control your Android device directly from Raycast.

PixelHub is an open-source Raycast extension that brings common Android tools into a fast, keyboard-driven workflow. Instead of opening Terminal or Android Studio, you can mirror your device, view battery information, take screenshots, and more—all from Raycast.

---

## Features

### Mirror Device

Mirror your Android device wirelessly using **scrcpy**.

- Wireless ADB support
- Automatically connects to configured devices
- Launches `scrcpy` directly from Raycast

### Battery

View live battery information.

Displays:

- Battery percentage
- Charging status
- Battery health
- Battery temperature

Example:

```text
Battery

Device: Pixel 9 Pro XL
Level: 79%
Status: Discharging
Health: Good
Temperature: 33.7°C
```

### Screenshot

Capture screenshots directly from your Android device.

- Saves screenshots to your Mac
- Timestamped filenames
- Works over USB or Wireless ADB

---

## Installation

### Requirements

- macOS
- Raycast
- Android Platform Tools (ADB)
- scrcpy

Install the required dependencies:

```bash
brew install android-platform-tools
brew install scrcpy
```

Clone the repository:

```bash
git clone https://github.com/RishiRapvi/PixelHub.git
cd PixelHub
npm install
npm run dev
```

---

## Configuration

Open Raycast Settings:

```
Raycast
→ Extensions
→ PixelHub
→ Preferences
```

Enter your device's Wireless ADB address.

Example:

```text
192.168.1.123:5555
```

Multiple devices can be entered as a comma-separated list.

---

## Commands

| Command | Description |
|---------|-------------|
| Mirror | Wirelessly mirrors your Android device using scrcpy |
| Battery | Displays battery percentage, status, health, and temperature |
| Screenshot | Captures a screenshot and saves it to your Mac |

---

## Project Structure

```text
src/
├── mirror-pixel.ts
├── battery.ts
├── screenshot.ts
│
└── lib/
    ├── adb.ts
    ├── battery.ts
    ├── device.ts
    ├── preferences.ts
    ├── scrcpy.ts
    └── screenshot.ts
```

---

## Roadmap

### Completed

- Wireless ADB support
- Mirror command
- Battery command
- Screenshot command
- Configurable Wi-Fi IP preferences
- Modular architecture

### Planned

- Device information
- APK installer
- Screen recording
- Clipboard synchronization
- File transfer
- Multiple device support
- Automatic device discovery

---

## Contributing

Contributions, feature requests, and bug reports are welcome.

If you'd like to improve PixelHub, feel free to open an issue or submit a pull request.

---

## License

MIT License.
