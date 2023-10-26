const { Stack } = require('aws-cdk-lib');
const { LambdaStack } = require('./lambda-stack');
const { ApiStack } = require('./api-stack');
const { WebsiteStack } = require('./website-stack');
const { DataStack } = require('./data-stack');

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

    new WebsiteStack(this, "WebsiteStack");

    const lambdaStack = new LambdaStack(this, "LambdaStack", {
      // webScraperLayer: layerStack.webScraperLayer
    });

    new ApiStack(this, "ApiStack", {
      pricesApi_LambdaIntegration: lambdaStack.pricesApi_LambdaIntegration
    })
  }
}

module.exports = { BackendStack }
