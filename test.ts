/* tests go here; this will not be compiled when this package is used as a library*/
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
let dat = 9;
let temp = 9;
basic.forever(function () {

    temp = XRBIT.XR_IRremote();
    /*if (dat != temp) { 
        dat = temp;
        serial.writeNumber(dat);

    }*/
    //serial.writeNumber(XRBIT.XR_IRremote())
})
