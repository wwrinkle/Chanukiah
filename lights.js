const rpio = require('rpio');
const settings = require('./settings');

rpio.init({ mapping: 'gpio' });

for (candle of settings.CANDLES) {
    rpio.open(candle, rpio.OUTPUT, rpio.LOW);
}

function lightCandels(day) {
    const candles = settings.CANDLES.slice(0, day);
    for (candle of candles) {
        rpio.write(candle, rpio.HIGH);
    }
}

module.exports = {
    lightCandels
};
