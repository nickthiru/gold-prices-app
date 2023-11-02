const { scrapeWebsite } = require("../../helper/scrape-website");
const { saveData } = require("../../helper/save-data");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { cleanData } = require("./clean-data");

const ddbClient = new DynamoDBClient();

exports.handler = async function (event, context) {
  console.log("(+) Inside 'Thangamayil' handler");
  // console.log("(+) event: \n" + JSON.stringify(event, null, 2));
  // console.log("(+) process.env.tableName: " + process.env.tableName);

  const tableName = process.env.tableName;

  const siteName = "Thangamayil";

  const goldKarat = "22";
  const currency = "INR";
  const utcOffset = "+0530";
  const timezone = "IST"

  const url = "https://www.thangamayil.com/scheme/index/rateshistory/";

  const goldPriceCssSelector = "#maincontent > div.columns > div > div.history-rate.card > div > div:nth-child(3) > h2";

  const dateTimeCssSelector = "#maincontent > div.columns > div > div.history-rate.card > div > div.card-header > div > h5";


  try {
    const {
      rawGoldPrice,
      rawDateTime,
      scrapeDateInUTC
    } = await scrapeWebsite(
      {
        url,
        goldPriceCssSelector,
        dateTimeCssSelector
      }
    );

    console.log("(+) Back in 'Thangamayil' handler");

    console.log("(+) rawDateTime: " + rawDateTime);
    console.log("(+) rawGoldPrice: " + rawGoldPrice);
    console.log("(+) scrapeDateInUTC: " + scrapeDateInUTC);

    const { dateTime, goldPrice } = cleanData(
      rawDateTime,
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

    await saveData(ddbClient, tableName, dataToSave);

  } catch (error) {
    console.log("(-) Error: " + error);
  };

  return {
    statusCode: 200,
    message: "Web scraper successfully completed"
  };
};