const { Stack } = require("aws-cdk-lib");
const { Table, AttributeType } = require("aws-cdk-lib/aws-dynamodb");

class DataStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside 'DataStack'");

    // Create DDB to store price and other data for each website
    this.App_Table = new Table(this, "App_Table", {
      partitionKey: {
        name: "PK",
        type: AttributeType.STRING
      },
      sortKey: {
        name: "SK",
        type: AttributeType.STRING
      }
    });


    // this.AppTable = new Table(this, "AppTable", {
    //   partitionKey: {
    //     name: "siteName",
    //     type: AttributeType.STRING
    //   },
    //   sortKey: {
    //     name: "uiDateTime",
    //     type: AttributeType.STRING
    //   }
    // });
  };
}

module.exports = { DataStack };