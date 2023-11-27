const { Construct } = require("constructs");
const { Queue } = require("aws-cdk-lib/aws-sqs");
const { Duration } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
const { SqsToLambda } = require("@aws-solutions-constructs/aws-sqs-lambda");

const path = require("path");


const packageLockJsonFilePath = "../../../../../package-lock.json";

const workflowHandlerPath = "../../../../bdd/src/service/email/workflow/send-email-alert-workflow.js";


const domainWorkflow = {
  domain: "EmailService",
  workflow: {
    name: "SendEmailAlertWorkflow",
    description: ""
  },
  triggerEvent: {
    type: "SNS",
    topicName: "WebsiteUpdated",
    description: "",
  },
  outputEvent: {
    name: "EmailAlertSent",
    description: "",
  }
};


class SendEmailAlertWorkflow extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside 'SendEmailAlertWorkflow' construct");

    const { triggerEvent_Topic } = props;


    const queue = new Queue(this, "Queue");

    const lambda = new NodejsFunction(this, "Lambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: (path.join(__dirname, workflowHandlerPath)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFilePath)),
      // environment: {
      //   outputEventTopicName: outputEventTopic.topicName,
      //   outputEventTopicArn: outputEventTopic.topicArn
      // },
      // initialPolicy: [
      //   new PolicyStatement({
      //     effect: Effect.ALLOW,
      //     resources: [`arn:aws:sns:us-east-1:346761569124:${outputEventTopic.topicName}`],
      //     actions: ["sns:Publish"]
      //   })
      // ],
    });

    new SnsToSqs(this, `${workflow}SnsToSqs`, {
      existingTopicObj: triggerEvent_Topic,
      existingQueueObj: queue,
    });

    new SqsToLambda(this, `${workflow}SqsToLambda`, {
      existingQueueObj: queue,
      existingLambdaObj: lambda
    });
  }
}

module.exports = { SendEmailAlertWorkflow };