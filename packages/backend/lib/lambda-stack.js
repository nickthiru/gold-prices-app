const { Stack } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const { Duration } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { LambdaIntegration } = require("aws-cdk-lib/aws-apigateway");
const path = require("path");

const packageLockJsonFile = "../../../package-lock.json";

class LambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside LambdaStack");

    const { tableArn, tableName } = props;

    const pricesApi_Lambda = new NodejsFunction(this, "PricesApi_Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"]
      },
      runtime: Runtime.NODEJS_18_X,
      // memorySize: 1024,
      memorySize: 512,
      timeout: Duration.minutes(1),
      entry: (path.join(__dirname, `../src/api/rest/api-handler.js`)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
      environment: { tableName }
    });

    pricesApi_Lambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [tableArn],
      actions: [
        "dynamodb:PutItem",
        "dynamodb:Scan",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem"
      ]
    }));

    this.pricesApi_LambdaIntegration = new LambdaIntegration(pricesApi_Lambda);

  }
}

module.exports = { LambdaStack };