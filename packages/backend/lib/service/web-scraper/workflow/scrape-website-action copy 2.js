const { Construct } = require("constructs");
const { Duration } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");

const path = require("path");


const packageLockJsonFilePath = "../../../../../../package-lock.json";

const workflowHandlerPath = "../../../../../bdd/src/service/web-scraper/workflow/scrape-website-workflow/scrape-website-action.js";


class ScrapeWebsiteAction extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { tableArn, tableName, dataCleaners } = props;
    console.log("(+) Inside 'ScrapeWebsiteAction' construct");
    console.log("(+) tableArn: " + tableArn);
    console.log("(+) tableName: " + tableName);
    console.log("(+) dataCleaners: " + JSON.stringify(dataCleaners, null, 2));

    this.lambda = new NodejsFunction(this, "Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"],
        nodeModules: ["@sparticuz/chromium"]
      },
      runtime: Runtime.NODEJS_18_X,
      memorySize: 1024,
      timeout: Duration.minutes(5),
      entry: (path.join(__dirname, workflowHandlerPath)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFilePath)),
      environment: {
        TABLE_NAME: tableName,
        DATA_CLEANERS: dataCleaners,
      },
      initialPolicy: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          // resources: [
          //   `arn:aws:sns:us-east-1:346761569124:function:${scrapeWebsiteAction_Lambda.functionName}`,
          // ],
          resources: [
            "*",
          ],
          actions: ["lambda:InvokeFunction"],
          // principals: ["arn:aws:sts::346761569124:assumed-role/*"],
        }),
      ],
    });

    this.lambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [tableArn],
      actions: [
        "dynamodb:PutItem",
        "dynamodb:Query",
      ]
    }));
  };
}

module.exports = { ScrapeWebsiteAction };