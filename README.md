# EcoRuta

MVP académico para coordinar viajes compartidos hacia Tecsup. Permite publicar un viaje, buscarlo, solicitar un cupo, confirmar pasajeros y consultar el estado del acuerdo. Solo contiene perfiles y viajes ficticios.

## Probar el producto

URL pública: **https://ecoruta-mauricio-tecsup.wirygoldfish.chatgpt.site**

Los 16 criterios del MVP se verificaron por HTTP contra la versión desplegada; ver [registro real](docs/VERIFICACION_EN_LINEA.json). También se comprobó el acceso como pasajero en incógnito y la visualización del tablero de Miro mediante enlace. Estas comprobaciones corresponden al despliegue original, no al futuro dominio de Netlify.

| Perfil | Correo | Contraseña de demostración |
| --- | --- | --- |
| Conductor | conductor@ecoruta.test | EcoRuta2026! |
| Pasajero | pasajero@ecoruta.test | EcoRuta2026! |
| Segundo pasajero | pasajero2@ecoruta.test | EcoRuta2026! |

Estas credenciales se publican intencionalmente para la evaluación. No corresponden a cuentas personales. No uses datos reales ni esta configuración como servicio de transporte real.

1. Ingresa como conductor y publica un viaje futuro con cupos y un punto ficticio.
2. Sal de la sesión e ingresa como pasajero. Busca el origen y solicita un cupo.
3. Ingresa como conductor, abre Solicitudes recibidas y acepta la solicitud.
4. Regresa como pasajero y verifica que tu solicitud aparece confirmada.
5. Cancela la solicitud para liberar el cupo, o cancela el viaje desde el perfil del conductor.
6. Después de la hora de salida, el conductor puede finalizar el viaje desde Mis viajes. El historial se conserva.

Solicitar un cupo no lo reserva. Solo las solicitudes aceptadas cuentan contra la capacidad; la actualización condicional evita confirmar más pasajeros que cupos. Un viaje cancelado invalida sus solicitudes. Los filtros de fecha y la presentación usan Lima (UTC−5).

## Ejecutar localmente

Requisito: Node.js 24 o posterior. No se necesitan paquetes de terceros ni `npm install`.

```powershell
git clone https://github.com/mauriciogallegos-create/-EcoRuta.git
cd ./-EcoRuta
npm run build
npm test
npm run dev
```

Abre `http://localhost:8787`. Los datos locales se guardan en `.local/ecoruta.sqlite`, excluido del repositorio. Para cambiar el puerto usa la variable `PORT`. El servidor local solo escucha en loopback.

## Arquitectura y despliegue

- `src/page.html`: interfaz adaptable a móviles, formularios y estados.
- `src/worker.js`: rutas HTTP y controles comunes.
- `src/auth.js`: perfiles ficticios, sesiones con cookie HttpOnly y vencimiento, y bloqueo tras intentos fallidos.
- `src/publish.js`, `search.js`, `ask.js`, `decision.js`, `tracking.js`, `cancellation.js`, `completion.js`: reglas del producto.
- `drizzle/0000_ecoruta.sql`: esquema SQLite compatible con Cloudflare D1.
- `scripts/build.mjs`: produce un Worker ESM autocontenido en `dist/server/index.js`.
- `.openai/hosting.json`: identifica el despliegue y el binding D1 `DB`. Los datos de producción se guardan en D1, no en el disco del Worker ni en el navegador.

El despliegue aplica la migración de esquema, enlaza `DB` y publica el Worker por HTTPS. Las cuentas y un viaje de muestra se insertan de forma idempotente en el primer acceso. No se almacenan claves de servicios en el repositorio. Las sesiones se guardan como hashes de tokens aleatorios; no se registra su valor en logs.

### Publicación en Netlify

La configuración está preparada en `netlify.toml`: interfaz estática y función API que conserva el servidor y la base D1 actuales. El nuevo dominio todavía debe publicarse y verificarse. Ver [configuración y comprobaciones](docs/DESPLIEGUE_NETLIFY.md).

## Historias y pruebas

MVP: H-01 a H-08, 29 puntos. Backlog posterior: H-09 a H-12. Las ramas `feature/H-01-acceso` a `feature/H-08-finalizacion` conservan los cambios por historia. La interfaz y las rutas integran el flujo completo en un commit compartido. La integración de código precede la comprobación pública; la Definition of Done no se declara cumplida hasta verificar la versión desplegada.

`npm test` ejecuta 18 comprobaciones funcionales del MVP y 5 pruebas de la conexión para Netlify. Las comprobaciones del MVP cubren los siguientes casos: credenciales incorrectas, permisos por rol, campos inválidos, solicitudes duplicadas, competencia por un solo cupo, cancelaciones, separación de datos entre pasajeros y persistencia después de reabrir la base. Estas pruebas locales usan SQLite; la matriz distingue su resultado de la verificación en línea con D1.

## Evidencias de evaluación

- [Tablero de Miro](https://miro.com/app/board/uXjVEOZ1Iyc=/).
- [Discovery, visión, backlog y cierre para Miro](docs/CONTENIDO_MIRO.md).
- [12 historias, criterios e INVEST en formato estructurado](docs/ecoruta.json).
- [Matriz de 16 criterios de aceptación](docs/MATRIZ_TRAZABILIDAD.csv).
- [Guías de entrevistas, experimento y revisión externa](docs/ENTREVISTAS_Y_REVIEW.md).
- [Registro de cinco días por completar con datos reales](docs/SEGUIMIENTO.csv).

Las citas C-01 a C-04 provienen del caso docente y no se presentan como entrevistas propias. Están pendientes las tres entrevistas, el experimento ejecutado, la capacidad real, los cinco días de seguimiento, el burndown real y la Sprint Review con dos personas externas. No se afirma validación del outcome ni una nota completa. La entrega oficial exige texto con los enlaces de Miro, GitHub y MVP, más credenciales.

## Alcance

Mapa en tiempo real, cobros integrados y reconocimiento facial quedan fuera del MVP. Las citas del caso respaldan coordinar hora, encuentro, aporte y confirmación; la necesidad de aquellas funciones aún requiere evidencia adicional. Las cuentas de prueba distinguen roles, pero no verifican identidad real. No hay pagos, GPS, notificaciones, valoraciones ni reportes de incidentes implementados.
