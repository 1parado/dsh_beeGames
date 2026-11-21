/** Bounded, per-plugin cache. Admission is always checked before calling it. */
export function createCatalogCache({ ttl = 60_000, maxEntries = 64, now = Date.now } = {}) {
  const entries = new Map();
  return {
    get(key, load) {
      const existing = entries.get(key);
      if (existing && (existing.pending || existing.expires > now())) {
        entries.delete(key);
        entries.set(key, existing);
        return existing.pending ?? Promise.resolve(existing.value);
      }
      const entry = {};
      entries.delete(key);
      entries.set(key, entry);
      while (entries.size > maxEntries) entries.delete(entries.keys().next().value);
      entry.pending = Promise.resolve().then(load).then(value => {
        entry.value = value;
        entry.expires = now() + ttl;
        entry.pending = undefined;
        return value;
      }, error => {
        if (entries.get(key) === entry) entries.delete(key);
        throw error;
      });
      return entry.pending;
    },
    clear: () => entries.clear(),
  };
}
