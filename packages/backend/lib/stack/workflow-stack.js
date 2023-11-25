const { Stack } = require("aws-cdk-lib");
const { SendEmailAlertWorkflow } = require("../workflow-construct/send-email-alert-workflow");

// const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
// const { Runtime } = require("aws-cdk-lib/aws-lambda");
// const { Duration } = require("aws-cdk-lib");
// const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
// const { LambdaIntegration } = require("aws-cdk-lib/aws-apigateway");
// const path = require("path");

// const packageLockJsonFile = "../../../package-lock.json";

class WorkflowStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside WorkflowStack");

    const { snsStack } = props;

    new SendEmailAlertWorkflow(this, "SendEmailAlertWorkflow", {
      websiteUpdated_Topic: snsStack.websiteUpdated_Topic,
    })


  }
}

module.exports = { WorkflowStack };