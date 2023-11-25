const { Stack } = require('aws-cdk-lib');
const { LambdaStack } = require('./lambda-stack');
const { ApiStack } = require('./stack/api-stack');
const { WebScraperStack } = require('./web-scraper-stack');
const { DataStack } = require('./stack/data-stack');
const { WebsiteHostingStack } = require('./website-hosting-stack');
const { SnsStack } = require('./stack/sns-stack');
const { WorkflowStack } = require('./stack/workflow-stack');
const { EmailTemplateStack } = require('./stack/email-template-stack');

class BackendStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const dataStack = new DataStack(this, "DataStack");

    const snsStack = new SnsStack(this, "SnsStack");

    const workflowStack = new WorkflowStack(this, "WorkflowStack", {
      snsStack: snsStack,
    });

    new EmailTemplateStack(this, "EmailTemplateStack");

    // new WebScraperStack(this, "WebScraperStack", {
    //   tableArn: dataStack.AppTable.tableArn,
    //   tableName: dataStack.AppTable.tableName
    // });

    // const lambdaStack = new LambdaStack(this, "LambdaStack", {
    //   tableArn: dataStack.AppTable.tableArn,
    //   tableName: dataStack.AppTable.tableName
    // });

    // new ApiStack(this, "ApiStack", {
    //   pricesApi_LambdaIntegration: lambdaStack.pricesApi_LambdaIntegration
    // });

    new WebsiteHostingStack(this, "WebsiteHostingStack");
  }
}

module.exports = { BackendStack }
