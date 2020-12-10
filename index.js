const data = require('./data');
const lights = require('./lights');
const settings = require('./settings');

lights.warmupPatternStart();

setTimeout(() => {
    lights.warmupPatternStop();
    data.getDayOfChanukah().then(day => {
        lights.warmupPatternStop();
        lights.lightCandels(day);
    });
}, settings.WARMUP_INTERVAL * 5);
