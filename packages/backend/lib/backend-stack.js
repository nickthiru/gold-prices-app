const { Stack } = require('aws-cdk-lib');
const { LambdaStack } = require('./lambda-stack');
const { ApiStack } = require('./api-stack');
const { WebScraperStack } = require('./web-scraper-stack');
const { DataStack } = require('./data-stack');
const { WebsiteHostingStack } = require('./website-hosting-stack');

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

    new WebScraperStack(this, "WebScraperStack", {
      tableArn: dataStack.AppTable.tableArn,
      tableName: dataStack.AppTable.tableName
    });

    const lambdaStack = new LambdaStack(this, "LambdaStack", {
      tableArn: dataStack.AppTable.tableArn,
      tableName: dataStack.AppTable.tableName
    });

    new ApiStack(this, "ApiStack", {
      pricesApi_LambdaIntegration: lambdaStack.pricesApi_LambdaIntegration
    });

    new WebsiteHostingStack(this, "WebsiteHostingStack");
  }
}

module.exports = { BackendStack }
