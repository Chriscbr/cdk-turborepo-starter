# CDK Turborepo starter with NPM

This is an experimental project template for using CDK with Turborepo. The
starter code inside defines a bare-bones CDK stack that will deploy the web app
defined in `apps/web` as a static website on AWS. (Deploying this may incur
charges since it makes use of the AWS S3 and AWS Cloudfront services.)

The motivation for this template is to make it as easy as possible to develop
application code and infrastructure code together in a single code repository
using familiar languages, without having to juggle between multiple packages or
configuration toolchains.

## What's inside?

This turborepo uses [NPM](https://www.npmjs.com/) as a package manager. It
includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org) app
- `cdk`: an [AWS CDK](https://aws.amazon.com/cdk/) app
- `ui`: a stub React component library shared by both `web` and `docs`
  applications
- `constructs`: a stub CDK construct library used by the `cdk` application
- `config`: `eslint` configurations (includes `eslint-config-next` and
  `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).
## Setup

Run `npm install` in the root directory. Since this is a monorepo, you should
not need to run `npm install` within any individual package directories.

### Commands

- `build` (builds all packages)
- `test` (runs all test suites)
- `test:update` (updates jest snapshots in test suites)
- `cdk:deploy` + `cdk:diff` + `cdk:destroy` (deploys, diffs, and destroys the
  AWS infrastructure defined in the `cdk` app)

See https://turborepo.org/ for more information about using turborepo, and
https://aws.amazon.com/cdk/ for more information about using the AWS CDK.

## Technical notes

The main challenge I had setting this up was that it's not trivial use another
package in a monorepo as if it's an ordinary dependency. In the Turborepo
starter repo, the Next.js apps are able to import react components from the
internal "ui" package by use of the "next-transpile-modules" tool, which tells
Next.js's under-the-hood bundler to run certain dependencies through its
webpack/babel/typescript pipelines, so it automagically works.

But CDK packages don't typically need to get bundled, and adding that seemed
like a non-starter. So after some Googling, I decided to use the TypeScript
"internal package" pattern described in the blog post by Jared Palmer:
https://turborepo.com/posts/you-might-not-need-typescript-project-references.
There are probably other / better cleaner ways to do this -- this is just the
first solution I arrived at. The blog post above mentions "internal packages
just work" with Vite.js, so it could be worth trying that and comparing. Or
perhaps using a bundler like webpack/rollup/etc.
