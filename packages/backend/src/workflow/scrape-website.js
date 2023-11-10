
const WebScraper = require("../helper/web-scraper.js");
const DbQuery = require("../helper/db/db-query.js");
const DbItem = require("../helper/db/db-item.js");
const Util = require("../helper/util.js");


module.exports = async function ScrapeWebsite(tableName, websiteDetails, ddbClient, cleanerCb) {
  console.log(`(+) Inside '${websiteDetails.siteName}' handler`);

  /* Variables */

  // const tableName = process.env.tableName;

  const { siteName, ianaTimeZone, scrapeParams } = websiteDetails;
  console.log("(+) websiteDetails: \n" + JSON.stringify(websiteDetails, null, 2));


  /* Steps */

  const { goldPrice, siteDateTime } = await DbQuery.latestPriceDateTime(ddbClient, tableName, siteName);

  // Bhima
  // Website date is displayed as: "[ UPDATED ON 01/11/2023 ]"
  // Website gold price is displayed as: " 5,640"

  // const siteDateTime = "2023-11-01";
  // const siteDateTime = "2023-10-31";
  // const siteDateTime = undefined;

  // const goldPrice = 5640;
  // const goldPrice = 5641;
  // const goldPrice = undefined;

  // Live Chennai
  // Website date is displayed as: "28/October/2023"
  // Website time is displayed as: "LAST UPDATE TIME:9:52:15 AM"
  // Website gold price is displayed as: "5640.00"

  // const siteDateTime = "2023-11-01T09:52:15";
  // const goldPrice = 5590;


  // Thangamayil
  // Website date-time is displayed as: "Last updated on : 01/11/23 11:00 AM"
  // Website gold price is displayed as: "₹5640"

  // const siteDateTime = "2023-11-13T10:36";
  // const goldPrice = 5545;


  // console.log("(+) siteDateTime: " + siteDateTime);
  // console.log("(+) goldPrice: " + goldPrice);


  const rawScrapeData = await WebScraper.scrape(scrapeParams);
  console.log("(+) rawScrapeData: \n" + JSON.stringify(rawScrapeData, null, 2));


  // Fetch local time as scrape date/time to be used to fill in holes in the date/time on the websites
  const scrapeDateTime = await Util.getLocalDateTime(ianaTimeZone);
  console.log("(+) scrapeDateTime: " + scrapeDateTime);


  // Clean the scraped data
  const { uiDateTime, siteDateTimeNow, goldPriceNow } = Util.cleanData(scrapeDateTime, rawScrapeData, cleanerCb);
  console.log("(+) uiDateTime: " + uiDateTime);
  console.log("(+) siteDateTimeNow: " + siteDateTimeNow);
  console.log("(+) goldPriceNow: " + goldPriceNow);


  // Check if the website has beeen updated
  const siteIsUpdated = Util.checkIfSiteUpdated(siteDateTime, siteDateTimeNow, goldPrice, goldPriceNow);
  console.log("(+) siteIsUpdated: " + siteIsUpdated);

  // Save the data to the DB on update
  if (siteIsUpdated) {
    const dataToSave = {
      siteName: siteName,
      uiDateTime: uiDateTime,
      goldPrice: goldPriceNow,
      siteDateTime: siteDateTimeNow
    };
    console.log("(+) dataToSave: \n" + JSON.stringify(dataToSave, null, 2));

    await DbItem.save(ddbClient, tableName, dataToSave);
  }
}