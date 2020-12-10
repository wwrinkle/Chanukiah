const rpio = require('rpio');
const settings = require('./settings');

let warmupInterval;
let warmupLightIndex = 0;

rpio.init({ mapping: 'gpio' });

for (const candle of settings.CANDLES) {
    rpio.open(candle, rpio.OUTPUT, rpio.LOW);
}

function clearCandles() {
    for (const candle of settings.CANDLES) {
        rpio.write(candle, rpio.HIGH);
    }
}

function warmupPatternStart() {
    warmupInterval = setInterval(() => {
        clearCandles();
        rpio.write(settings.CANDLES[warmupLightIndex], rpio.LOW);
        warmupLightIndex++;
        if (warmupLightIndex >= settings.CANDLES.length) {
            warmupLightIndex = 0;
        }
    }, settings.WARMUP_INTERVAL);
}

function warmupPatternStop() {
    clearInterval(warmupInterval);
    clearCandles();
}

function lightCandels(day) {
    settings.CANDLES.forEach((candle, index) => {
        rpio.write(candle, day > index ? rpio.LOW : rpio.HIGH);
    });
}

module.exports = {
    lightCandels,
    warmupPatternStart,
    warmupPatternStop
};
