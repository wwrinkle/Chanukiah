const Gpio = require('onoff').Gpio;
const settings = require('./settings');

let warmupInterval;
let warmupLightIndex = 0;

let candles = [];
if (Gpio.accessible) {
    candles = settings.CANDLES.map((pin) => {
        console.log(`setting candle pin ${pin} as out`);
        return new Gpio(pin, 'out');
    });
} else {
    candles = settings.CANDLES.map((pin) => {
        console.log(`mocking candle pin ${pin}`);
        return {
            writeSync: (value) => console.log(`mock pin ${pin} is set to ${value}`)
        }
    });
}

function clearCandles() {
    console.log('clearing candles');
    candles.forEach((candle, index) => {
        console.log(`Setting candle ${index} to 0`);
        candle.writeSync(0);
    });
}

function warmupPatternStart() {
    console.log('starting warmup pattern');
    warmupInterval = setInterval(() => {
        clearCandles();
        console.log(`Setting candle ${warmupLightIndex} to 1`);
        candles[warmupLightIndex].writeSync(1);
        warmupLightIndex++;
        if (warmupLightIndex >= settings.CANDLES.length) {
            warmupLightIndex = 0;
        }
    }, settings.WARMUP_INTERVAL);
}

function warmupPatternStop() {
    console.log('stopping warmup pattern');
    clearInterval(warmupInterval);
    clearCandles();
}

function lightCandels(day) {
    console.log('lighting candles')
    candles.forEach((candle, index) => {
        const value = day > index ? 0 : 1;
        console.log(`setting candle ${index} to ${value}`);
        candle.writeSync(value);
    });
}

module.exports = {
    lightCandels,
    warmupPatternStart,
    warmupPatternStop
};
