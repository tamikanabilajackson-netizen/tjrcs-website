// Generates backend/program-data.json from lib/program-data.ts.
//
// WHY THIS EXISTS
// lib/program-data.ts is the single source of truth for Build & Launch facts,
// but it's TypeScript inside the Next.js app. backend/server.js is a separate
// CommonJS Express app deployed independently on Render, so it can't import
// the .ts file. Rather than hand-copying the facts into server.js (which
// recreates the exact drift problem program-data.ts was created to solve),
// we compile the TS export down to a plain JSON file the backend can require.
//
// The JSON is a BUILD ARTIFACT that is COMMITTED to the repo. That's
// deliberate: Render deploys backend/ with a plain `npm install && npm start`
// and no TypeScript toolchain, so the data has to already be there.
//
// USAGE
//   node scripts/generate-program-data.mjs           # write the JSON
//   node scripts/generate-program-data.mjs --check   # verify it's current
//
// --check exits non-zero if the committed JSON has drifted from the TS
// source. `npm run build` runs the writer via the prebuild hook, so a
// Vercel deploy always regenerates it.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..');
const SOURCE = path.join(repoRoot, 'lib', 'program-data.ts');
const OUTPUT = path.join(repoRoot, 'backend', 'program-data.json');

const require = createRequire(import.meta.url);
// Use the `typescript` devDependency rather than Node's native type stripping
// so this works regardless of the Node version on a build machine.
const ts = require('typescript');

/**
 * Transpiles program-data.ts and evaluates it to get the exported object.
 * Safe to eval here because the input is our own checked-in source file, and
 * this script only ever runs at build time, never on a request path.
 */
function loadProgramData() {
  const source = fs.readFileSync(SOURCE, 'utf8');

  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: 'program-data.ts',
  });

  const module = { exports: {} };
  // program-data.ts is pure data with no imports, so a bare module shim is
  // all the sandbox it needs.
  const evaluate = new Function('exports', 'module', outputText);
  evaluate(module.exports, module);

  const data = module.exports.buildAndLaunchProgram;
  if (!data) {
    throw new Error(
      `Expected lib/program-data.ts to export "buildAndLaunchProgram", but it did not.`
    );
  }
  return data;
}

function render(data) {
  // _generated is a tripwire for anyone who opens the JSON directly and is
  // tempted to edit it. Key order follows the TS object, so diffs stay clean.
  const payload = {
    _generated:
      'DO NOT EDIT. Generated from lib/program-data.ts by scripts/generate-program-data.mjs. Run `npm run generate:program-data` after changing the source.',
    ...data,
  };
  return JSON.stringify(payload, null, 2) + '\n';
}

const isCheck = process.argv.includes('--check');
const next = render(loadProgramData());

if (isCheck) {
  const current = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf8') : null;
  if (current !== next) {
    console.error(
      'backend/program-data.json is out of date with lib/program-data.ts.\n' +
        'Run `npm run generate:program-data` and commit the result.'
    );
    process.exit(1);
  }
  console.log('backend/program-data.json is up to date.');
} else {
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, next);
  console.log(`Wrote ${path.relative(repoRoot, OUTPUT)}`);
}
