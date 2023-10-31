const { Construct } = require("constructs");
const { Duration } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { EventbridgeToLambda } = require("@aws-solutions-constructs/aws-eventbridge-lambda");
const { Schedule } = require("aws-cdk-lib/aws-events");
const path = require("path");

const packageLockJsonFile = "../../../../package-lock.json";

class LiveChennai extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside 'LiveChennai' construct");

    const { tableArn, tableName } = props;
    // console.log("(+) tableArn: " + tableArn);
    // console.log("(+) tableName: " + tableName);

    const lambda = new NodejsFunction(this, "Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"],
        nodeModules: ["@sparticuz/chromium"]
      },
      runtime: Runtime.NODEJS_18_X,
      memorySize: 1024,
      timeout: Duration.minutes(1),
      entry: (path.join(__dirname, "../../src/website/live-chennai/handler.js")),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
      environment: { tableName }
    });

    lambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [tableArn],
      actions: [
        "dynamodb:PutItem",
        // "dynamobd:Scan",
        // "dynamobd:GetItem",
        // "dynamobd:UpdateItem",
        // "dynamobd:DeleteItem"
      ]
    }));

    new EventbridgeToLambda(this, "LiveChennai_EventbridgeToLambda", {
      existingLambdaObj: lambda,
      eventRuleProps: {
        schedule: Schedule.rate(Duration.hours(1))
      }
    })
  };
}

module.exports = { LiveChennai };