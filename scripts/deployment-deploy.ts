#!/usr/bin/env -S deno run --quiet --allow-all --no-lock

import $ from "jsr:@david/dax@0.43.2";
import { getDeployStepInput } from "jsr:@levibostian/decaf-sdk@0.2.1";

const input = getDeployStepInput();

console.log(`Updating package version to ${input.nextVersionName}...`);

// Update package.json version
await $`npm version ${input.nextVersionName} --no-git-tag-version`.printCommand();

// Verify the version was updated correctly
await $`cat package.json | grep '"version": "${input.nextVersionName}"'`;

console.log("Testing npm authentication...");
await $`npm whoami`.printCommand();

const publishArgs = ["publish"];

if (input.testMode) {
  publishArgs.push("--dry-run");
}

// Check if already deployed using the is-it-deployed package
const packageName = (await $`npm pkg get name`.text()).trim().replace(/"/g, "");
const didAlreadyDeployToNpm =
  (await $`npx dist/cli.js --package-manager npm --package-name ${packageName} --package-version ${input.nextVersionName}`
    .noThrow()).code === 0;

if (didAlreadyDeployToNpm) {
  console.log(
    `npm package ${input.nextVersionName} is already deployed. Skipping pushing to npm`,
  );
} else {
  await $`npm ${publishArgs}`.printCommand();
}

const releaseArgs = [
  "release",
  "create",
  input.nextVersionName,
  "--generate-notes",
  "--latest",
  "--target",
  "main",
];

if (input.testMode) {
  console.log("Running in test mode, skipping creating GitHub release.");
  console.log(`Command to create GitHub release: gh ${releaseArgs.join(" ")}`);
} else {
  await $`gh ${releaseArgs}`.printCommand();
}
