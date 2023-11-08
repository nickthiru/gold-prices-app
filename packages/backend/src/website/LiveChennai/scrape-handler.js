const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { WebScraper } = require("../../helper/web-scraper/web-scraper.js");
const { cleanDataCb } = require("./clean-data.js");

const ddbClient = new DynamoDBClient();

exports.handler = async function (event, context) {
  console.log("(+) Inside 'Live Chennai' handler");
  // console.log("(+) event: \n" + JSON.stringify(event, null, 2));
  // console.log("(+) process.env.tableName: " + process.env.tableName);

  const tableName = process.env.tableName;

  const siteName = "Live Chennai";

  const ianaTimeZone = "Asia/Kolkata"  // Full IANA time zone names. Example : Europe/Amsterdam

  // const goldKarat = "22";
  // const currency = "INR";
  // const utcOffset = "+0530";
  // const timezone = "IST"

  const url = "https://www.livechennai.com/gold_silverrate.asp";

  const goldPriceCssSelector = "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(4) > font";

  const dateCssSelector = "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(1) > font";

  const timeCssSelector = ".mob-cont[align='right']";

  const webScrapeParams = {
    url,
    goldPriceCssSelector,
    dateCssSelector,
    timeCssSelector
  };

  await WebScraper(ddbClient, tableName, siteName, ianaTimeZone, webScrapeParams, cleanDataCb);

  return {
    statusCode: 200,
    message: "Web scraper successfully completed"
  };
};