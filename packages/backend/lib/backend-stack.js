const { Stack } = require('aws-cdk-lib');
const { LambdaStack } = require('./lambda-stack');
const { ApiStack } = require('./api-stack');
const { WebsiteScraperStack } = require('./website-scraper-stack');
const { DataStack } = require('./data-stack');
const { UiDeploymentStack } = require('./ui-deployment-stack');

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

    new WebsiteScraperStack(this, "WebsiteScraperStack", {
      tableArn: dataStack.websiteTable.tableArn,
      tableName: dataStack.websiteTable.tableName
    });

    const lambdaStack = new LambdaStack(this, "LambdaStack", {
      tableArn: dataStack.websiteTable.tableArn,
      tableName: dataStack.websiteTable.tableName
    });

    new ApiStack(this, "ApiStack", {
      pricesApi_LambdaIntegration: lambdaStack.pricesApi_LambdaIntegration
    });

    new UiDeploymentStack(this, "UiDeploymentStack");
  }
}

module.exports = { BackendStack }
