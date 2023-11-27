const { Stack, CfnOutput } = require("aws-cdk-lib");
const { RestApi, Cors } = require("aws-cdk-lib/aws-apigateway");

class RestApiStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { workflowStack } = props;

    this.restApi = new RestApi(this, "RestApi");

    this.optionsWithCors = {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS
      }
    };

    const pricesResource = api.root.addResource("latest-price", optionsWithCors);
    pricesResource.addMethod("GET", workflowStack.getLatestPriceWorkflow.lambdaIntegration);


    // new CfnOutput(this, "", {
    //   value: ``,
    //   description: " dev stage URL",
    //   exportName: ""
    // });
  }
}

module.exports = { RestApiStack };