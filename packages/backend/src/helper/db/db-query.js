const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

module.exports = DbQuery = {

  async latestPriceDateTime(ddbClient, tableName, siteName) {
    console.log("\n");
    console.log("(+) Inside 'latestPriceDateTime()'");
    // console.log("(+) tableName: " + tableName);

    try {
      console.log("(+) Getting from DyDB...");

      const response = await ddbClient.send(new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: "#siteName = :siteName",
        ProjectionExpression: "#goldPrice, #siteDateTime",
        ExpressionAttributeNames: {
          "#siteName": "siteName",
          "#goldPrice": "goldPrice",
          "#siteDateTime": "siteDateTime"
        },
        ExpressionAttributeValues: {
          ":siteName": siteName
        },
        ScanIndexForward: false,
        Limit: 1,
      }));

      console.log("(+) response: \n" + JSON.stringify(response, null, 2));
      // console.log("(+) typeof response: \n" + typeof response);

      console.log("(+) response['Items'][0]: \n" + JSON.stringify(response["Items"][0], null, 2));

      const item = response["Items"][0];

      if (item === undefined) {
        return {
          goldPrice: undefined,
          siteDateTime: undefined,
        }
      }

      return {
        goldPrice: item.goldPrice,
        siteDateTime: item.siteDateTime,
      };

    } catch (error) {
      console.log("(-) Error: " + error);
    };
  },

  // API
  async latestPrices(ddbClient, tableName) {
    console.log("(+) Inside 'getPrices()'");
    console.log("(+) tableName: " + tableName);

    const websites = ["Live Chennai", "Thangamayil", "Bhima"];

    try {
      console.log("(+) Getting from DyDB...");

      const data = [];

      const responses = websites.map(async (website) => {
        console.log("(+) website: " + website);

        const response = await ddbClient.send(new QueryCommand({
          // TableName: "BackendStackDataStackE94D765A-WebsiteTableF4B2AB07-1EOQBSA0HXWT8",
          TableName: tableName,
          KeyConditionExpression: "#siteName = :siteName",
          ProjectionExpression: "#siteName, #uiDateTime, #goldPrice",
          ExpressionAttributeNames: {
            "#siteName": "siteName",
            "#uiDateTime": "uiDateTime",
            "#goldPrice": "goldPrice"
          },
          ExpressionAttributeValues: {
            ":siteName": website
          },
          ScanIndexForward: false,
          Limit: 1
        }));

        console.log("(+) response: \n" + JSON.stringify(response, null, 2));
        // console.log("(+) typeof response: \n" + typeof response);

        console.log("(+) response['Items'][0]: \n" + JSON.stringify(response["Items"][0], null, 2));

        return response["Items"][0];
      });

      for await (let response of responses) {
        data.push(response);
      }

      return data;

    } catch (error) {
      console.log("(-) Error: " + error);
    };
  },
}

