import { ModeId } from "./modes";
import { RemoteButton } from "./buttons";

// Numeric parameters exposed to the UI
export type NumericParameter = {
    min: number;
    max: number;
    default: number;
};

// Parameters that already exist in the Pybricks script
export const PARAMETERS = {
    DRIVE_SPEED: { min: 50, max: 500, default: 200 },
    TURN_RATE: { min: 50, max: 300, default: 150 },
    HAMMER_SPEED: { min: 200, max: 1500, default: 1000 },
    HAMMER_ANGLE: { min: 10, max: 180, default: 90 },
    AUTO_DISTANCE: { min: 30, max: 300, default: 100 },
} as const;

export type ButtonAction =
    | "DRIVE_FORWARD"
    | "DRIVE_BACKWARD"
    | "TURN_LEFT"
    | "TURN_RIGHT"
    | "ACTION";

export type ModeButtonMap = {
    mode: ModeId;
    buttons: Partial<Record<RemoteButton, ButtonAction>>;
};
