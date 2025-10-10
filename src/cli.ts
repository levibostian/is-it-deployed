#!/usr/bin/env node

import { Command } from 'commander';
import { isItDeployed } from '.';
import { exit } from 'process';

const program = new Command()
  .requiredOption('--package-manager <name>', 'npm')
  .requiredOption('--package-name <name>', 'react')
  .requiredOption('--package-version <name>', '1.0.0')
  .option('--max-retries <number>', 'retry checking every few seconds until max retries is reached. If max is reached, return false', undefined)
  .parse();

(async () => {
  const {
    packageManager,
    packageName,
    packageVersion,
    maxRetries
  } = program.opts()
  
  console.log(`Checking if ${packageName}@${packageVersion} is deployed on ${packageManager}...`)
  if (maxRetries) {
    console.log(`Will retry ${maxRetries} times`)
  }

  const isItDeployedResult = await isItDeployed({
    packageManager,
    packageName,
    packageVersion
  }, maxRetries)

  if (!isItDeployedResult) {
    console.log('its not')
    exit(1)
  }

  console.log('its deployed')
  exit(0)
})()