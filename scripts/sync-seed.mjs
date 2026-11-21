import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const catalog = JSON.parse(await readFile(new URL('data/seed.json', root), 'utf8'));
if (!Number.isFinite(catalog.updatedAt) || !Array.isArray(catalog.games) || !catalog.games.length) {
  throw new Error('Invalid built-in catalog');
}
const ids = new Set();
for (const game of catalog.games) {
  if (!game.id || ids.has(game.id) || !game.name || !Array.isArray(game.category)) throw new Error(`Invalid or duplicate game: ${game.id}`);
  ids.add(game.id);
  for (const field of ['url', 'image']) {
    const url = new URL(game[field]);
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error(`Invalid ${field} for ${game.id}`);
  }
}
const source = `/** Generated from data/seed.json with npm run seed:sync. */
export const SEED_UPDATED_AT = ${JSON.stringify(catalog.updatedAt)};

export const SEED_GAMES = ${JSON.stringify(catalog.games, null, 2)};

/** Catalog metadata only; games and images still require internet access. */
export const SEED_CATALOG = { updatedAt: SEED_UPDATED_AT, games: SEED_GAMES };
`;
const target = new URL('seed.js', root);
if (process.argv.includes('--check')) {
  const existing = await readFile(target, 'utf8');
  if (existing.replace(/\r\n/g, '\n') !== source) throw new Error('Built-in catalog is stale. Run npm run seed:sync.');
  console.log(`Seed OK: ${catalog.games.length} games; source and runtime catalog match.`);
} else {
  await writeFile(target, source);
  console.log(`Synchronized ${catalog.games.length} built-in games.`);
}
