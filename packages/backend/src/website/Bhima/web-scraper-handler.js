const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const cleanerCb = require("./data-cleaner.js");

const websiteDetails = require("./website-details.json");

const ScrapeWebsite = require("../../workflow/scrape-website.js");


// For Lambda warm start
const ddbClient = new DynamoDBClient();


exports.handler = async function (event, context) {

  const tableName = process.env.tableName;

  await ScrapeWebsite(
    tableName,
    websiteDetails,
    ddbClient,
    cleanerCb,
  );

  return {
    statusCode: 200,
    message: "Web scraper successfully completed"
  };
};