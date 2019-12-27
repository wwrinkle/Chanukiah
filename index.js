const data = require('./data');
const lights = require('./lights');

data.getDayOfChanukah().then(day => {
    lights.lightCandels(day);
});
