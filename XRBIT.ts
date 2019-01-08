/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

/**
 * 自定义图形块
 */

enum REGISTER {
    IODIRA = 0x00,
    IODIRB = 0x01,
    IPOLA = 0x02,
    IPOLB = 0x03,
    GPINTENA = 0x04,
    GPINTENB = 0x05,
    DEFVALA = 0x06,
    DEFVALB = 0x07,
    INTCONA = 0x08,
    INTCONB = 0x09,
    IOCONA = 0x0A,
    IOCONB = 0x0B,
    GPPUA = 0x0C,
    GPPUB = 0x0D,
    INTFA = 0x0E,
    INTFB = 0x0F,
    INTCAPA = 0x10,
    INTCAPB = 0x11,
    GPIOA = 0x12,
    GPIOB = 0x13,
    OLATA = 0x14,
    OLATB = 0x15
}

enum PIN {
    A = 0,
    B = 1
}

//% weight=5 color=#9900CC icon="\uf53b"
namespace XRBIT {
    const XRBIT_ADDRESS = 0x20

    const XRBIT_IODIRA = 0x00
    const XRBIT_IPOLA = 0x02
    const XRBIT_GPINTENA = 0x04
    const XRBIT_DEFVALA = 0x06
    const XRBIT_INTCONA = 0x08
    const XRBIT_IOCONA = 0x0A
    const XRBIT_GPPUA = 0x0C
    const XRBIT_INTFA = 0x0E
    const XRBIT_INTCAPA = 0x10
    const XRBIT_GPIOA = 0x12
    const XRBIT_OLATA = 0x14

    const XRBIT_IODIRB = 0x01
    const XRBIT_IPOLB = 0x03
    const XRBIT_GPINTENB = 0x05
    const XRBIT_DEFVALB = 0x07
    const XRBIT_INTCONB = 0x09
    const XRBIT_IOCONB = 0x0B
    const XRBIT_GPPUB = 0x0D
    const XRBIT_INTFB = 0x0F
    const XRBIT_INTCAPB = 0x11
    const XRBIT_GPIOB = 0x13
    const XRBIT_OLATB = 0x15

    let initialized = false

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

    function initXRBIT(): void {
        for (let regAddr = 0; regAddr < 22; regAddr++) {
            if (regAddr == 0 || regAddr == 1) {
                i2cwrite(XRBIT_ADDRESS, regAddr, 0xFF);
            }
            else {
                i2cwrite(XRBIT_ADDRESS, regAddr, 0x00);
            }
        }

        //configue all PinA output
        i2cwrite(XRBIT_ADDRESS, XRBIT_IODIRA, 0x00);

        //configue all PinB input
        i2cwrite(XRBIT_ADDRESS, XRBIT_IODIRB, 0xFF);
        //configue all PinB pullUP
        i2cwrite(XRBIT_ADDRESS, XRBIT_GPPUB, 0xFF);

        initialized = true;
    }


    /**
	 *Read data from the register
	 * @param reg [0-21] register of XRBIT; eg: 0, 15, 23
	*/
    //% blockId=ReadReg block="Read register |%reg| data"
    //% weight=65
    export function ReadReg(reg: REGISTER): number {
        let val = i2cread(XRBIT_ADDRESS, reg);
        return val;
    }


	/**
	 * WriteData to PinA or PinB
	 * @param pin [0-1] choose PinA or PinB; eg: 0, 1
     * @param value [0-255] pulse of servo; eg: 128, 0, 255
	*/
    //% blockId=WritePin block="Set P |%pin| value |%value|"
    //% weight=75
    //% value.min=0 value.max=255
    export function WritePin(pin: PIN, value: number): void {
        if (!initialized) {
            initXRBIT();
        }
        if (pin == 0) {
            i2cwrite(XRBIT_ADDRESS, XRBIT_GPIOA, value);
        }
        else {
            i2cwrite(XRBIT_ADDRESS, XRBIT_GPIOB, value);
        }
    }

	/**
	 *ReadData From PinA or PinB 
	 * @param pin [0-1] choose PinA or PinB; eg: 0, 1
	*/
    //% blockId=ReadPin block="Read data from |%pin|"
    //% weight=85
    export function ReadPin(pin: PIN): number {
        if (!initialized) {
            initXRBIT();
        }
        if (pin == 0) {
            let val = i2cread(XRBIT_ADDRESS, XRBIT_GPIOA);
            return val;
        }
        else {
            let val = i2cread(XRBIT_ADDRESS, XRBIT_GPIOB);
            return val;
        }
    }
}