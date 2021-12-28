import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { StaticWebsite } from '../lib/index';
import * as path from 'path';

test('Stack snapshot', () => {
  // GIVEN
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'Test');

  // WHEN
  const directory = path.join(__dirname, 'website-fixture');
  new StaticWebsite(stack, 'MyTestStack', { directory });

  // THEN
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::S3::Bucket', {
    "PublicAccessBlockConfiguration": {
      "BlockPublicAcls": true,
      "BlockPublicPolicy": true,
      "IgnorePublicAcls": true,
      "RestrictPublicBuckets": true
    },
  });
  template.hasResourceProperties('AWS::CloudFront::Distribution', {
    "DistributionConfig": {
      "Enabled": true,
    },
  });
});
