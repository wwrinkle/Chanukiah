const axios = require('axios');
const settings = require('./settings');

async function getDayOfChanukah() {
    let response;
    const getResponse = async () => {
        try {
            response = await axios.get(settings.HEBCAL_URL);
        }
        catch (error) {
            console.error(error);
	        await getResponse();
        }
    };
    await getResponse();

    const now = new Date();
    const [month, day, year] = now.toLocaleDateString('en-us').split('/');

    const daysOfChanukah = response.data.items.filter(i => {
        return i.category === 'holiday' &&
        i.title.includes('Chanukah: ')
    });
    const dayOfChanukah = daysOfChanukah.find(d => {
        const [chanukahYear, chanukahMonth, chanukahDay] = d.date.split('-');
        return chanukahYear === year && chanukahMonth === month && chanukahDay === day;
    });

    if (dayOfChanukah) {
        const chanukahStringIndex = dayOfChanukah.title.indexOf('Chanukah: ') + 10;
        const dayOfChanukahInt = parseInt(dayOfChanukah.title[chanukahStringIndex]);
        console.log(`It's Chanukah day: ${dayOfChanukah}`);
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
