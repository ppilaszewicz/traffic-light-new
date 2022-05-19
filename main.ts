radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        green_light()
    } else {
        TRaffic_light_cycle(false, false)
    }
})
function green_light () {
    range2 = strip.range(0, 3)
    range2.showColor(neopixel.colors(NeoPixelColors.Black))
    range2 = strip.range(2, 1)
    range2.showColor(neopixel.colors(NeoPixelColors.Green))
}
input.onButtonPressed(Button.A, function () {
    doSomething(true, true)
})
function doSomething (sound: boolean, walk: boolean) {
    green_light()
    if (walk) {
        for (let index2 = 0; index2 <= 20; index2++) {
            basic.showIcon(IconNames.StickFigure)
            basic.showNumber(20 - index2)
        }
    }
    basic.pause(1000)
    basic.showLeds(`
        . . # # .
        . . # # #
        . # # # #
        . # # # #
        . # # # .
        `)
    yellow_light()
    basic.pause(3700)
    if (walk) {
        basic.showLeds(`
            . . # # .
            . . # # #
            . # # # #
            . # # # #
            . # # # .
            `)
    }
    red_light()
}
input.onButtonPressed(Button.AB, function () {
    TRaffic_light_cycle(false, false)
})
input.onButtonPressed(Button.B, function () {
    green_light()
    for (let index2 = 0; index2 <= 20; index2++) {
        music.playTone(440, music.beat(BeatFraction.Whole))
        basic.showIcon(IconNames.StickFigure)
        basic.showNumber(20 - index2)
        basic.pause(1000)
        basic.showLeds(`
            . . # # .
            . . # # #
            . # # # #
            . # # # #
            . # # # .
            `)
    }
    yellow_light()
    basic.pause(3700)
    basic.showLeds(`
        . . # # .
        . . # # #
        . # # # #
        . # # # #
        . # # # .
        `)
    red_light()
})
function red_light () {
    range2 = strip.range(0, 3)
    range2.showColor(neopixel.colors(NeoPixelColors.Black))
    range2 = strip.range(0, 1)
    range2.showColor(neopixel.colors(NeoPixelColors.Red))
}
function yellow_light () {
    range2 = strip.range(0, 3)
    range2.showColor(neopixel.colors(NeoPixelColors.Black))
    range2 = strip.range(1, 1)
    range2.showColor(neopixel.colors(NeoPixelColors.Yellow))
}
function TRaffic_light_cycle (sound_: boolean, walk: boolean) {
    basic.pause(3000)
}
let count = 0
let range2: neopixel.Strip = null
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB)
strip.setBrightness(255)
basic.showLeds(`
    . . # # .
    . . # # #
    . # # # #
    . # # # #
    . # # # .
    `)
red_light()
let distance = 6
basic.forever(function () {
    for (let index = 0; index < 4; index++) {
        pins.digitalWritePin(DigitalPin.P8, 0)
        control.waitMicros(2)
        pins.digitalWritePin(DigitalPin.P8, 1)
        control.waitMicros(10)
        pins.digitalWritePin(DigitalPin.P8, 0)
        distance = pins.pulseIn(DigitalPin.P13, PulseValue.High) / 58
        if (distance <= 5) {
            count += 1
        }
        if (count == 4) {
            doSomething(false, false)
            count = 0
        }
    }
    count = 0
})
