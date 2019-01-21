/* tests go here; this will not be compiled when this package is used as a library*/
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)

basic.forever(function (){

    if (!(pins.digitalReadPin(DigitalPin.P1))) {
        let buf1=[0,0,0,0];
        let startcont = 6;
        let i = 0;
        let j = 0;
        let temp = 0;
        let startlow = pins.pulseIn(DigitalPin.P1, PulseValue.Low, 6000);

        let starthigh = pins.pulseIn(DigitalPin.P1, PulseValue.High, 6000);
        if (starthigh > 4500) { serial.writeNumber(1);return; }
        else if(starthigh < 1690) { serial.writeNumber(startlow);serial.writeNumber(2);serial.writeNumber(starthigh);return; }
        control.waitMicros(100);
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 8; j++) {
                
                buf1[i] >>= 1;
                temp = pins.pulseIn(DigitalPin.P1, PulseValue.High, 2000);
                if (temp > 560) {
                    buf1[i] |= 0x80;
                }
                control.waitMicros(200);
                
            }
       }
       control.waitMicros(1000);
        //serial.writeNumber(buf1[0]);
        //serial.writeNumber(buf1[1]);
        serial.writeNumber(buf1[2]);
        //serial.writeNumber(buf1[3]);
        return;
        

    }

    
    
    /*
    if (!(pins.digitalReadPin(DigitalPin.P1))) {
        //let buf1 = pins.createBuffer(4);            
        while (startcont--) { 
            control.waitMicros(150);
            if (pins.digitalReadPin(DigitalPin.P1)) { 
                return 3;
            }
        }
        
        while (!pins.digitalReadPin(DigitalPin.P1));

        control.waitMicros(1500);

        if (!(pins.digitalReadPin(DigitalPin.P1))) {
            return 1;
        }//lead_high_reconfirm

        while (pins.digitalReadPin(DigitalPin.P1)); //lead_high_end
        
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 8; j++) {
                
                while (!pins.digitalReadPin(DigitalPin.P1)); //dat_low_end
                buf1[i] >>= 1; 
                control.waitMicros(532);
                if (pins.digitalReadPin(DigitalPin.P1)) {
                    buf1[i] |= 0x80;
                }
                while (pins.digitalReadPin(DigitalPin.P1));
            }
        }
        serial.writeNumber(buf1[0]);
        serial.writeNumber(buf1[1]);
        serial.writeNumber(buf1[2]);
        serial.writeNumber(buf1[3]);
        return buf1[2];
    }
    else {
        return 9 ;  
    }*/


})