const { Construct } = require("constructs");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const { Duration } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const path = require("path");

const packageLockJsonFile = "../../../../package-lock.json";
const domainSourceFilesFolderLocation = ""

const domainWorkflow = {
  workflow: {
    name: "SendEmailAlertWorkflow",
    description: ""
  },
  triggerEvent: {
    name: "WebsiteUpdated",
    description: "",
  },
  outputEvent: {
    name: "EmailAlertSent",
    description: "Completed provisioning of devices",
  }
}


class SendEmailAlertWorkflow extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside 'SendEmailAlertWorkflow' construct");

    const { websiteUpdated_Topic } = props;

    // console.log("(+) tableArn: " + tableArn);
    // console.log("(+) tableName: " + tableName);

    const triggerEvent = domainWorkflow.triggerEvent.name;
    const workflow = domainWorkflow.workflow.name;
    const outputEvent = domainWorkflow.outputEvent.name;

    const workflowQueue = new Queue(this, `${workflow}Queue`);

    const workflowLambda = new NodejsFunction(this, `${workflow}Lambda`, {
      runtime: Runtime.NODEJS_18_X,
      entry: (path.join(__dirname, `${domainSourceFilesFolderLocation}/${workflow}.js`)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
      environment: {
        outputEventTopicName: outputEventTopic.topicName,
        outputEventTopicArn: outputEventTopic.topicArn
      },
      initialPolicy: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [`arn:aws:sns:us-east-1:346761569124:${outputEventTopic.topicName}`],
          actions: ["sns:Publish"]
        })
      ]
    });

    // new EventbridgeToLambda(this, "EventbridgeToLambda", {
    //   existingLambdaObj: lambda,
    //   eventRuleProps: {
    //     schedule: Schedule.rate(Duration.minutes(15))
    //   }
    // });
  };
}

module.exports = { SendEmailAlertWorkflow };