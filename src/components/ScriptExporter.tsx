import React from "react";
import { Parameters } from "./ParameterEditor";
import "./ScriptExporter.css";

interface ScriptExporterProps {
    params: Parameters;
    currentModeColor: string;
}

const ScriptExporter: React.FC<ScriptExporterProps> = ({ params, currentModeColor }) => {
    const generateScript = () => {
        return `
from pybricks.hubs import InventorHub
from pybricks.pupdevices import Motor, UltrasonicSensor, Remote
from pybricks.parameters import Button, Color, Direction, Port
from pybricks.robotics import DriveBase

hub = InventorHub()
left_motor = Motor(Port.F, positive_direction=Direction.COUNTERCLOCKWISE)
right_motor = Motor(Port.E, positive_direction=Direction.CLOCKWISE)
drive_base = DriveBase(left_motor, right_motor, wheel_diameter=56, axle_track=80)
motor_action = Motor(Port.D)
distance_sensor = UltrasonicSensor(Port.A)
rc = Remote()

# Global Parameters
DRIVE_SPEED = ${params.DRIVE_SPEED}
TURN_RATE = ${params.TURN_RATE}
ACTION_SPEED = ${params.ACTION_SPEED}
ACTION_ANGLE = ${params.ACTION_ANGLE}
AUTO_DISTANCE = ${params.AUTO_DISTANCE}

# Current Setup: ${currentModeColor.toUpperCase()} Mode
# --- Main Control Loop ---
`.trim();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateScript());
        // Using a subtle notification would be better, but keeping it simple as requested
        alert("🚀 ¡Script Pybricks copiado al portapapeles!");
    };

    return (
        <div className="script-exporter-card">
            <div className="exporter-header">
                <h3 className="section-title">
                    <span className="icon">📄</span> Pybricks Script Export
                </h3>
                <button className="copy-btn" onClick={handleCopy}>
                    Copy Script
                </button>
            </div>
            <div className="code-window">
                <pre><code>{generateScript()}</code></pre>
            </div>
        </div>
    );
};

export default ScriptExporter;
