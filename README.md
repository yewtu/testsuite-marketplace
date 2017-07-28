# testsuite-marketplace

## Running the test locally

```
yarn test:browser
```

Before the test runs a 'pre' script in package.json will attempt to use PM2 to start the following services: 
- app-cow-publisher
- app-b2b-marketplace
- service-b2b-marketplace

## Running against staging

```
yarn test:browser:staging
```