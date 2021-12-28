import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import { StaticWebsite } from 'web-constructs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const directory = path.join(__dirname, '..', '..', 'web', 'out');
    new StaticWebsite(this, 'Demo', { directory });
  }
}
