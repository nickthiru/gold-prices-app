const { Construct } = require("constructs");
const { ScrapeWebsiteAction } = require("./scrape-website-action");
const { ScrapeWebsiteRunner } = require("./scrape-website-runner");


// const domainWorkflow = {
//   domain: "WebScraperService",
//   workflow: {
//     name: "ScrapeWebsite",
//     description: ""
//   },
//   triggerEvent: {
//     type: "EventBridge",
//     description: "",
//   },
//   outputEvent: {
//     name: "ScrapeWebsiteCompleted",
//     description: "",
//   }
// };

const websites = ["Live Chennai", "Bhima", "Thangamayil"];
// const websites = ["Bhima"];


class ScrapeWebsiteWorkflow extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside 'ScrapeWebsiteWorkflow' construct");

    const { tableArn, tableName, outputEvent_Topic } = props;
    console.log("(+) tableArn: " + tableArn);
    console.log("(+) tableName: " + tableName);
    console.log("(+) outputEvent_Topic: " + outputEvent_Topic);


    const scrapeWebsiteAction_LambdaNames = websites.map((siteName) => {
      console.log("websites.map((siteName)): " + siteName);

      const scrapeWebsiteAction = new ScrapeWebsiteAction(this, `${siteName}ScrapeWebsiteAction`, {
        siteName,
        tableArn,
        tableName,
      });

      return scrapeWebsiteAction.lambda.functionName;

    });
    console.log("(+) scrapeWebsiteAction_LambdaNames: " + JSON.stringify(scrapeWebsiteAction_LambdaNames, null, 2));


    new ScrapeWebsiteRunner(this, "ScrapeWebsiteRunner", {
      scrapeWebsiteAction_LambdaNames: scrapeWebsiteAction_LambdaNames,
      outputEvent_Topic,
    });
  };
}

module.exports = { ScrapeWebsiteWorkflow };