module.exports = Util = {

  checkIfSiteUpdated(siteDateTime, siteDateTimeNow, goldPrice, goldPriceNow) {
    // console.log("\n");
    // console.log("(+) Inside 'checkIfSiteUpdated()'");

    // If the data are NOT equal, it means the website has been updated
    return !((siteDateTime === siteDateTimeNow) && (goldPrice === goldPriceNow));
  },

  async getLocalDateTime(ianaTimeZone) {
    // console.log("\n");
    // console.log("(+) Inside 'getLocalTime()'");

    const data = await fetch(`https://timeapi.io/api/Time/current/zone/?timeZone=${ianaTimeZone}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data: \n" + JSON.stringify(data, null, 2));
        return data;
      })
      .catch((err) => console.log(err));

    // console.log("data: \n" + JSON.stringify(data, null, 2));

    const dateTime = data.dateTime.slice(0, 19);
    // console.log("dateTime: " + JSON.stringify(dateTime, null, 2));

    return dateTime;
  },

  removeUndefined(obj) {
    console.log("\n");
    console.log("(+) Inside 'removeUndefined()'");

    Object.keys(obj).forEach((key) => console.log(`(+) ${key}: ` + obj[key]));

    const objCopy = { ...obj };

    Object.keys(objCopy).forEach((key) => objCopy[key] === undefined && delete objCopy[key]);

    return objCopy;
  },

  cleanData(scrapeDateTime, rawScrapeData, cleanerCb) {
    return cleanerCb(rawScrapeData, scrapeDateTime);
  },
}