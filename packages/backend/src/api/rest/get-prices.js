// const { QueryCommand } = require("@aws-sdk/client-dynamodb");
const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

const websites = ["Live Chennai", "Thangamayil", "Bhima"];
// const website = "Live Chennai";


async function getPrices(ddbClient, tableName) {
  console.log("(+) Inside 'getPrices()'");
  console.log("(+) tableName: " + tableName);

  try {
    console.log("(+) Getting from DyDB...");

    const data = [];

    const responses = websites.map(async (website) => {
      console.log("(+) website: " + website);

      const response = await ddbClient.send(new QueryCommand({
        // TableName: "BackendStackDataStackE94D765A-WebsiteTableF4B2AB07-1EOQBSA0HXWT8",
        TableName: tableName,
        KeyConditionExpression: "#siteName = :siteName",
        ProjectionExpression: "#siteName, #goldKarat, #goldPrice",
        ExpressionAttributeNames: {
          "#siteName": "siteName",
          "#goldKarat": "goldKarat",
          "#goldPrice": "goldPrice"
        },
        ExpressionAttributeValues: {
          ":siteName": website
        },
        ScanIndexForward: false,
        Limit: 1
      }));

      console.log("(+) response: \n" + JSON.stringify(response, null, 2));
      console.log("(+) typeof response: \n" + typeof response);

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
}

module.exports = { getPrices };