import { build, version } from 'esbuild';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { root, clientInputs, digest } from './client-inputs.mjs';

const result = await build({
  absWorkingDir: fileURLToPath(root),
  entryPoints: ['src/client/entry.js'],
  outfile: 'client.js',
  bundle: true,
  platform: 'browser',
  format: 'cjs',
  target: 'es2020',
  external: ['react'],
  loader: { '.css': 'text', '.svg': 'dataurl' },
  write: false,
  legalComments: 'none',
  banner: { js: `// Generated from src/client and locale/*.json. Run npm run build; do not edit.\nwindow.__ModuleLoader__.load({ id: 'dsh-beegame', factory: require => {\nconst module = { exports: {} };` },
  footer: { js: 'return module.exports;\n} });' },
});
const output = result.outputFiles[0].contents;
await writeFile(new URL('client.js', root), output);
await writeFile(new URL('client.build.json', root), JSON.stringify({
  format: 1, builder: `esbuild@${version}`, inputs: await clientInputs(), output: digest(output),
}, null, 2) + '\n');
console.log(`Built client.js (${output.length} bytes); React is supplied by the host.`);
