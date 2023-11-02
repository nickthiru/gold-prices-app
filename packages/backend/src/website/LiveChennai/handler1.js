const { scrapeWebsite } = require("../../helper/scrape-website");
const { saveData } = require("../../helper/save-data");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { cleanData } = require("./clean-data");

const ddbClient = new DynamoDBClient();

exports.handler = async function (event, context) {
  console.log("(+) Inside 'Live Chennai' handler");
  // console.log("(+) event: \n" + JSON.stringify(event, null, 2));
  // console.log("(+) process.env.tableName: " + process.env.tableName);

  const tableName = process.env.tableName;

  const siteName = "Live Chennai";

  const goldKarat = "22";
  const currency = "INR";
  const utcOffset = "+0530";
  const timezone = "IST"

  const url = "https://www.livechennai.com/gold_silverrate.asp";

  const goldPriceCssSelector = "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(4) > font";

  const dateTimeCssSelector = "";  // None
  const dateCssSelector = "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(1) > font";
  const timeCssSelector = ".mob-cont[align='right']";



  try {
    const {
      rawDateTime,
      rawDate,
      rawTime,
      rawGoldPrice,
      scrapeDateInUTC
    } = await scrapeWebsite(
      url,
      goldPriceCssSelector,
      dateTimeCssSelector,
      dateCssSelector,
      timeCssSelector
    );

    console.log("(+) Back in 'Live Chennai' handler");
    console.log("(+) rawDateTime: " + rawDateTime);
    console.log("(+) rawDate: " + rawDate);
    console.log("(+) rawTime: " + rawTime);
    console.log("(+) rawGoldPrice: " + rawGoldPrice);
    console.log("(+) scrapeDateInUTC: " + scrapeDateInUTC);

    const { dateTime, goldPrice } = cleanData(
      rawDate,
      rawTime,
      rawGoldPrice
    );

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

    // await saveData(ddbClient, tableName, dataToSave);

  } catch (error) {
    console.log("(-) Error: " + error);
  };

  return {
    statusCode: 200,
    message: "Web scraper successfully completed"
  };
};