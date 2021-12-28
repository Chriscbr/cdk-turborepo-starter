import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export interface StaticWebsiteProps {
  readonly directory: string;
}

export class StaticWebsite extends Construct {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: StaticWebsiteProps) {
    super(scope, id);

    // The code that defines your stack goes here

    this.bucket = new s3.Bucket(this, "WebsiteBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    this.distribution = new cloudfront.Distribution(this, "WebsiteDistribution", {
      defaultBehavior: { origin: new origins.S3Origin(this.bucket) },
      defaultRootObject: 'index.html',
    });

    new s3deploy.BucketDeployment(this, "Deployment", {
      sources: [s3deploy.Source.asset(props.directory)],
      destinationBucket: this.bucket,
      distribution: this.distribution,
    });

    new cdk.CfnOutput(this, 'DomainName', {
      value: this.distribution.domainName,
      exportName: 'WebsiteDomainName',
    });
  }
}
