const data = require('./data');
const lights = require('./lights');
const settings = require('./settings');

lights.warmupPatternStart();

setTimeout(async () => {
    const dayOfChanukah = await data.getDayOfChanukah();
    lights.warmupPatternStop();
    lights.lightCandels(dayOfChanukah);
}, settings.WARMUP_INTERVAL * 5);
