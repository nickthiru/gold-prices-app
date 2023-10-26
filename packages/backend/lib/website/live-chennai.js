const { Construct } = require("constructs");
const { Duration } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const path = require("path");

const packageLockJsonFile = "../../../../package-lock.json";

class LiveChennai extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    new NodejsFunction(this, "Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"],
        nodeModules: ["@sparticuz/chromium"]
      },
      runtime: Runtime.NODEJS_18_X,
      memorySize: 1024,
      timeout: Duration.seconds(30),
      entry: (path.join(__dirname, "../../src/website/live-chennai.js")),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile))
    });
  };
}

module.exports = { LiveChennai };