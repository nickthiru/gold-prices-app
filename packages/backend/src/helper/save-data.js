const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

async function saveData(ddbClient, tableName, dataToSave) {
  console.log("(+) Inside 'saveData()'");
  // console.log("(+) tableName: " + tableName);
  // console.log("(+) dataToSave: \n" + JSON.stringify(dataToSave, null, 2));

  const item = {
    siteName: dataToSave.siteName,
    goldKarat: dataToSave.goldKarat,
    currency: dataToSave.currency,
    date: dataToSave.date,
    lastUpdatedTime: dataToSave.lastUpdatedTime,
    goldPrice: dataToSave.goldPrice
  };

  console.log("(+) item: \n" + JSON.stringify(item, null, 2));

  try {
    const result = await ddbClient.send(new PutItemCommand({
      TableName: tableName,
      Item: marshall(item)
    }));

    console.log("(+) result: " + JSON.stringify(result));

    return {
      statusCode: 201,
      message: "Item successfully saved in DDB"
    };

  } catch (error) {
    console.log("(-) Error: " + error);
  };
}

module.exports = { saveData };