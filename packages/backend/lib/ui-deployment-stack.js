const { Stack, CfnOutput } = require("aws-cdk-lib");
const { OriginAccessIdentity, Distribution } = require("aws-cdk-lib/aws-cloudfront");
const { S3Origin } = require("aws-cdk-lib/aws-cloudfront-origins");
const { Bucket } = require("aws-cdk-lib/aws-s3");
const { BucketDeployment, Source } = require("aws-cdk-lib/aws-s3-deployment");
const { existsSync } = require("fs");
const { join } = require("path");

class UiDeploymentStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const uiDir = join(__dirname, "../../frontend/dist");

    if (!existsSync(uiDir)) {
      console.warn("UI dir not found: " + uiDir);
      return;
    }

    const bucket = new Bucket(this, "UiDeploymentBucket");

    new BucketDeployment(this, "BucketDeployment", {
      destinationBucket: bucket,
      sources: [Source.asset(uiDir)]
    });

    const originIdentity = new OriginAccessIdentity(this, "OriginAccessIdentity");
    bucket.grantRead(originIdentity);

    const distribution = new Distribution(this, "Distribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new S3Origin(bucket, {
          originAccessIdentity: originIdentity
        })
      }
    });

    new CfnOutput(this, "url", {
      value: distribution.distributionDomainName,
      description: "",
      exportName: "url"
    });
  };
}

module.exports = { UiDeploymentStack };