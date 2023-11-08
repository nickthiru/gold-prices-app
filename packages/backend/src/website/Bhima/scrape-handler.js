const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { WebScraper } = require("../../helper/web-scraper/web-scraper.js");
const { cleanDataCb } = require("./clean-data.js");

const ddbClient = new DynamoDBClient();

exports.handler = async function (event, context) {
  console.log("(+) Inside 'Bhima' handler");

  const tableName = process.env.tableName;

  const siteName = "Bhima";

  const ianaTimeZone = "Asia/Kolkata"  // Full IANA time zone names. Example : Europe/Amsterdam

  // const goldKarat = "22";
  // const currency = "INR";
  // const utcOffset = "+0530";
  // const timeZone = "IST"

  const url = "https://bhima.com/gold-rate/";

  const goldPriceCssSelector = "body > div.vision-cont > div > div > div > section > article > div:nth-child(2) > article > div > table > tbody > tr:nth-child(2) > td.txtAlignRight > span > span > span > span > span > span > span > span > span > span > span > span > span > span > span > span";

  const dateCssSelector = "body > div.vision-cont > div > div > div > section > label > span";

  const webScrapeParams = {
    url,
    goldPriceCssSelector,
    dateCssSelector,
  };

  await WebScraper(ddbClient, tableName, siteName, ianaTimeZone, webScrapeParams, cleanDataCb);

  return {
    statusCode: 200,
    message: "Web scraper successfully completed"
  };
};