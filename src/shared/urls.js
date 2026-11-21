/** Validate public resource URLs without accepting executable URLs or credentials. */
export function httpsUrl(value) {
  if (typeof value !== 'string' || value === '') return '';
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) return '';
    return url.href;
  } catch { return ''; }
}

/** allow-scripts + allow-same-origin requires a game outside the host origin. */
export function gameUrl(value, hostOrigin = globalThis.location?.origin) {
  const safe = httpsUrl(value);
  return safe && new URL(safe).origin !== hostOrigin ? safe : '';
}
