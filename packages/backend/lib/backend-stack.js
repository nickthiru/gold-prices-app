const { Stack } = require('aws-cdk-lib');
const { RestApiStack } = require('./stack/rest-api-stack');
const { DataStack } = require('./stack/data-stack');
const { WebsiteHostingStack } = require('./stack/website-hosting-stack');
const { SnsStack } = require('./stack/sns-stack');
const { WorkflowStack } = require('./stack/workflow-stack');
const { EmailTemplateStack } = require('./stack/email-template-stack');

class BackendStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const data_Stack = new DataStack(this, "Data_Stack");

    const sns_Stack = new SnsStack(this, "Sns_Stack");

    const emailTemplate_Stack = new EmailTemplateStack(this, "EmailTemplate_Stack");

    const workflow_Stack = new WorkflowStack(this, "Workflow_Stack", {
      sns_Stack: sns_Stack,
      emailTemplate_Stack: emailTemplate_Stack,
      tableArn: data_Stack.app_Table.tableArn,
      tableName: data_Stack.app_Table.tableName,
    });

    new RestApiStack(this, "RestApi_Stack", {
      workflow_Stack: workflow_Stack,
    });

    new WebsiteHostingStack(this, "WebsiteHosting_Stack");
  }
}

module.exports = { BackendStack }
