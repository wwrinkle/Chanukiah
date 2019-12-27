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
    if (now.getHours() < 2) {
        now.setDate(now.getDate - 1);
    }

    const daysOfChanukah = response.data.items.filter(i => {
        return i.category === 'holiday' &&
        i.title.includes('Chanukah: ')
    });
    const dayOfChanukah = daysOfChanukah.find(d => {
        const chanukahDayDate = new Date(d.date);
        return chanukahDayDate.getFullYear() === now.getFullYear() &&
        chanukahDayDate.getMonth() === now.getMonth() &&
        chanukahDayDate.getDate() === now.getDate();
    });

    if (dayOfChanukah) {
        const chanukahStringIndex = dayOfChanukah.title.indexOf('Chanukah: ') + 10;
        const dayOfChanukahInt = parseInt(dayOfChanukah.title[chanukahStringIndex]);

        let dayString = dayOfChanukahInt.toString();
        const tensString = dayString[dayString.length - 1];
        if (tensString === '1') {
            dayString += 'st';
        }
        else if (tensString === '2') {
            dayString += 'nd';
        }
        else if (tensString === '3') {
            dayString += 'rd';
        }
        else {
            dayString += 'th';
        }
        console.log(`It's the ${dayString} day of Chanukah`);
        return dayOfChanukahInt;
    }
    else {
        const lastDayOfChanukah = daysOfChanukah.find(d => d.title.includes('8 Candles'));
        const cutoffDate = new Date(lastDayOfChanukah.date);
        cutoffDate.setDate(cutoffDate.getDate() + settings.CUTOFF_DAYS);
        if (now.getTime() <= cutoffDate.getTime()) {
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
