const HEBCAL_URL = 'https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=off&mod=off&nx=off&year=now&month=x&ss=off&mf=off&c=off&geo=zip&zip=75080&m=0&s=off';

const CANDLES = [27, 22, 10, 9, 2, 3, 4, 17];

const WARMUP_INTERVAL = 1000;

const CUTOFF_DATE = '1/7';

module.exports = {
    HEBCAL_URL,
    CANDLES,
    WARMUP_INTERVAL,
    CUTOFF_DATE
};
