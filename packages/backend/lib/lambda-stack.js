const { Stack } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const path = require("path");
const { LambdaIntegration } = require("aws-cdk-lib/aws-apigateway");

class LambdaStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const packageLockJsonFile = "../../../package-lock.json";

    const pricesApi_Lambda = new NodejsFunction(this, "PricesApi_Lambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: (path.join(__dirname, "../src/prices/api-handler.js")),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile))
    });

    this.pricesApi_LambdaIntegration = new LambdaIntegration(pricesApi_Lambda);
  }
}

module.exports = { LambdaStack };