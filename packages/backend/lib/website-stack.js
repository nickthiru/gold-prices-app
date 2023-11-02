const { Stack } = require("aws-cdk-lib");
const { Website } = require("./construct/website-construct");

class WebsiteStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside 'WebsiteStack'")

    const { tableArn, tableName } = props;
    // console.log("(+) tableArn: " + tableArn);
    // console.log("(+) tableName: " + tableName);

    new Website(this, "LiveChennai", {
      websiteName: "LiveChennai",
      schedule: "",
      tableArn,
      tableName
    });

    new Website(this, "Thangamayil", {
      websiteName: "Thangamayil",
      schedule: "",
      tableArn,
      tableName
    });

    new Website(this, "Bhima", {
      websiteName: "Bhima",
      schedule: "",
      tableArn,
      tableName
    })
  };
}

module.exports = { WebsiteStack };