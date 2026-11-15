import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createProxy } from '../src/netlify-proxy.mjs';
import worker from '../dist/server/index.js';
import { openDatabase } from '../scripts/database.mjs';

const origin = 'https://ecoruta-example.netlify.app';
const request = (path, init) => new Request(origin + path, init);

test('Netlify: login, sesión, viaje, persistencia y logout a través del proxy', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'ecoruta-proxy-'));
  const filename = join(dir, 'test.sqlite');
  let db = openDatabase(filename);
  const proxy = createProxy((url, init) => worker.fetch(new Request(url, init), { DB: db }));
  try {
    const login = await proxy(request('/api/login', { method: 'POST',
      headers: { Origin: origin, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'conductor@ecoruta.test', password: 'EcoRuta2026!' })
    }));
    assert.equal(login.status, 200);
    const setCookie = login.headers.get('set-cookie');
    for (const flag of ['HttpOnly', 'Secure', 'SameSite=Strict', 'Path=/']) assert.ok(setCookie.includes(flag));
    assert.ok(!/Domain=/i.test(setCookie));
    assert.equal(login.headers.get('cache-control'), 'no-store');
    const cookie = setCookie.split(';')[0];
    const headers = { Origin: origin, Cookie: cookie, 'Content-Type': 'application/json' };
    const created = await proxy(request('/api/trips', { method: 'POST', headers,
      body: JSON.stringify({ origin: 'Prueba Netlify', destination: 'Tecsup', meeting: 'Plaza ficticia',
        departure: new Date(Date.now() + 86400000).toISOString(), capacity: 1, cost: 4 })
    }));
    assert.equal(created.status, 201);
    const id = (await created.json()).id;
    db.close(); db = openDatabase(filename);
    const trips = await proxy(request('/api/trips?origin=Prueba%20Netlify', { headers }));
    assert.equal((await trips.json()).trips[0].id, id);
    const logout = await proxy(request('/api/logout', { method: 'POST', headers }));
    assert.equal(logout.status, 200);
    assert.match(logout.headers.get('set-cookie'), /Max-Age=0/);
    assert.equal((await (await proxy(request('/api/session', { headers }))).json()).user, null);
  } finally { db.close(); rmSync(dir, { recursive: true, force: true }); }
});

test('Netlify: rechaza otro origen y solicitudes cross-site antes de contactar al servidor', async () => {
  const proxy = createProxy(() => assert.fail('No debe contactar al servidor'));
  for (const headers of [{ Origin: 'https://otro.test' }, { Origin: 'null' }, { 'Sec-Fetch-Site': 'cross-site' }]) {
    assert.equal((await proxy(request('/api/logout', { method: 'POST', headers }))).status, 403);
  }
  assert.equal((await proxy(request('/api/trips', { method: 'DELETE' }))).status, 405);
  assert.equal((await proxy(request('/otra-ruta'))).status, 404);
});

test('Netlify: limita cuerpos incluso cuando no hay Content-Length', async () => {
  const proxy = createProxy(() => assert.fail('No debe contactar al servidor'));
  assert.equal((await proxy(request('/api/login', { method: 'POST', body: 'x'.repeat(12001) }))).status, 413);
});

test('Netlify: destino fijo, conserva filtros y reenvía solo la cookie de EcoRuta', async () => {
  const proxy = createProxy(async (url, init) => {
    assert.equal(url, 'https://ecoruta-mauricio-tecsup.wirygoldfish.chatgpt.site/api/trips?origin=Zona&url=https://otro.test');
    assert.equal(init.headers.get('cookie'), 'ecoruta_session=abc-123');
    assert.equal(init.headers.get('authorization'), null);
    assert.equal(init.headers.get('x-forwarded-host'), null);
    assert.equal(init.redirect, 'manual');
    return Response.json({ error: 'Sin acceso' }, { status: 401 });
  });
  const result = await proxy(request('/api/trips?origin=Zona&url=https://otro.test', {
    headers: { Cookie: 'netlify_cookie=private; ecoruta_session=abc-123', Authorization: 'Bearer ignored', 'X-Forwarded-Host': 'otro.test' }
  }));
  assert.equal(result.status, 401);
  assert.deepEqual(await result.json(), { error: 'Sin acceso' });
});

test('Netlify: errores y redirecciones del servidor no filtran datos ni redirigen al usuario', async () => {
  for (const remote of [
    async () => { throw Error('detalle interno'); },
    async () => new Response(null, { status: 302, headers: { Location: 'https://otro.test' } }),
    async () => new Response('<html>Error</html>', { headers: { 'Content-Type': 'text/html' } })
  ]) {
    const response = await createProxy(remote)(request('/api/health'));
    assert.equal(response.status, 502);
    assert.equal(response.headers.get('location'), null);
    assert.ok(!(await response.text()).includes('detalle interno'));
  }
});
