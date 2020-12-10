const rpio = require('rpio');
const settings = require('./settings');

let warmupInterval;
let evensAreOn = false;

rpio.init({ mapping: 'gpio' });

for (const candle of settings.CANDLES) {
    rpio.open(candle, rpio.OUTPUT, rpio.LOW);
}

function warmupPatternStart() {
    warmupInterval = setInterval(() => {
        settings.CANDLES.forEach((candle, i) => {
            const thisCandleIsOn = (evensAreOn && i % 2 === 0) || (!evensAreOn && i % 2 !== 0);
            rpio.write(candle, thisCandleIsOn ? rpio.HIGH : rpio.LOW);
        });
        evensAreOn = !evensAreOn;
    }, settings.WARMUP_INTERVAL);
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
