const { Construct } = require("constructs");
const { Duration } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");

const path = require("path");


const packageLockJsonFilePath = "../../../../../../package-lock.json";

class DataCleaner extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { siteName } = props;
    console.log(`(+) Inside '${siteName}DataCleaner' construct`);
    console.log("(+) siteName: " + siteName);

    this.lambda = new NodejsFunction(this, "Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"],
      },
      runtime: Runtime.NODEJS_18_X,
      // memorySize: 1024,
      timeout: Duration.minutes(1),
      entry: (path.join(__dirname, `../../../../../bdd/src/service/web-scraper/workflow/scrape-website-workflow/${siteName}/data-cleaner.js`)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFilePath)),
      // environment: {
      //   WEBSITE_NAME: siteName,
      // },
    });
  };
}

module.exports = { DataCleaner };