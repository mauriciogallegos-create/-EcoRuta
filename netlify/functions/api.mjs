import { createProxy } from '../../src/netlify-proxy.mjs';

export default createProxy();
export const config = { path: '/api/*' };
