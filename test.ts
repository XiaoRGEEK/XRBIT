/* tests go here; this will not be compiled when this package is used as a library*/
basic.forever(function () {
    basic.pause(10)
    serial.writeNumber(XRBIT.XR_IRremote())
})