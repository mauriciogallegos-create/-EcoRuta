// La interfaz vive en Netlify; las reglas y los datos permanecen en el Worker/D1.
const UPSTREAM = 'https://ecoruta-mauricio-tecsup.wirygoldfish.chatgpt.site';
const MAX_BODY = 12000;

function error(status, message) {
  return Response.json({ error: message }, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
  });
}

export function createProxy(fetchUpstream = fetch) {
  return async function proxy(request) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return error(404, 'Ruta no encontrada.');
    if (!['GET', 'POST'].includes(request.method)) return error(405, 'Método no permitido.');

    if (request.method === 'POST') {
      const origin = request.headers.get('origin');
      if ((origin && origin !== url.origin) || request.headers.get('sec-fetch-site') === 'cross-site') {
        return error(403, 'Origen de solicitud no permitido.');
      }
    }

    const headers = new Headers({ Accept: 'application/json' });
    const session = (request.headers.get('cookie') || '').split(';')
      .map(part => part.trim()).find(part => /^ecoruta_session=[A-Za-z0-9-]+$/.test(part));
    if (session) headers.set('Cookie', session);
    const contentType = request.headers.get('content-type');
    if (contentType) headers.set('Content-Type', contentType);

    let body;
    if (request.method === 'POST') {
      if (Number(request.headers.get('content-length')) > MAX_BODY) return error(413, 'Solicitud demasiado grande.');
      const reader = request.body?.getReader();
      const chunks = [];
      let length = 0;
      if (reader) {
        while (true) {
          const chunk = await reader.read();
          if (chunk.done) break;
          length += chunk.value.byteLength;
          if (length > MAX_BODY) {
            await reader.cancel();
            return error(413, 'Solicitud demasiado grande.');
          }
          chunks.push(chunk.value);
        }
      }
      body = new Uint8Array(length);
      let offset = 0;
      for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
      // Solo se reescribe después de validar el origen del navegador.
      headers.set('Origin', UPSTREAM);
    }

    try {
      const upstream = await fetchUpstream(UPSTREAM + url.pathname + url.search, {
        method: request.method, headers, body, redirect: 'manual',
        signal: AbortSignal.timeout(15000)
      });
      if (upstream.status >= 300 && upstream.status < 400) return error(502, 'El servidor devolvió una redirección inesperada.');
      if (!upstream.headers.get('content-type')?.includes('application/json')) return error(502, 'El servidor no devolvió una respuesta válida.');
      const responseHeaders = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'
      });
      for (const cookie of upstream.headers.getSetCookie()) {
        if (cookie.startsWith('ecoruta_session=')) responseHeaders.append('Set-Cookie', cookie);
      }
      return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
    } catch {
      return error(502, 'No se pudo conectar con EcoRuta. Intenta nuevamente.');
    }
  };
}
