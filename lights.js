const rpio = require('rpio');
const settings = require('./settings');

let warmupInterval;
let isOn = false;

rpio.init({ mapping: 'gpio' });

for (candle of settings.CANDLES) {
    rpio.open(candle, rpio.OUTPUT, rpio.LOW);
}

function warmupPatternStart() {
    warmupInterval = setInterval(() => {
        for (const candle of settings.CANDLES) {
            rpio.write(candle, candle % 2 === 0  && isOn ? rpio.HIGH : rpio.LOW);
        }
        isOn = !isOn;
    }, ssettings.WARMUP_INTERVAL);
}

function warmupPatternStop() {
    clearInterval(warmupInterval);
}

function lightCandels(day) {
    const candles = settings.CANDLES.slice(0, day);
    for (const candle of candles) {
        rpio.write(candle, rpio.HIGH);
    }
}

module.exports = {
    lightCandels,
    warmupPatternStart,
    warmupPatternStop
};
