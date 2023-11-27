const { Stack } = require("aws-cdk-lib");
const { Topic } = require("aws-cdk-lib/aws-sns");
const { LogGroup } = require("aws-cdk-lib/aws-logs");
const { LogGroupSubscription, LogFormat } = require("@wheatstalk/cdk-sns-log-group-subscription");


class SnsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside 'SnsStack'");

    /*** Web Scraper Service ***/

    // Scrape Website Workflow

    this.websiteUpdated_Topic = new Topic(this, "WebsiteUpdated_Topic", {
      topicName: "WebsiteUpdated"
    });

    this.websiteUpdated_Topic.addSubscription(
      new LogGroupSubscription({
        logGroup: new LogGroup(this, "WebsiteUpdated_Topic_LogGroup"),
        logFormat: LogFormat.MESSAGE
      })
    );

    // Some other workflow



    /*** Email Service ***/

    // Send Email Alert Workflow

    // this.emailAlertSent_Topic = new Topic(this, "EmailAlertSent_Topic", {
    //   topicName: "EmailAlertSent"
    // });



    /*** Price Service ***/


  }
}

module.exports = { SnsStack };