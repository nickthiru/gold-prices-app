const { scrapeWebsite } = require("../../helper/scrape-website");
const { saveData } = require("../../helper/save-data");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const ddbClient = new DynamoDBClient();

exports.handler = async function (event, context) {
  console.log("(+) Inside 'Live Chennai' handler");
  console.log("(+) event: \n" + JSON.stringify(event, null, 2));
  console.log("(+) process.env.tableName: " + process.env.tableName);

  const tableName = process.env.tableName;

  const siteName = "Live Chennai";
  const url = "https://www.livechennai.com/gold_silverrate.asp";
  const dateCssSelector = "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(1) > font";
  const lastUpdatedTimeCssSelector = ".mob-cont[align='right']";
  const goldPriceCssSelector = "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(4) > font";
  const goldKarat = "22";
  const currency = "INR";

  try {
    const { date, lastUpdatedTime, goldPrice } = await scrapeWebsite(
      url,
      dateCssSelector,
      lastUpdatedTimeCssSelector,
      goldPriceCssSelector
    );

    // const preparedData = prepareData();

    const dataToSave = {
      siteName,
      goldKarat,
      currency,
      date,
      lastUpdatedTime,
      goldPrice
    };

    await saveData(ddbClient, tableName, dataToSave);

    return {
      statusCode: 200,
      message: "Web scraper successfully completed"
    };

  } catch (error) {
    console.log("(-) Error: " + error);
  };
};