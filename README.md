# testsuite-marketplace

## Running the test locally

With Chromedriver (full browser, to help debug)

```
yarn test:local
```

Before the test runs a 'pre' script in package.json will attempt to use PM2 to start the following services: 
- app-cow-publisher
- app-b2b-marketplace
- service-b2b-marketplace

## Running against staging

Uses Saucelabs. Credentials are stored in [Travis](https://travis-ci.org/yewtu/testsuite-marketplace/settings)

```
yarn test
```

## CI

Tests are run automatically on [Travis](https://travis-ci.org/yewtu/testsuite-marketplace) after a push to any of the dependent services above. For each dependency, a heroku post-deploy addon sends an HTTP post to a listener app (index.js within this repo, [running on Heroku](https://dashboard.heroku.com/apps/testsuite-marketplace-staging)) which then triggers the Travis test run via its API.