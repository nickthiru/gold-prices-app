const { Construct } = require("constructs");
const { Duration } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { EventbridgeToLambda } = require("@aws-solutions-constructs/aws-eventbridge-lambda");
const { Schedule } = require("aws-cdk-lib/aws-events");
const path = require("path");
const { ScrapeWebsite } = require("./scrape-website");

// const packageLockJsonFile = "../../../../package-lock.json";


class ScrapeWebsiteWorkflow extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { tableArn, tableName, outputEvent_Topic } = props;

    // console.log(`(+) Inside ${siteName} WebScraper construct`);

    // console.log("(+) tableArn: " + tableArn);
    // console.log("(+) tableName: " + tableName);

    new ScrapeWebsite(this, "LiveChennai", {
      siteName: "LiveChennai",
      tableArn,
      tableName,
      outputEvent_Topic,
    });

    // new ScrapeWebsite(this, "Thangamayil", {
    //   siteName: "Thangamayil",
    //   tableArn,
    //   tableName,
    //   outputEvent_Topic,
    // });

    // new ScrapeWebsite(this, "Bhima", {
    //   siteName: "Bhima",
    //   tableArn,
    //   tableName,
    //   outputEvent_Topic,
    // });
  };
}

module.exports = { ScrapeWebsiteWorkflow };