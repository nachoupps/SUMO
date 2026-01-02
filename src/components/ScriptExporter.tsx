import type { Parameters } from "./ParameterEditor";
import "./ScriptExporter.css";

interface ScriptExporterProps {
    params: Parameters;
}

const ScriptExporter: React.FC<ScriptExporterProps> = ({ params }) => {
    const generateScript = () => {
        return `from pybricks.hubs import InventorHub
from pybricks.pupdevices import Motor, UltrasonicSensor, Remote
from pybricks.parameters import Button, Color, Direction, Port, Stop
from pybricks.robotics import DriveBase
from pybricks.tools import wait

# --- CONFIGURACIÓN DEL HARDWARE ---
hub = InventorHub()

left_motor = Motor(Port.F, positive_direction=Direction.COUNTERCLOCKWISE)
right_motor = Motor(Port.E, positive_direction=Direction.CLOCKWISE)
drive_base = DriveBase(left_motor, right_motor, wheel_diameter=56, axle_track=80)

motor_pala = Motor(Port.D) 
distancia = UltrasonicSensor(Port.A)

# --- VARIABLES DE CONTROL ---
DRIVE_SPEED = ${params.DRIVE_SPEED}
TURN_RATE = ${params.TURN_RATE}
HAMMER_SPEED = ${params.HAMMER_SPEED}
HAMMER_ANGLE = ${params.HAMMER_ANGLE}

rc = Remote()
pressed = rc.buttons.pressed()
was_pressed = pressed

def new_press(button):
    return (button in pressed) and not (button in was_pressed)

# --- MODO 1: CONDUCCIÓN CON CONTROL DE VELOCIDAD (VERDE) ---
def drive_mode():
    speed = DRIVE_SPEED
    steering = TURN_RATE
    
    # Si pulsas el botón central izquierdo, reduce velocidad al 30%
    if Button.LEFT in pressed:
        speed *= 0.3
        steering *= 0.3

    current_speed = 0
    current_steering = 0
    if Button.LEFT_PLUS in pressed: current_speed = speed
    if Button.LEFT_MINUS in pressed: current_speed = -speed
    if Button.RIGHT_PLUS in pressed: current_steering = steering
    if Button.RIGHT_MINUS in pressed: current_steering = -steering
    
    drive_base.drive(current_speed, current_steering)

# --- MODO 2: COMBATE MANUAL (NARANJA) ---
def combat_mode():
    current_speed = 0
    current_steering = 0
    if Button.LEFT_PLUS in pressed: current_speed = DRIVE_SPEED
    if Button.LEFT_MINUS in pressed: current_speed = -DRIVE_SPEED
    if Button.RIGHT_PLUS in pressed: current_steering = TURN_RATE
    if Button.RIGHT_MINUS in pressed: current_steering = -TURN_RATE
    drive_base.drive(current_speed, current_steering)
    
    # MARTILLAZO: Botón central derecho
    if new_press(Button.RIGHT):
        motor_pala.run_angle(HAMMER_SPEED, HAMMER_ANGLE) 
        motor_pala.run_angle(HAMMER_SPEED, -HAMMER_ANGLE) 

# --- MODO 3: CAZADOR AUTOMÁTICO (ROSA) ---
def auto_mode():
    current_speed = 0
    current_steering = 0
    if Button.LEFT_PLUS in pressed: current_speed = DRIVE_SPEED
    if Button.LEFT_MINUS in pressed: current_speed = -DRIVE_SPEED
    if Button.RIGHT_PLUS in pressed: current_steering = TURN_RATE
    if Button.RIGHT_MINUS in pressed: current_steering = -TURN_RATE
    drive_base.drive(current_speed, current_steering)

    if distancia.distance() < ${params.AUTO_DISTANCE}:
        distancia.lights.on(100)
        motor_pala.run_angle(HAMMER_SPEED, HAMMER_ANGLE) 
        motor_pala.run_angle(HAMMER_SPEED, -HAMMER_ANGLE)
    else:
        distancia.lights.off()

# --- LÓGICA DE MODOS ---
modes = (
    (drive_mode, Color.GREEN),
    (combat_mode, Color.ORANGE),
    (auto_mode, Color.MAGENTA),
)
mode = 0 

def set_mode(new_mode):
    global mode
    mode = new_mode 
    hub.light.on(modes[mode][1])
    rc.light.on(modes[mode][1])

set_mode(mode)

# --- BUCLE PRINCIPAL ---
while True:
    was_pressed = pressed
    pressed = rc.buttons.pressed()

    if new_press(Button.CENTER):
        set_mode((mode + 1) % len(modes))

    modes[mode][0]()
    wait(10)
`.trim();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateScript());
        alert("🚀 ¡Script Maestro 2.0 copiado al portapapeles!");
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
