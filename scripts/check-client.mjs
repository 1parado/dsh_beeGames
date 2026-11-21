import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { root, clientInputs, digest } from './client-inputs.mjs';

const manifest = JSON.parse(await readFile(new URL('client.build.json', root), 'utf8'));
assert.deepEqual(manifest.inputs, await clientInputs(), 'Client inputs changed. Run npm run build.');
assert.equal(manifest.output, digest(await readFile(new URL('client.js', root))), 'Generated client changed. Run npm run build.');
console.log('Client OK: shipped bundle matches all source, locale and build inputs.');
