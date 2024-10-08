const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");


const WebScraper = require("../../../service-object/web-scraper-service.js");
const Db = require("../../../../db/service-object/db-service.js");
const Util = require("../../../../util/service-object/util-service.js");

const cleanerCb = require(`./data-cleaner.js`);

const websiteDetails = require(`./website-details.json`);


const ddbClient = new DynamoDBClient();


exports.handler = async function (event, context) {
  console.log("Inside 'scrape-website-action' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));
  console.log("context: \n" + JSON.stringify(context, null, 2));


  /* Variables */

  const siteName = process.env.WEBSITE_NAME;
  console.log("siteName: " + siteName);

  const tableName = process.env.TABLE_NAME;
  console.log("tableName: " + tableName);

  console.log("(+) websiteDetails: \n" + JSON.stringify(websiteDetails, null, 2));

  const { ianaTimeZone, scrapeParams } = websiteDetails;


  /* Steps */

  try {
    const { goldPrice, siteDateTime } = await Db.query.latestPriceDateTime(ddbClient, tableName, siteName);

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


    console.log("(+) siteDateTime: " + siteDateTime);
    console.log("(+) goldPrice: " + goldPrice);


    const rawScrapeData = await WebScraper.scrapeWebsite(scrapeParams);
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
        PK: `WEBSITE#${siteName}`,
        SK: `UI_DATETIME#${uiDateTime}`,
        siteName: siteName,
        uiDateTime: uiDateTime,
        goldPrice: goldPriceNow,
        siteDateTime: siteDateTimeNow
      };
      console.log("(+) dataToSave: \n" + JSON.stringify(dataToSave, null, 2));

      await Db.item.saveItem(ddbClient, tableName, dataToSave);
    }

    return {
      payload: {
        siteName,
        siteIsUpdated,
      },
    };

  } catch (error) {
    console.log("(-) Error: " + error);
  }
}