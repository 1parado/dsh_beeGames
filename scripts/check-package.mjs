import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const temporary = await mkdtemp(path.join(tmpdir(), 'beeGames 安装验证 '));
function run(file, args, cwd) {
  const result = spawnSync(file, args, { cwd, encoding: 'utf8', env: { ...process.env, NODE_PATH: '' }, windowsHide: true });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${path.basename(file)} failed:\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}

// npm tarballs contain regular files under package/. Unpack those with Node's
// built-ins so this check needs neither a system tar executable nor npm deps.
async function unpack(tarball) {
  const archive = gunzipSync(await readFile(tarball));
  const entries = [];
  for (let offset = 0; offset + 512 <= archive.length;) {
    const header = archive.subarray(offset, offset + 512);
    if (header.every(byte => byte === 0)) break;
    const field = (start, length) => header.subarray(start, start + length).toString('utf8').replace(/\0.*$/s, '');
    const name = [field(345, 155), field(0, 100)].filter(Boolean).join('/');
    const size = parseInt(field(124, 12).trim() || '0', 8);
    const type = field(156, 1);
    const destination = path.resolve(temporary, name);
    assert.ok(destination.startsWith(temporary + path.sep), `Unsafe tar entry: ${name}`);
    assert.ok(name.startsWith('package/'), `Unexpected tar entry: ${name}`);
    assert.ok(Number.isSafeInteger(size) && size >= 0 && offset + 512 + size <= archive.length, 'Invalid tar length');
    if (type === '' || type === '0') {
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, archive.subarray(offset + 512, offset + 512 + size));
      entries.push(name.slice('package/'.length));
    } else if (type === '5') {
      await mkdir(destination, { recursive: true });
    } else {
      throw new Error(`Unsupported tar entry type: ${name} (${type})`);
    }
    offset += 512 + Math.ceil(size / 512) * 512;
  }
  return entries;
}

try {
  assert.ok(process.env.npm_execpath, 'Run this check with npm run package:check.');
  const stdout = run(process.execPath, [process.env.npm_execpath, 'pack', '--json', '--pack-destination', temporary], root);
  const jsonStart = stdout.search(/^\[\s*\{/m);
  assert.ok(jsonStart >= 0, 'npm pack did not return a JSON package list');
  const [packed] = JSON.parse(stdout.slice(jsonStart));
  const entries = await unpack(path.join(temporary, packed.filename));
  for (const required of ['package.json', 'index.js', 'client.js', 'client.build.json', 'src/client/entry.js', 'src/host/catalog.js', 'src/shared/urls.js', 'seed.js', 'data/seed.json', 'locale/zh.json', 'locale/en.json', 'cordis.patch.yml', 'icon.svg']) {
    assert.ok(entries.includes(required), `Missing packaged file: ${required}`);
  }
  for (const entry of entries) {
    assert.ok(!/^(?:output|dist|node_modules|\.playwright-cli)\//.test(entry), `Local artifact leaked into package: ${entry}`);
    const text = await readFile(path.join(temporary, 'package', entry), 'utf8');
    assert.ok(!/\b[A-Za-z]:[\\/]/.test(text), `Machine-specific path in ${entry}`);
    if (entry === 'package.json') {
      const metadata = JSON.parse(text);
      for (const group of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
        for (const spec of Object.values(metadata[group] ?? {})) {
          assert.ok(!/^(?:file|link):/.test(spec), `Local dependency in ${entry}`);
        }
      }
    }
  }
  const installed = path.join(temporary, 'package');
  run(process.execPath, ['scripts/sync-i18n.mjs', '--check'], installed);
  run(process.execPath, ['scripts/sync-seed.mjs', '--check'], installed);
  run(process.execPath, ['scripts/check-client.mjs'], installed);
  const tests = run(process.execPath, ['--test'], installed);
  console.log(tests.trim());
  console.log(`Package OK: ${packed.filename}; ${entries.length} files; isolated install tests passed without node_modules.`);
} finally {
  assert.equal(path.dirname(path.resolve(temporary)), path.resolve(tmpdir()), 'Cleanup must stay in the OS temp directory');
  await rm(temporary, { recursive: true, force: true });
}
