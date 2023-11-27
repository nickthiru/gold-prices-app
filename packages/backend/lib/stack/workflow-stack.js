const { Stack } = require("aws-cdk-lib");
const { SendEmailAlertWorkflow } = require("../construct/workflow/send-email-alert-workflow");
const { ScrapeWebsiteWorkflow } = require("../construct/workflow/scrape-website-workflow/scrape-website-workflow");
const { GetLatestPriceWorkflow } = require("../construct/workflow/get-latest-price-workflow");

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

    console.log("(+) Inside 'WorkflowStack'");

    const { sns_Stack, tableArn, tableName } = props;

    this.scrapeWebsite_Workflow = new ScrapeWebsiteWorkflow(this, "ScrapeWebsite_Workflow", {
      tableArn,
      tableName,
      outputEvent_Topic: sns_Stack.websiteUpdated_Topic,
    });

    // this.SendEmailAlertWorkflow = new SendEmailAlertWorkflow(this, "SendEmailAlertWorkflow", {
    //   triggerEvent_Topic: snsStack.websiteUpdated_Topic,
    // });

    // this.getLatestPriceWorkflow = new GetLatestPriceWorkflow(this, "GetLatestPriceWorkflow", {
    //   tableArn,
    //   tableName,
    // });
  }
}

module.exports = { WorkflowStack };