const { Stack } = require("aws-cdk-lib");
const { LiveChennai } = require("./website/live-chennai");
// const { LiveChennai2 } = require("./website/live-chennai2");

class WebsiteStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    new LiveChennai(this, "LiveChennai");
    // new LiveChennai(this, "LiveChennai2");
  };
}

module.exports = { WebsiteStack };