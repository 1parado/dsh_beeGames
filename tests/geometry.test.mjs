import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readGeometry, writeGeometry } from '../src/client/geometry.js';

test('geometry validates stored values and Home removes the saved preference', () => {
  const data = new Map();
  globalThis.window = { localStorage: { getItem: key => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) } };
  try {
    writeGeometry('position', { left: 0, top: 42 });
    assert.deepEqual(readGeometry('position', ['left', 'top']), { left: 0, top: 42 });
    for (const value of ['{}', '[]', 'null', '{', '{"left":-1,"top":2}', '{"left":"8","top":2}']) {
      data.set('position', value);
      assert.equal(readGeometry('position', ['left', 'top']), null);
    }
    writeGeometry('position', null);
    assert.equal(data.has('position'), false);
    data.set('size', '{"width":0,"height":20}');
    assert.equal(readGeometry('size', ['width', 'height']), null);
  } finally { delete globalThis.window; }
});

test('unavailable or denied localStorage does not break the game', () => {
  globalThis.window = { get localStorage() { throw new Error('Denied'); } };
  try {
    assert.equal(readGeometry('position', ['left', 'top']), null);
    assert.doesNotThrow(() => writeGeometry('position', { left: 1, top: 2 }));
  } finally { delete globalThis.window; }
});
