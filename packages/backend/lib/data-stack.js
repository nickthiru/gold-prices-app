const { Stack } = require("aws-cdk-lib");

class DataStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create DDB to store price and other data for each website

  };
}

module.exports = { DataStack };