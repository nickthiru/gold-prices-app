const { Stack } = require('aws-cdk-lib');
const { LambdaStack } = require('./lambda-stack');
const { ApiStack } = require('./api-stack');
const { LayerStack } = require('./layer-stack');

class BackendStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const layerStack = new LayerStack(this, "LayerStack");

    const lambdaStack = new LambdaStack(this, "LambdaStack", {
      // webScraperLayer: layerStack.webScraperLayer
    });

    new ApiStack(this, "ApiStack", {
      pricesApi_LambdaIntegration: lambdaStack.pricesApi_LambdaIntegration
    })
  }
}

module.exports = { BackendStack }
