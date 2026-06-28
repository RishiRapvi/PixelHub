PixelHub

Control your Android device directly from Raycast.

PixelHub is an open-source Raycast extension that brings common Android tools into a fast, keyboard-driven workflow. It eliminates repetitive ADB commands by exposing everyday device actions as native Raycast commands.

⸻

Features

Mirror Device

Mirror your Android device wirelessly using scrcpy.

* Wireless ADB support
* Automatic connection to configured devices
* Launches scrcpy directly from Raycast

Battery

View live battery information.

Displays:

* Battery percentage
* Charging status
* Battery health
* Battery temperature

Example:

Battery
Device: Pixel 9 Pro XL
Level: 79%
Status: Discharging
Health: Good
Temperature: 33.7°C

Screenshot

Capture screenshots directly from your Android device.

* Saves screenshots to your Mac
* Timestamped filenames
* Works over USB or Wireless ADB

⸻

Installation

Requirements

* macOS
* Raycast
* Android Platform Tools (ADB)
* scrcpy

Install the required dependencies:

brew install android-platform-tools
brew install scrcpy

Clone the repository:

git clone https://github.com/RishiRapvi/PixelHub.git
cd PixelHub
npm install
npm run dev

⸻

Configuration

PixelHub uses Raycast Preferences.

Open:

Raycast
→ Extensions
→ PixelHub
→ Preferences

Enter your device’s Wireless ADB address.

Example:

192.168.1.123:5555

Multiple devices may be entered as a comma-separated list.

⸻

Project Structure

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

⸻

Current Commands

Command	Description
Mirror	Launches scrcpy and mirrors the connected Android device
Battery	Displays battery information including charge, health, and temperature
Screenshot	Captures a screenshot from the connected Android device

⸻

Roadmap

Completed

* Wireless ADB support
* Mirror command
* Battery command
* Screenshot command
* Configurable Wi-Fi IP address
* Modular architecture

Planned

* Device information
* APK installation
* Screen recording
* Clipboard synchronization
* File transfer
* Multiple device support
* Automatic device discovery

⸻

Vision

PixelHub aims to become a complete Android control center for macOS. Rather than opening Terminal or Android Studio for common tasks, developers and power users can perform them directly from Raycast through a consistent interface.

⸻

License

MIT License.
