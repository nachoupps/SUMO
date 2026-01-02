# 🤖 SUMO Bot Configurator

A visual configuration tool for LEGO SPIKE / Pybricks SUMO robots with remote control.

## Features

- **Visual Hub & Remote**: Interactive visualization of the LEGO Inventor Hub and Remote Control
- **3 Operational Modes**:
  - 🟢 **Mode 1 (Green)**: Driving control with optional slow mode
  - 🟠 **Mode 2 (Orange)**: Manual action trigger (hammer/flipper)
  - 🟣 **Mode 3 (Magenta)**: Automatic sensor-triggered action
- **Parameter Editor**: Adjust robot parameters like drive speed, turn rate, action angles
- **Script Export**: Generate ready-to-use Pybricks Python code

## Hardware Configuration

| Port | Device |
|------|--------|
| A | Ultrasonic Sensor |
| D | Action Motor (hammer/flipper) |
| E | Right Motor |
| F | Left Motor |

## Tech Stack

- React + TypeScript + Vite
- Modern CSS with dark theme and glassmorphism

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## License

MIT
