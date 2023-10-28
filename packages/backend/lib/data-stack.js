const { Stack, CfnOutput } = require("aws-cdk-lib");
const { Table, AttributeType } = require("aws-cdk-lib/aws-dynamodb");

class DataStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    console.log("(+) Inside DataStack");

    console.log("(+) Inside DataStack");

    // Create DDB to store price and other data for each website
    this.websiteTable = new Table(this, "WebsiteTable", {
      partitionKey: {
        name: "siteName",
        type: AttributeType.STRING
      },
      sortKey: {
        name: "scrapeDateInUTC",
        type: AttributeType.STRING
      }
    });

    // console.log("(+) websiteTable.tableName: " + this.websiteTable.tableName);

    // const stack = Stack.of(this);
    // const str = stack.toJsonString({
    //   value: this.websiteTable.tableArn
    // });
    // console.log("(+) str: " + str);

    // new CfnOutput(this, "WebsiteTableArn", {
    //   value: this.websiteTable.tableArn,
    //   exportName: "WebsiteTableArn"
    // });

    // new CfnOutput(this, "WebsiteTableName", {
    //   value: this.websiteTable.tableName,
    //   exportName: "WebsiteTableName"
    // });
  };
}

module.exports = { DataStack };