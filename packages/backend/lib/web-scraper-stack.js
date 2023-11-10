const { Stack } = require("aws-cdk-lib");
const { WebScraper } = require("./construct/web-scraper");

class WebScraperStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside 'WebScraperStack'")

    const { tableArn, tableName } = props;
    // console.log("(+) tableArn: " + tableArn);
    // console.log("(+) tableName: " + tableName);

    new WebScraper(this, "LiveChennai", {
      siteName: "LiveChennai",
      tableArn,
      tableName
    });

    new WebScraper(this, "Thangamayil", {
      siteName: "Thangamayil",
      tableArn,
      tableName
    });

    new WebScraper(this, "Bhima", {
      siteName: "Bhima",
      tableArn,
      tableName
    });
  };
}

module.exports = { WebScraperStack };