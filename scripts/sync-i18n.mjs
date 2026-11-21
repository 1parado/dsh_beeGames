// Compatibility entry point. locale/*.json is the only dictionary source.
await import('./check-i18n.mjs');
if (!process.argv.includes('--check')) await import('./build-client.mjs');
