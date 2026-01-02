import React from "react";
import type { Parameters } from "./ParameterEditor";
import "./ScriptExporter.css";

interface ScriptExporterProps {
    params: Parameters;
}

const ScriptExporter: React.FC<ScriptExporterProps> = ({ params }) => {
    const generateScript = () => {
        return `from pybricks.hubs import InventorHub
from pybricks.pupdevices import Motor, UltrasonicSensor, Remote
from pybricks.parameters import Button, Color, Direction, Port
from pybricks.robotics import DriveBase
from pybricks.tools import wait

# --- Hardware Setup ---
hub = InventorHub()
left_motor = Motor(Port.F, positive_direction=Direction.COUNTERCLOCKWISE)
right_motor = Motor(Port.E, positive_direction=Direction.CLOCKWISE)
drive_base = DriveBase(left_motor, right_motor, wheel_diameter=56, axle_track=80)
motor_action = Motor(Port.D)
distance_sensor = UltrasonicSensor(Port.A)

# Ensure connection to Remote
try:
    rc = Remote()
    hub.display.hex('00FF00') # Green if connected
except:
    hub.display.hex('FF0000') # Red if error
    wait(1000)

# --- Parameters ---
DRIVE_SPEED = ${params.DRIVE_SPEED}
TURN_RATE = ${params.TURN_RATE}
ACTION_SPEED = ${params.ACTION_SPEED}
ACTION_ANGLE = ${params.ACTION_ANGLE}
AUTO_DISTANCE = ${params.AUTO_DISTANCE}

# --- State ---
mode = 1 # 1: Conducción, 2: Combate, 3: Automático
MODES_COUNT = 3
COLORS = [Color.GREEN, Color.ORANGE, Color.MAGENTA]

def set_mode(new_mode):
    global mode
    mode = new_mode
    hub.light.on(COLORS[mode-1])
    print("Mode changed to:", mode)

set_mode(1)

# --- Main Loop ---
while True:
    buttons = rc.buttons.pressed()
    
    # Mode Switching (Center Button)
    if Button.CENTER in buttons:
        new_mode = mode + 1
        if new_mode > MODES_COUNT: new_mode = 1
        set_mode(new_mode)
        while Button.CENTER in rc.buttons.pressed(): wait(10) # Wait for release

    # Movement Logic (Common)
    drive = 0
    turn = 0
    if Button.LEFT_PLUS in buttons: drive = DRIVE_SPEED
    elif Button.LEFT_MINUS in buttons: drive = -DRIVE_SPEED
    if Button.RIGHT_PLUS in buttons: turn = TURN_RATE
    elif Button.RIGHT_MINUS in buttons: turn = -TURN_RATE
    
    drive_base.drive(drive, turn)

    # Special Logic per Mode
    if mode == 2: # COMBATE
        if Button.RIGHT in buttons:
            motor_action.run_angle(ACTION_SPEED, ACTION_ANGLE)
            motor_action.run_angle(ACTION_SPEED, -ACTION_ANGLE)
            
    elif mode == 3: # AUTOMÁTICO
        if distance_sensor.distance() < AUTO_DISTANCE:
            hub.display.pixel(2, 2, 100) # Sight indicator
            motor_action.run_angle(ACTION_SPEED, ACTION_ANGLE)
            motor_action.run_angle(ACTION_SPEED, -ACTION_ANGLE)
        else:
            hub.display.pixel(2, 2, 0)

    wait(20)
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
