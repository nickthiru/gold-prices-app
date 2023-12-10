const { Stack, CfnOutput } = require("aws-cdk-lib");
const { RestApi, Deployment, Stage, Cors } = require("aws-cdk-lib/aws-apigateway");

class RestApiStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'RestApiStack'");

    const { workflow_Stack } = props;


    /*** API ***/

    const restApi = new RestApi(this, "RestApi");

    const optionsWithCors = {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS
      }
    };

    // const deployment = new Deployment(this, "Deployment", {
    //   api: restApi,
    // });


    // Stages

    // const devStage = new Stage(this, "dev", {
    //   deployment: deployment,
    //   stageName: "dev",
    // });


    /*** Price Service */

    const price = restApi.root.addResource("price", optionsWithCors);

    // Get latest price
    const latestPrice = price.addResource("latest", optionsWithCors);
    latestPrice.addMethod("GET", workflow_Stack.getLatestPrice_Workflow.lambdaIntegration);


    /*** Email Service ***/

    const email = restApi.root.addResource("email", optionsWithCors);

    // Email alert
    const alert = email.addResource("alert", optionsWithCors);

    // Subscribe to email alert
    alert.addMethod("POST", workflow_Stack.subscribeToEmailAlert_Workflow.lambdaIntegration);




    /*** Outputs ***/

    // new CfnOutput(this, "", {
    //   value: ``,
    //   description: " dev stage URL",
    //   exportName: ""
    // });
  }
}

module.exports = { RestApiStack };