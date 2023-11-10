const { Stack } = require("aws-cdk-lib");
const { Table, AttributeType } = require("aws-cdk-lib/aws-dynamodb");

class DataStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside DataStack");

    console.log("(+) Inside DataStack");

    // Create DDB to store price and other data for each website
    this.AppTable = new Table(this, "AppTable", {
      partitionKey: {
        name: "siteName",
        type: AttributeType.STRING
      },
      sortKey: {
        name: "uiDateTime",
        type: AttributeType.STRING
      }
    });
  };
}

module.exports = { DataStack };