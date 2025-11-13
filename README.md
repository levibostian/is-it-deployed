# is-it-deployed

node module (and CLI) that checks if a specific version of a package has been deployed yet. 

# Getting started 

### Run as a CLI

`npx is-it-deployed --package-manager npm --package-name is-it-deployed --package-version 1.0.0`

Command will succeed if the package has been deployed, and fail if it hasn't.

### Run as a module

`npm install is-it-deployed`

```js 
import { isItDeployed } from 'is-it-deployed'

await isItDeployed({ packageManager: '<package-manager-name>', packageName: '<package-name>', packageVersion: '1.0.0' })
// returns true if the package has been deployed, false if it hasn't
```

# Supported package managers

## npm 

To see if a package has been uploaded to npmjs.com, use the `npm` package manager with the module or the CLI. 

Here is an example with the CLI: 

`npx is-it-deployed --package-manager npm --package-name is-it-deployed --package-version 1.0.0`

## jsr 

To see if a package has been uploaded to jsr.io, use the `jsr` package manager with the module or the CLI. 

Here is an example with the CLI: 

`npx is-it-deployed --package-manager jsr --package-name is-it-deployed --package-version 1.0.0`

## CocoaPods 

To see if a package has been uploaded to CocoaPods, use the `cocoapods` package manager with the module or the CLI.

Here is an example with the CLI:

`npx is-it-deployed --package-manager cocoapods --package-name Wendy --package-version 2.8.3`

## Maven

To see if a package has been uploaded to the Maven Central repository, use the `maven` package manager with the module or the CLI.

Here is an example with the CLI:

`npx is-it-deployed --package-manager maven --package-name 'com.levibostian.teller:teller-android' --package-version 3.6.6`

# Goals 

This project tries to follow these goals in regards to what it does and doesn't do:

* **Checks the single source of truth**. For example, if a package manager uses a cache that only gets updated every X minutes, this project will bypass the cache and go to the main repository to check if the package has been deployed. For an example of this, see the CocoaPods implementation.

* **Zero dependencies**. This project has the vision of being able to check versions for multiple different package managers. It's not ideal if someone needs to download dependencies for X package manager when they only want to use Y package manager. So far, this project has had good success with performing HTTP requests to the package manager web server/API directly, without needing to download any dependencies.

* **CLI and a module**. We want this project to be flexible so nodejs developers can use it (via module), but also anyone not using node can use it as well (via CLI). 

* **Made for humans and for CIs**. It's important that this project can be used by machines (such as a CI) to programmatically check if a package has been deployed. We currently do this with return values from the module or exit codes from CLI. The pattern used thus far is: Console output is also available for humans to read while return values are for machines. 

### What this project does do: 

* Tells you if a specific version of a specific package has been deployed already to a specific package manager.

### What this project doesn't do:

* Tells you if there is a newer version of a package available. 

# Contributing

### Development 

* `nvm use`
* `npm install`
* `npm run test` to run tests. Tests are the easiest way to test features of the project.


