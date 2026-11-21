import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const locales = await Promise.all(['zh', 'en'].map(async locale =>
  JSON.parse(await readFile(new URL(`locale/${locale}.json`, root), 'utf8'))));
const keys = object => Object.keys(object).sort();
const placeholders = text => [...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();
function validate(zh, en, prefix = '') {
  assert.deepEqual(keys(zh), keys(en), `Locale keys differ: ${prefix}`);
  for (const key of keys(zh)) {
    if (key === 'meta') { validate(zh[key], en[key], 'meta.'); continue; }
    assert.ok(typeof zh[key] === 'string' && zh[key] && typeof en[key] === 'string' && en[key], `Invalid translation: ${prefix}${key}`);
    assert.deepEqual(placeholders(zh[key]), placeholders(en[key]), `Placeholders differ: ${prefix}${key}`);
  }
}
validate(...locales);
async function sources(directory) {
  const entries = await readdir(new URL(directory, root), { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? sources(`${directory}${entry.name}/`)
    : entry.name.endsWith('.js') ? readFile(new URL(directory + entry.name, root), 'utf8') : ''))).join('\n');
}
const source = await sources('src/client/');
// Dynamic keys use explicit tables (categories, resize edges) or literal error
// codes. All translation identifiers therefore appear as string literals.
const identifiers = new Set([...source.matchAll(/['"](\w+)['"]/g)].map(match => match[1]));
for (const [, key] of source.matchAll(/\bt\(['"](\w+)['"]/g)) {
  assert.ok(key in locales[0], `Missing translation: ${key}`);
}
const unused = keys(locales[0]).filter(key => key !== 'meta' && !identifiers.has(key));
assert.deepEqual(unused, [], `Unused translations: ${unused.join(', ')}`);
console.log(`i18n OK: ${keys(locales[0]).length - 1} keys per language; no unused keys or mismatched templates.`);
