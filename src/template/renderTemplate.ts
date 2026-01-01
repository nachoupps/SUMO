import { PYBRICKS_TEMPLATE } from "./pybricksTemplate";
import { PARAMETERS } from "../model/config";

// Type representing the numeric configuration values
export type ParameterValues = {
    DRIVE_SPEED: number;
    TURN_RATE: number;
    HAMMER_SPEED: number;
    HAMMER_ANGLE: number;
    AUTO_DISTANCE: number;
};

// Default safe configuration (matches master script defaults)
export const DEFAULT_PARAMETER_VALUES: ParameterValues = {
    DRIVE_SPEED: PARAMETERS.DRIVE_SPEED.default,
    TURN_RATE: PARAMETERS.TURN_RATE.default,
    HAMMER_SPEED: PARAMETERS.HAMMER_SPEED.default,
    HAMMER_ANGLE: PARAMETERS.HAMMER_ANGLE.default,
    AUTO_DISTANCE: PARAMETERS.AUTO_DISTANCE.default,
};

// Render the Pybricks script by replacing placeholders
export function renderPybricksScript(
    values: ParameterValues
): string {
    let script = PYBRICKS_TEMPLATE;

    script = script.replace(/{{DRIVE_SPEED}}/g, String(values.DRIVE_SPEED));
    script = script.replace(/{{TURN_RATE}}/g, String(values.TURN_RATE));
    script = script.replace(/{{HAMMER_SPEED}}/g, String(values.HAMMER_SPEED));
    script = script.replace(/{{HAMMER_ANGLE}}/g, String(values.HAMMER_ANGLE));
    script = script.replace(/{{AUTO_DISTANCE}}/g, String(values.AUTO_DISTANCE));

    return script;
}
