/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

/**
 * 自定义图形块
 */

//% weight=5 color=#9900CC icon="\uf1b9"
namespace XRBIT {
    const XRBIT_ADDRESS = 0x17
    let IRreadflag = false;
    let IRreaddat = 0x00;
    export enum SER_NUM {
        S1 = 0x01,
        S2 = 0x02,
        S3 = 0x03,
        S4 = 0x04,
        S5 = 0x05,
        S6 = 0x06,
        S7 = 0x07,
        S8 = 0x08
    }
    export enum MovementGroups {
        //% blockId="goforward" block="goforward"
        goforward = 0x01,
        //% blockId="goback" block="goback"
        goback = 0x02,
        //% blockId="turnleft" block="turnleft"
        turnleft = 0x03,
        //% blockId="turnright" block="turnright"
        turnright = 0x04,
        //% blockId="stop" block="stop"
        stop = 0x00
    }
    
    export enum IRValue {
        Power = 162,
        Menu = 226,
        Test = 34,
        Plus = 2,
        Return = 194,
        Left = 224,
        Play = 168,
        Right = 144,
        Num0 = 104,
        Minus = 152,
        Cancle = 176,
        Num1 = 48,
        Num2 = 24,
        Num3 = 122,
        Num4 = 16,
        Num5 = 56,
        Num6 = 90,
        Num7 = 66,
        Num8 = 74,
        Num9 = 82 
         
    }
    export enum SubtepMovement {
        //% blockId="SubstepForward" block="SubstepForward"
        SubstepForward = 0x01,
        //% blockId="SubstepBack" block="SubstepBack"
        SubstepBack = 0x02,
        //% blockId="SubstepTurnleft" block="SubstepTurnleft"
        SubstepTurnleft = 0x03,
        //% blockId="SubstepTurnright" block="SubstepTurnright"
        SubstepTurnright = 0x04,
        //% blockId="stop" block="stop"
        stop = 0x00
    }
    function i2cwrite(addr: number, reg: number, value: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }

    function i2cread(addr: number, reg: number): number {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    /**
     * *****************************************************************
     * @param index
     */
    
    //% blockId=XRBIT_SetServoAngle block="SetServoAngle|Num %Num|Angle %Angle"
    //% weight=94
    //% blockGap=10
    //% color="#0fbc11"
    //% Num.min=1 Num.max=8 Angle.min=0 Angle.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function SetServoAngle(Num: SER_NUM, Angle: number): void {
        let buf1 = pins.createBuffer(2);
        let buf2 = pins.createBuffer(2);
        buf1[0] = 0xFF;
        buf1[1] = Num;
        buf2[0] = Angle;
        buf2[1] = 0xFF;
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf1);
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf2);
    }
    //% blockId=XRBIT_SetServoBot block="SetServoBot|%direction"
    //% weight=94
    //% blockGap=10
    //% color="#0fbc11"
    export function SetServoBot(direction: MovementGroups): void {
        let buf1 = pins.createBuffer(2);
        let buf2 = pins.createBuffer(2);
        buf1[0] = 0xFF;
        buf1[1] = 0x12;
        buf2[0] = direction;
        buf2[1] = 0xFF;
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf1);
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf2);
    }
    //% blockId=XRBIT_SetServoBotSubstep block="SetServoBotSubstep|%direction"
    //% weight=94
    //% blockGap=10
    //% color="#0fbc11"
    //% Step.min=0 Step.max=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function SetServoBotSubstep(direction: SubtepMovement, Step: number): void {
        let buf1 = pins.createBuffer(2);
        let buf2 = pins.createBuffer(2);
        buf1[0] = 0xFF;
        buf1[1] = 0x13;
        buf2[0] = direction;
        buf2[1] = 0xFF;
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf1);
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf2);
    }
    //% blockId=XRBIT_ReSetServoAngle block="ReSetServoAngle"
    //% weight=94
    //% blockGap=10
    //% color="#0fbc11"
    export function ReSetServoAngle(): void {
        let buf1 = pins.createBuffer(2);
        let buf2 = pins.createBuffer(2);
        buf1[0] = 0xFF;
        buf1[1] = 0x00;
        buf2[0] = 0x01;
        buf2[1] = 0xFF;
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf1);
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf2);
    }
    //% blockId=XRBIT_SaveServoAngle block="SaveServoAngle"
    //% weight=94
    //% blockGap=10
    //% color="#0fbc11"
    export function SaveServoAngle(): void {
        let buf1 = pins.createBuffer(2);
        let buf2 = pins.createBuffer(2);
        buf1[0] = 0xFF;
        buf1[1] = 0x11;
        buf2[0] = 0x01;
        buf2[1] = 0xFF;
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf1);
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf2);
    }

    //% blockId=XR_IRremote block = "XR_IRremote on |%IRValue| button pressed"
    //% color="#0fbc11"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function XR_IRremote(IRValue:IRValue): boolean {
        let irread: boolean = false;
        if (!IRreadflag) { 
            let reg = pins.createBuffer(1);
            reg[0] = 0x16;
            pins.i2cWriteBuffer(XRBIT_ADDRESS, reg);
            IRreaddat = pins.i2cReadNumber(XRBIT_ADDRESS, NumberFormat.UInt8BE);
            IRreadflag = true;
        }
        if (IRreaddat == IRValue) {
            irread = true;
        }
        else { 
            irread = false;
        }
        return irread;   
        
    }
    

}