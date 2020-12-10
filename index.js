const data = require('./data');
const lights = require('./lights');

lights.warmupPatternStart();

data.getDayOfChanukah().then(day => {
    lights.warmupPatternStop();
    lights.lightCandels(day);
});
