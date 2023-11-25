const { Stack } = require("aws-cdk-lib");
const { Topic } = require("aws-cdk-lib/aws-sns");


class SnsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside SnsStack");

    this.websiteUpdated_Topic = new Topic(this, "WebsiteUpdated_Topic", {
      topicName: "WebsiteUpdated"
    });

    this.emailAlertSent_Topic = new Topic(this, "EmailAlertSent_Topic", {
      topicName: "EmailAlertSent"
    });
  }
}

module.exports = { SnsStack };