import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

export const root = new URL('../', import.meta.url);
export const digest = value => createHash('sha256')
  .update((typeof value === 'string' ? value : new TextDecoder().decode(value)).replace(/\r\n/g, '\n')).digest('hex');
async function sourceFiles(directory) {
  const entries = await readdir(new URL(directory, root), { withFileTypes: true });
  const groups = await Promise.all(entries.map(entry => entry.isDirectory()
    ? sourceFiles(`${directory}${entry.name}/`) : [`${directory}${entry.name}`]));
  return groups.flat();
}
export async function clientInputs() {
  const files = [...await sourceFiles('src/client/'), ...await sourceFiles('src/shared/'),
    'locale/zh.json', 'locale/en.json', 'icon.svg', 'package.json', 'scripts/build-client.mjs', 'scripts/client-inputs.mjs'];
  return Object.fromEntries(await Promise.all(files.sort().map(async file =>
    [file, digest(await readFile(new URL(file, root)))])));
}
