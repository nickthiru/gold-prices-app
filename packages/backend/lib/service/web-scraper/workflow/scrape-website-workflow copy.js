const { Construct } = require("constructs");
const { ScrapeWebsite } = require("./scrape-website");


class ScrapeWebsiteWorkflow extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { tableArn, tableName, outputEvent_Topic } = props;
    // console.log("(+) tableArn: " + tableArn);
    // console.log("(+) tableName: " + tableName);

    new ScrapeWebsite(this, "LiveChennai", {
      siteName: "Live Chennai",
      tableArn,
      tableName,
      outputEvent_Topic,
    });

    // new ScrapeWebsite(this, "Thangamayil", {
    //   siteName: "Thangamayil",
    //   tableArn,
    //   tableName,
    //   outputEvent_Topic,
    // });

    // new ScrapeWebsite(this, "Bhima", {
    //   siteName: "Bhima",
    //   tableArn,
    //   tableName,
    //   outputEvent_Topic,
    // });
  };
}

module.exports = { ScrapeWebsiteWorkflow };