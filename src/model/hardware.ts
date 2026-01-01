// Fixed hardware definition for the SUMO robot
// This must never be changed by the UI

export enum Port {
    A = "A", // Ultrasonic Sensor
    D = "D", // Action motor
    E = "E", // Right drive motor
    F = "F", // Left drive motor
}

export const DRIVE_BASE_PORTS = {
    leftMotor: Port.F,
    rightMotor: Port.E,
} as const;

export const FIXED_HARDWARE = {
    ultrasonicSensor: Port.A,
    actionMotor: Port.D,
    driveBase: DRIVE_BASE_PORTS,
} as const;
