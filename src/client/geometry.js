export function readGeometry(key, fields) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key));
    if (!value || fields.some(field => !Number.isFinite(value[field]) || value[field] < 0 || value[field] > 100_000)) return null;
    if (fields.includes('width') && (!value.width || !value.height)) return null;
    return Object.fromEntries(fields.map(field => [field, value[field]]));
  } catch { return null; }
}

export function writeGeometry(key, value) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch { /* Storage may be disabled or full. */ }
}
