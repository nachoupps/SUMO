// Fixed hardware definition for the SUMO robot
// This must never be changed by the UI

export const ModeId = {
    MODE_1: 0,
    MODE_2: 1,
    MODE_3: 2,
} as const;

export type ModeId = (typeof ModeId)[keyof typeof ModeId];

export const ModeColor = {
    GREEN: "GREEN",
    ORANGE: "ORANGE",
    MAGENTA: "MAGENTA",
} as const;

export type ModeColor = (typeof ModeColor)[keyof typeof ModeColor];

export const Port = {
    A: "A", // Ultrasonic Sensor
    D: "D", // Action motor
    E: "E", // Right drive motor
    F: "F", // Left drive motor
} as const;

export type Port = (typeof Port)[keyof typeof Port];

export const DRIVE_BASE_PORTS = {
    leftMotor: Port.F,
    rightMotor: Port.E,
} as const;

export const FIXED_HARDWARE = {
    ultrasonicSensor: Port.A,
    actionMotor: Port.D,
    driveBase: DRIVE_BASE_PORTS,
} as const;
