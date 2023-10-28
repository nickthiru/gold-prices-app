const { Stack, Fn } = require("aws-cdk-lib");
const { LiveChennai } = require("./website/live-chennai");
// const { LiveChennai2 } = require("./website/live-chennai2");

class WebsiteStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside 'WebsiteStack'")

    const { tableArn, tableName } = props;
    // console.log("(+) tableArn: " + tableArn);
    // console.log("(+) tableName: " + tableName);

    // const fnTableArn = Fn.importValue("WebsiteTableArn");
    // console.log("(+) Fn.importValue() fnTableArn: " + fnTableArn)

    new LiveChennai(this, "LiveChennai", {
      tableArn,
      tableName
    });
  };
}

module.exports = { WebsiteStack };