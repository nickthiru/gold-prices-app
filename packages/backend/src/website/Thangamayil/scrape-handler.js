const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { WebScraper } = require("../../helper/web-scraper/web-scraper.js");
const { cleanDataCb } = require("./clean-data.js");

const ddbClient = new DynamoDBClient();

exports.handler = async function (event, context) {
  console.log("(+) Inside 'Thangamayil' handler");
  // console.log("(+) event: \n" + JSON.stringify(event, null, 2));
  // console.log("(+) process.env.tableName: " + process.env.tableName);

  const tableName = process.env.tableName;

  const siteName = "Thangamayil";

  const ianaTimeZone = "Asia/Kolkata"  // Full IANA time zone names. Example : Europe/Amsterdam

  // const goldKarat = "22";
  // const currency = "INR";
  // const utcOffset = "+0530";
  // const timezone = "IST"

  const url = "https://www.thangamayil.com/scheme/index/rateshistory/";

  const goldPriceCssSelector = "#maincontent > div.columns > div > div.history-rate.card > div > div:nth-child(3) > h2";

  const dateTimeCssSelector = "#maincontent > div.columns > div > div.history-rate.card > div > div.card-header > div > h5";

  const webScrapeParams = {
    url,
    goldPriceCssSelector,
    dateTimeCssSelector
  };

  await WebScraper(ddbClient, tableName, siteName, ianaTimeZone, webScrapeParams, cleanDataCb);

  return {
    statusCode: 200,
    message: "Web scraper successfully completed"
  };
};