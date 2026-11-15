import { mkdirSync, copyFileSync } from 'node:fs';

mkdirSync('dist/netlify', { recursive: true });
copyFileSync('src/page.html', 'dist/netlify/index.html');
console.log('Interfaz EcoRuta preparada; Netlify empaqueta netlify/functions por separado.');
