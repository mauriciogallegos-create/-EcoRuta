# Publicar EcoRuta en Netlify

Estado: configuración preparada; publicación y validación del dominio Netlify pendientes.

## Arquitectura

Netlify publica la interfaz y la función `/api/*`. Esta función llama al Worker ya desplegado, que conserva las reglas del MVP y la base D1. El navegador permanece en el dominio de Netlify; no hay iframe ni redirección al dominio anterior.

El Worker debe mantenerse en línea en `https://ecoruta-mauricio-tecsup.wirygoldfish.chatgpt.site`. Este cambio no migra la base de datos. Las credenciales demo del README continúan vigentes. La sesión usa una cookie propia del nuevo dominio; la sesión anterior no se traslada automáticamente.

La función valida el origen antes de reenviar escrituras, limita el tamaño de la solicitud y únicamente reenvía la cookie de EcoRuta. Las respuestas de API no se almacenan en caché. No requiere claves nuevas ni tokens en el repositorio. El control de intentos fallidos sigue en el servidor original; las peticiones ahora provienen de Netlify y pueden compartir dirección IP de salida.

## Configuración

En el proyecto Netlify existente, vincular este repositorio y la rama `main`:

| Campo | Valor |
| --- | --- |
| Comando de compilación | `npm run build:netlify` |
| Directorio público | `dist/netlify` |
| Directorio de funciones | `netlify/functions` |
| Node.js | `24` |

`netlify.toml` contiene estos valores. También puede desplegarse con la CLI oficial de Netlify autenticada, desde la raíz del repositorio, vinculando primero el proyecto existente y ejecutando `netlify deploy --build --prod`.

Subir únicamente `index.html` o la carpeta `dist/netlify` a un despliegue estático de Drop no basta: también debe publicarse la función API. Verificar que la publicación incluya la función `api` antes de entregar.

## Comprobación

```sh
npm run build
npm test
npm run build:netlify
node scripts/verify-live.mjs https://DOMINIO-REAL.netlify.app docs/VERIFICACION_NETLIFY.json
```

Sustituir el dominio solo después de conocer la URL publicada. La última comprobación crea viajes ficticios, cancela uno y finaliza otro. Conserva el informe de verificación anterior en un archivo distinto. Abrir además la URL en incógnito y comprobar el acceso, la búsqueda y el flujo entre conductor y pasajero.

Después de comprobar la publicación: actualizar la URL en README, Miro y el texto de entrega. Mantener las evidencias anteriores con sus fechas originales; no presentarlas como verificaciones del nuevo dominio.
