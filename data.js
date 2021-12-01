const axios = require('axios');
const settings = require('./settings');

function padNumber(number, places=2) {
    let output = `${number}`;
    if (output.length < places) {
        const numberOfZeros = places - output.length;
        output = `${'0'.repeat(numberOfZeros)}${output}`;
    }
    return output;
}

async function getDayOfChanukah() {
    let response;
    try {
        response = await axios.get(settings.HEBCAL_URL);
        console.log('Received from HEBCAL:', response.data);
    }
    catch (error) {
        console.error(error);
        await getResponse();
    }

    const daysOfChanukah = response.data.items.filter(i => {
        return i.category === 'holiday' &&
        i.title.includes('Chanukah: ')
    });

    const now = new Date();
    const dayOfChanukah = daysOfChanukah.find(d => d.date === `${now.getFullYear()}-${padNumber(now.getMonth() + 1)}-${padNumber(now.getDate())}`);

    if (dayOfChanukah) {
        const chanukahStringIndex = dayOfChanukah.title.indexOf('Chanukah: ') + 10;
        const dayOfChanukahInt = parseInt(dayOfChanukah.title[chanukahStringIndex]);
        console.log(`It's Chanukah day: ${dayOfChanukahInt}`);
        return dayOfChanukahInt;
    }
    else {
        const lastDayOfChanukah = daysOfChanukah.find(d => d.title.includes('8 Candles'));
        const lastDayOfChanukahDate = new Date(lastDayOfChanukah.date);
        const cutoffDate = new Date(lastDayOfChanukah.date);
        cutoffDate.setDate(cutoffDate.getDate() + settings.CUTOFF_DAYS);
        if (now.getTime() > lastDayOfChanukahDate.getTime() && now.getTime() <= cutoffDate.getTime()) {
            console.log("It's past Chanukah but within the holiday season.");
            return 8;
        }
        else {
            console.log("It's not Chanukah");
            return 0;
        }
    }
}

module.exports = {
    getDayOfChanukah
};
