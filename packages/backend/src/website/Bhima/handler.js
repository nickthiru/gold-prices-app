const { scrapeWebsite } = require("../../helper/scrape-website");
const { saveData } = require("../../helper/save-data");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { cleanData } = require("./clean-data");

const ddbClient = new DynamoDBClient();

exports.handler = async function (event, context) {
  console.log("(+) Inside 'Bhima' handler");
  // console.log("(+) event: \n" + JSON.stringify(event, null, 2));
  // console.log("(+) process.env.tableName: " + process.env.tableName);

  const tableName = process.env.tableName;

  const siteName = "Bhima";

  const goldKarat = "22";
  const currency = "INR";
  const utcOffset = "+0530";
  const timezone = "IST"

  const url = "https://bhima.com/gold-rate/";

  const goldPriceCssSelector = "body > div.vision-cont > div > div > div > section > article > div:nth-child(2) > article > div > table > tbody > tr:nth-child(2) > td.txtAlignRight > span > span > span > span > span > span > span > span > span > span > span > span > span > span > span > span";

  const dateCssSelector = "body > div.vision-cont > div > div > div > section > label > span";


  try {
    const {
      rawGoldPrice,
      rawDate,
      scrapeDateInUTC
    } = await scrapeWebsite(
      {
        url,
        goldPriceCssSelector,
        dateCssSelector
      }
    );

    console.log("(+) Back in 'Bhima' handler");

    console.log("(+) rawDate: " + rawDate);
    console.log("(+) rawGoldPrice: " + rawGoldPrice);
    console.log("(+) scrapeDateInUTC: " + scrapeDateInUTC);

    const { dateTime, goldPrice } = cleanData(rawDate, rawGoldPrice);

    console.log("(+) dateTime: " + dateTime);
    console.log("(+) goldPrice: " + goldPrice);

    const dataToSave = {
      siteName,
      goldKarat,
      currency,
      dateTime,
      goldPrice,
      scrapeDateInUTC,
      utcOffset,
      timezone
    };

    console.log("(+) dataToSave: \n" + JSON.stringify(dataToSave, null, 2));

    await saveData(ddbClient, tableName, dataToSave);

  } catch (error) {
    console.log("(-) Error: " + error);
  };

  return {
    statusCode: 200,
    message: "Web scraper successfully completed"
  };
};