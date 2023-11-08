const { scrapeWebsite } = require("./scrape-website");
const { getLocalDateTime } = require("./get-local-date-time");
const { saveData } = require("./save-data");

async function WebScraper(ddbClient, tableName, siteName, ianaTimeZone, webScrapeParams, cleanDataCb) {
  console.log("(+) Inside 'WebScraper'")
  try {
    const result = await scrapeWebsite(webScrapeParams);

    const scrapeDateTime = await getLocalDateTime(ianaTimeZone);

    // console.log("(+) result: \n" + JSON.stringify(result, null, 2));
    // console.log("(+) scrapeDateTime: " + scrapeDateTime);

    const { dateTime, goldPrice } = cleanDataCb(scrapeDateTime, result);

    console.log("(+) dateTime: " + dateTime);
    console.log("(+) goldPrice: " + goldPrice);

    const dataToSave = {
      siteName,
      scrapeDateTime,
      dateTime,
      goldPrice,
      // goldKarat,
      // currency,
      // utcOffset,
      // timezone
      // scrapeDateTime,
    };

    console.log("(+) dataToSave: \n" + JSON.stringify(dataToSave, null, 2));

    await saveData(ddbClient, tableName, dataToSave);

  } catch (error) {
    console.log("(-) Error: " + error);
  };
}

module.exports = { WebScraper };


