#!/usr/bin/env -S deno run --quiet --allow-all --no-lock

import $ from "jsr:@david/dax@0.43.2";

// Publish to npm 
await $`deno run --allow-all --quiet jsr:@levibostian/decaf-script-npm`

// Create GitHub release
await $`deno run --allow-all --quiet jsr:@levibostian/decaf-script-github-releases set`