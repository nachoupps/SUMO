// Pybricks master script template
// This template mirrors the working SUMO master script.
// Logic MUST NOT be modified. Only placeholder values are replaced.

export const PYBRICKS_TEMPLATE = `
from pybricks.hubs import InventorHub
from pybricks.pupdevices import Motor, UltrasonicSensor, Remote
from pybricks.parameters import Button, Color, Direction, Port
from pybricks.robotics import DriveBase

# --- HARDWARE SETUP ---
hub = InventorHub()

left_motor = Motor(Port.F, positive_direction=Direction.COUNTERCLOCKWISE)
right_motor = Motor(Port.E, positive_direction=Direction.CLOCKWISE)
drive_base = DriveBase(
    left_motor,
    right_motor,
    wheel_diameter=56,
    axle_track=80
)

motor_action = Motor(Port.D)
distance_sensor = UltrasonicSensor(Port.A)

# --- PARAMETERS ---
DRIVE_SPEED = {{DRIVE_SPEED}}
TURN_RATE = {{TURN_RATE}}
ACTION_SPEED = {{HAMMER_SPEED}}
ACTION_ANGLE = {{HAMMER_ANGLE}}
AUTO_DISTANCE = {{AUTO_DISTANCE}}

rc = Remote()
pressed = rc.buttons.pressed()
was_pressed = pressed

def new_press(button):
    return (button in pressed) and not (button in was_pressed)

# --- MODE 1 ---
def mode_1():
    speed = DRIVE_SPEED
    steering = TURN_RATE

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

# --- MODE 2 ---
def mode_2():
    current_speed = 0
    current_steering = 0
    if Button.LEFT_PLUS in pressed: current_speed = DRIVE_SPEED
    if Button.LEFT_MINUS in pressed: current_speed = -DRIVE_SPEED
    if Button.RIGHT_PLUS in pressed: current_steering = TURN_RATE
    if Button.RIGHT_MINUS in pressed: current_steering = -TURN_RATE

    drive_base.drive(current_speed, current_steering)

    if new_press(Button.RIGHT):
        motor_action.run_angle(ACTION_SPEED, ACTION_ANGLE)
        motor_action.run_angle(ACTION_SPEED, -ACTION_ANGLE)

# --- MODE 3 ---
def mode_3():
    current_speed = 0
    current_steering = 0
    if Button.LEFT_PLUS in pressed: current_speed = DRIVE_SPEED
    if Button.LEFT_MINUS in pressed: current_speed = -DRIVE_SPEED
    if Button.RIGHT_PLUS in pressed: current_steering = TURN_RATE
    if Button.RIGHT_MINUS in pressed: current_steering = -TURN_RATE

    drive_base.drive(current_speed, current_steering)

    if distance_sensor.distance() < AUTO_DISTANCE:
        motor_action.run_angle(ACTION_SPEED, ACTION_ANGLE)
        motor_action.run_angle(ACTION_SPEED, -ACTION_ANGLE)  # CORREGIDO

modes = (
    (mode_1, Color.GREEN),
    (mode_2, Color.ORANGE),
    (mode_3, Color.MAGENTA),
)

mode = 0

def set_mode(new_mode):
    global mode
    mode = new_mode
    hub.light.on(modes[mode][1])
    rc.light.on(modes[mode][1])

set_mode(mode)

while True:
    global pressed, was_pressed
    was_pressed = pressed
    pressed = rc.buttons.pressed()

    if new_press(Button.CENTER):
        set_mode((mode + 1) % len(modes))

    modes[mode][0]()
`;
