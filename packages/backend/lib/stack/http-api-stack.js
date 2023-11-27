const { Stack, CfnOutput } = require("aws-cdk-lib");
const { HttpApi, HttpMethod, HttpStage } = require("@aws-cdk/aws-apigatewayv2-alpha");
const { HttpLambdaIntegration } = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
// const { HttpLambdaAuthorizer, HttpLambdaResponseType } = require("@aws-cdk/aws-apigatewayv2-authorizers-alpha");

class HttpApiStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { pricesApiLambda } = props;

    // const ambdaAuthorizer = new NodejsFunction(this, "LambdaAuthorizer", {
    //   runtime: Runtime.NODEJS_18_X,
    //   entry: (path.join(__dirname, "../src/api/http/lambda-authorizer.js")),
    //   handler: "handler",
    //   depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
    //   environment: {
    //     userPoolId,
    //     userPoolClientId,
    //   }
    // });

    // this.lambdaAuthorizer = new HttpLambdaAuthorizer("HttpLambdaAuthorizer", lambdaAuthorizer, {
    //   responseTypes: [HttpLambdaResponseType.IAM]
    // })

    const httpApi = new HttpApi(this, 'HttpApi', {
      createDefaultStage: false,
      // defaultIntegration: defaultRouteIntegration,
      // defaultAuthorizer: lambdaAuthorizer
    });

    // const devStage = httpApi.addStage("dev");
    const devHttpStage = new HttpStage(this, "DevHttpStage", {
      httpApi: httpApi,
      stageName: "dev"
    })


    const pricesHttpLambdaIntegration = new HttpLambdaIntegration("PricesHttpLambdaIntegration", pricesApiLambda);

    httpApi.addRoutes({
      path: "/prices",
      methods: [HttpMethod.GET],
      integration: pricesHttpLambdaIntegration
    });

    new CfnOutput(this, "HttpDevStageUrl", {
      value: `${devHttpStage.url}`,
      description: "HTTP dev stage URL",
      exportName: "HttpDevStageUrl"
    })
  }
}

module.exports = { HttpApiStack };