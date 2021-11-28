const rpio = require('rpio');
const settings = require('./settings');

let warmupInterval;
let warmupLightIndex = 0;

rpio.init({ mapping: 'gpio' });

for (const candle of settings.CANDLES) {
    console.log(`setting candle pin ${candle} as OUTPUT`);
    rpio.open(candle, rpio.OUTPUT, rpio.LOW);
}

function clearCandles() {
    console.log('clearing candles');
    settings.CANDLES.forEach((candle, index) => {
        console.log(`Setting candle ${index} to HIGH`);
        rpio.write(candle, rpio.HIGH);
    });
}

function warmupPatternStart() {
    console.log('starting warmup pattern');
    warmupInterval = setInterval(() => {
        clearCandles();
        console.log(`Setting candle ${warmupLightIndex} to LOW`);
        rpio.write(settings.CANDLES[warmupLightIndex], rpio.LOW);
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
    settings.CANDLES.forEach((candle, index) => {
        console.log(`setting candle ${index} to ${ day > index ? 'LOW' : 'HIGH' }`)
        rpio.write(candle, day > index ? rpio.LOW : rpio.HIGH);
    });
}

module.exports = {
    lightCandels,
    warmupPatternStart,
    warmupPatternStop
};
