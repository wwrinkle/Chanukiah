const rpio = require('rpio');
const settings = require('./settings');

let warmupInterval;
let isOn = false;

rpio.init({ mapping: 'gpio' });

for (const candle of settings.CANDLES) {
    console.log(`Setting up CANDLE no: ${candle}`);
    rpio.open(candle, rpio.OUTPUT, rpio.LOW);
}

function warmupPatternStart() {
    warmupInterval = setInterval(() => {
        console.log('--INTERVAL--');
        for (const candle of settings.CANDLES) {
            const candleIsOn = candle % 2 === 0  && isOn;
            console.log(`CANDLE no: ${candle} is ${ candleIsOn ? 'on' : 'off' }`);
            rpio.write(candle, ccandleIsOn ? rpio.HIGH : rpio.LOW);
        }
        isOn = !isOn;
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
