def on_received_number(receivedNumber):
    if receivedNumber == 0:
        green_light()
    else:
        TRaffic_light_cycle(False, False)
radio.on_received_number(on_received_number)

def green_light():
    global range2
    range2 = strip.range(0, 3)
    range2.show_color(neopixel.colors(NeoPixelColors.BLACK))
    range2 = strip.range(2, 1)
    range2.show_color(neopixel.colors(NeoPixelColors.GREEN))

def on_button_pressed_a():
    TRaffic_light_cycle(False, True)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    TRaffic_light_cycle(False, False)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    TRaffic_light_cycle(True, True)
input.on_button_pressed(Button.B, on_button_pressed_b)

def red_light():
    global range2
    range2 = strip.range(0, 3)
    range2.show_color(neopixel.colors(NeoPixelColors.BLACK))
    range2 = strip.range(0, 1)
    range2.show_color(neopixel.colors(NeoPixelColors.RED))
def yellow_light():
    global range2
    range2 = strip.range(0, 3)
    range2.show_color(neopixel.colors(NeoPixelColors.BLACK))
    range2 = strip.range(1, 1)
    range2.show_color(neopixel.colors(NeoPixelColors.YELLOW))
def TRaffic_light_cycle(sound_: bool, walk: bool):
    basic.pause(3000)
    green_light()
    if walk:
        for index2 in range(21):
            if sound_:
                music.play_tone(440, music.beat(BeatFraction.WHOLE))
            basic.show_icon(IconNames.STICK_FIGURE)
            basic.show_number(20 - index2)
    basic.pause(1000)
    basic.show_leds("""
        . . # # .
                . . # # #
                . # # # #
                . # # # #
                . # # # .
    """)
    yellow_light()
    basic.pause(3700)
    if walk:
        basic.show_leds("""
            . . # # .
                        . . # # #
                        . # # # #
                        . # # # #
                        . # # # .
        """)
    red_light()
count = 0
range2: neopixel.Strip = None
strip: neopixel.Strip = None
strip = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB)
strip.set_brightness(255)
basic.show_leds("""
    . . # # .
        . . # # #
        . # # # #
        . # # # #
        . # # # .
""")
red_light()
distance = 6

def on_forever():
    global distance, count
    for index in range(4):
        pins.digital_write_pin(DigitalPin.P8, 0)
        control.wait_micros(2)
        pins.digital_write_pin(DigitalPin.P8, 1)
        control.wait_micros(10)
        pins.digital_write_pin(DigitalPin.P8, 0)
        distance = pins.pulse_in(DigitalPin.P13, PulseValue.HIGH) / 58
        if distance <= 5:
            count += 1
        if count == 4:
            TRaffic_light_cycle(False, False)
            count = 0
        basic.show_leds("""
            . . # # .
                        . . # # #
                        . # # # #
                        . # # # #
                        . # # # .
        """)
    count = 0
basic.forever(on_forever)
