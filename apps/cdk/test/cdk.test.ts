import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Cdk from '../lib/cdk-stack';

test('Stack snapshot', () => {
  // GIVEN
  const app = new cdk.App();

  // WHEN
  const stack = new Cdk.CdkStack(app, 'Test');

  // THEN
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
