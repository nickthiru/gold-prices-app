const { Stack } = require("aws-cdk-lib");
const { SendEmailAlertWorkflow } = require("../service/email/workflow/send-email-alert-workflow");
const { ScrapeWebsiteWorkflow } = require("../service/web-scraper/workflow/scrape-website-workflow");
const { GetLatestPriceWorkflow } = require("../service/price/workflow/get-latest-price-workflow");
const { SubscribeToEmailAlertWorkflow } = require("../service/email/workflow/subscribe-to-email-alert-workflow");


class WorkflowStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside 'WorkflowStack'");

    const {
      sns_Stack,
      emailTemplate_Stack,
      tableArn,
      tableName
    } = props;

    this.scrapeWebsite_Workflow = new ScrapeWebsiteWorkflow(this, "ScrapeWebsite_Workflow", {
      tableArn,
      tableName,
      outputEvent_Topic: sns_Stack.websiteUpdated_Topic,
    });

    this.SendEmailAlert_Workflow = new SendEmailAlertWorkflow(this, "SendEmailAlert_Workflow", {
      tableArn,
      tableName,
      triggerEvent_Topic: sns_Stack.websiteUpdated_Topic,
      emailTemplateName: emailTemplate_Stack.priceUpdateAlertTemplateName
    });

    this.getLatestPrice_Workflow = new GetLatestPriceWorkflow(this, "GetLatestPrice_Workflow", {
      tableArn,
      tableName,
    });

    this.subscribeToEmailAlert_Workflow = new SubscribeToEmailAlertWorkflow(this, "SubscribeToEmailAlert_Workflow", {
      tableArn,
      tableName,
    });
  }
}

module.exports = { WorkflowStack };