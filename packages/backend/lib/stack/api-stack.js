const { Stack, CfnOutput } = require("aws-cdk-lib");
const { RestApi, Cors } = require("aws-cdk-lib/aws-apigateway");

class ApiStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { pricesApi_LambdaIntegration } = props;

    const api = new RestApi(this, "RestApi");

    const optionsWithCors = {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS
      }
    };

    const pricesResource = api.root.addResource("prices", optionsWithCors);
    pricesResource.addMethod("GET", pricesApi_LambdaIntegration);


    // new CfnOutput(this, "", {
    //   value: ``,
    //   description: " dev stage URL",
    //   exportName: ""
    // });
  }
}

module.exports = { ApiStack };