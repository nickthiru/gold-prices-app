const { Stack } = require("aws-cdk-lib");
const { WebsiteScraper } = require("./construct/website-scraper");

class WebsiteScraperStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside 'WebsiteScraperStack'")

    const { tableArn, tableName } = props;
    // console.log("(+) tableArn: " + tableArn);
    // console.log("(+) tableName: " + tableName);

    new WebsiteScraper(this, "LiveChennai", {
      websiteName: "LiveChennai",
      tableArn,
      tableName
    });

    new WebsiteScraper(this, "Thangamayil", {
      websiteName: "Thangamayil",
      tableArn,
      tableName
    });

    new WebsiteScraper(this, "Bhima", {
      websiteName: "Bhima",
      tableArn,
      tableName
    });
  };
}

module.exports = { WebsiteScraperStack };