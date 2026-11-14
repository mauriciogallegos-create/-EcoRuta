# EcoRuta · Contenido del tablero de evaluación

Documento de apoyo. El Discovery propio y la revisión externa todavía no están ejecutados. Las citas C-01 a C-04 pertenecen al caso docente. La implementación se basa en esas citas y debe contrastarse con la evidencia de campo antes de dar por validado el alcance.

## Parte 1 — Product Discovery

### Evidencia 1 · Outcome
Reducir en un 20 % el gasto diario mediano de traslado al campus de los participantes de un piloto, durante cuatro semanas, respecto de su registro de gastos de la semana inicial.

Mediana de soles por día de traslado por participante. Registrar días comparables de estudio o trabajo, gasto inicial y gasto del piloto. Calcular (mediana inicial - mediana piloto) / mediana inicial × 100. Sin línea base propia, el 20 % es una meta propuesta y todavía no un resultado.

### Citas del caso docente
C-01 · María: «No sé cómo coordinar con desconocidos de forma segura y sin que se me haga tarde por dar muchas vueltas.» (Caso docente, página 2).

C-02 · Jorge: «Preferiría compartir un carro pero no conozco a nadie que haga mi misma ruta.» (Caso docente, página 2).

C-03 · Ana: «Lo que más me estresa no es el costo, es no saber si voy a llegar a tiempo.» (Caso docente, página 2).

C-04 · Luis: «Me escribieron 10 personas a la vez. Fue un caos organizar quién iba al final.» (Caso docente, página 2).

### Evidencia 2 · Entrevistas por realizar
1. Cuéntame cómo fue tu último traslado al centro de estudios o trabajo.
2. ¿Cuándo llegaste tarde por última vez y qué ocurrió?
3. ¿Cuánto pagaste ese día y en qué medios de transporte?
4. Cuéntame la última vez que compartiste un carro o intentaste coordinar un traslado.
5. ¿Qué mensajes o pasos necesitaste para acordar horario, encuentro y aporte?
6. ¿Qué hiciste cuando alguien canceló o cambió lo acordado?

Registrar E-ENT-01 a E-ENT-03: seudónimo, fecha, comportamiento pasado, cita literal, observación e interpretación por separado. Estado: pendiente.

### Evidencia 3 · Mapa de oportunidades
O-01 · Encontrar compañeros con un recorrido y horario compatibles ← C-02 (Jorge). La coincidencia de ruta puede reducir el gasto sin exigir desvíos al conductor.

O-02 · Saber quién viajará y cuántos cupos siguen disponibles ← C-04 (Luis). La coordinación necesita un acuerdo explícito entre conductor y pasajero.

O-03 · Conocer la hora y el lugar acordados antes de salir ← C-03 (Ana). El estudiante necesita planificar su llegada y reconocer una cancelación.

O-04 · Contar con información básica del compañero antes de compartir el trayecto ← C-01 (María). La identidad y las condiciones del encuentro son hipótesis de confianza por validar.

Oportunidad elegida: O-02. Solución A: lista manual de confirmaciones y cupos por un coordinador. Solución B: solicitudes con aceptación explícita por el conductor. Ambas evitan mapas en vivo, cobros integrados y biometría. Se construye B como hipótesis funcional, sin afirmar validación de campo.

### Evidencia 4 · Experimento propuesto
**risk**: Valor y confianza: aun con coincidencia de horario y ruta, las personas podrían no aceptar coordinar un viaje con alguien nuevo.

**method**: Experimento concierge sin código. Reclutar voluntarios con consentimiento; recoger ruta aproximada y horario sin publicar direcciones personales. Formar al menos 3 grupos compatibles, presentar a los participantes por un canal privado y pedir una confirmación explícita de un trayecto dentro de 7 días. La coordinación y las observaciones reales se registran de forma anonimizada; no se publican viajes reales en el MVP.

**confirm**: Confirmar la hipótesis si al menos el 60 % de los grupos propuestos completa un viaje compartido y reporta llegada dentro de ±5 minutos del horario acordado.

**reject**: Descartar la hipótesis si menos del 30 % completa el viaje o aparecen rechazos de confianza que impiden continuar; si el resultado queda entre ambos umbrales, declarar inconcluso y ajustar el experimento.

**data**: Pendiente de ejecución. Registrar número de grupos, confirmaciones, viajes completados, puntualidad, gasto y motivos de abandono. Si participan menos de 3 grupos, declarar evidencia insuficiente.

**decision**: Pendiente de datos. No se afirma validación de valor, confianza ni reducción del gasto.

## Parte 2 — Product Vision Board

### Evidencia 5
**vision**
Que los estudiantes puedan llegar al campus con un traslado coordinado y un gasto compartido previsible.

**target**
Estudiantes de Tecsup con carro y cupos disponibles; estudiantes sin carro con rutas y horarios compatibles; personas que trabajan antes de clase.

**needs**
- N-01 Coincidir con personas de ruta compatible y conocer el aporte. O-01 / C-02.
- N-02 Saber quién tiene un cupo confirmado y evitar acuerdos duplicados. O-02 / C-04.
- N-03 Conocer hora, encuentro y vigencia del acuerdo antes de salir. O-03 / C-03.
- N-04 Distinguir quién conduce y quién solicita. O-04 / C-01. Es una identificación de prueba; no acredita identidad real.

**product**
- Publicación de trayectos con aporte, hora y punto acordados.
- Búsqueda simple por origen y fecha.
- Solicitud y aceptación explícitas sin superar los cupos.
- Estado de la coordinación e historial de viajes.

**goals**
- Lograr que el 60 % de los grupos compatibles complete al menos un viaje en la primera semana del piloto.
- Reducir en 20 % el gasto mediano diario de traslado en cuatro semanas, frente a la línea base.
- Mantener 0 confirmaciones por encima de la capacidad en las pruebas de aceptación.

### Evidencia 6 · Necesidad → oportunidad → cita
N-01 Coincidir con personas de ruta compatible y conocer el aporte. O-01 / C-02.

N-02 Saber quién tiene un cupo confirmado y evitar acuerdos duplicados. O-02 / C-04.

N-03 Conocer hora, encuentro y vigencia del acuerdo antes de salir. O-03 / C-03.

N-04 Distinguir quién conduce y quién solicita. O-04 / C-01. Es una identificación de prueba; no acredita identidad real.

## Parte 3 — Product Backlog

### Evidencia 7 · Épicas priorizadas
1. E-01 · Como participante, quiero acceder con un perfil identificable. Dependencia técnica y riesgo: separar las acciones de conductor y pasajero. C-01 / N-04.

2. E-02 · Como conductor, quiero ofrecer un trayecto con condiciones claras. Dependencia: se necesita oferta antes de solicitar. Valor: publicar horario, punto y aporte. C-01, C-03 / N-01, N-03.

3. E-03 · Como pasajero, quiero encontrar viajes compatibles. Valor: conecta la demanda con la oferta y expone el aporte antes de decidir. C-02 / N-01.

4. E-04 · Como conductor y pasajero, quiero acordar y controlar los cupos. Mayor riesgo funcional: evitar duplicados y sobreventa. C-04 / N-02.

5. E-05 · Como participante, quiero consultar y actualizar el estado del viaje. Valor y cierre del flujo: saber si la coordinación sigue vigente. C-03, C-04 / N-02, N-03.

6. E-06 · Como participante, quiero evaluar la experiencia y reportar incidentes. Riesgo y aprendizaje posteriores: requiere viajes completados y política de atención. C-01 / N-04.

### Evidencia 8 · Historias INVEST
Referencia: H-01 = 3 puntos. Los puntos miden esfuerzo relativo; no son horas.

#### H-01 · Acceso por perfil · 3 puntos · MVP
Como participante, quiero ingresar con mi perfil de conductor o pasajero para realizar las acciones que me corresponden.

H-01-CA1: Dado un usuario de prueba válido, cuando ingreso con sus credenciales, entonces veo su perfil y puedo recuperar la sesión al recargar.

H-01-CA2: Dadas credenciales erróneas o una petición sin sesión, cuando intento acceder, entonces recibo un rechazo y no obtengo acceso a los viajes.

Estimación: Referencia de 3 puntos: sesión, dos roles y salida.

INVEST: I: El acceso no exige publicar ni reservar. | N: Las cuentas y la duración de la sesión pueden ajustarse. | V: Permite distinguir responsabilidades. | E: Login, sesión y salida tienen límites claros. | S: Un flujo de credenciales con tres cuentas. | T: CA1 y CA2 se verifican con respuestas y sesión.

Trazabilidad: C-01 → N-04 → E-01.

#### H-02 · Publicar un viaje · 5 puntos · MVP
Como conductor, quiero publicar origen, destino, salida, encuentro, cupos y aporte para ofrecer mi trayecto con condiciones claras.

H-02-CA1: Dado un conductor autenticado y datos válidos, cuando publica un viaje futuro, entonces queda guardado con origen, destino, encuentro, aporte y cupos.

H-02-CA2: Dada una salida pasada o una cantidad de cupos fuera de 1 a 6, cuando se publica, entonces el sistema rechaza el registro.

Estimación: Mayor que H-01: seis campos, reglas temporales y persistencia.

INVEST: I: Entrega oferta sin necesitar solicitudes. | N: Los límites de aporte pueden negociarse. | V: Evita coordinar condiciones por mensajes dispersos. | E: Los campos y validaciones acotan el esfuerzo. | S: Una sola publicación de trayecto. | T: Persistencia y validaciones son observables.

Trazabilidad: C-03 → N-03 → E-02.

#### H-03 · Buscar viajes · 3 puntos · MVP
Como pasajero, quiero buscar por origen y fecha para encontrar un trayecto compatible con mi traslado.

H-03-CA1: Dado un viaje futuro publicado, cuando busco por su origen y fecha, entonces veo salida, encuentro, aporte y cupos libres del viaje coincidente.

H-03-CA2: Dada una combinación sin coincidencias, cuando busco, entonces recibo una lista vacía y un mensaje para cambiar los filtros.

Estimación: Como H-01: filtros acotados y una lista con estados vacíos.

INVEST: I: Puede comprobarse con oferta de prueba. | N: Los filtros pueden ampliarse después. | V: Hace visible una ruta compartible. | E: Dos filtros, orden y resultados definidos. | S: No incluye mapa ni algoritmos de rutas. | T: Se contrastan lista coincidente y lista vacía.

Trazabilidad: C-02 → N-01 → E-03.

#### H-04 · Solicitar un cupo · 3 puntos · MVP
Como pasajero, quiero enviar una solicitud para que el conductor sepa que deseo acompañarlo.

H-04-CA1: Dado un viaje futuro con cupos, cuando envío una solicitud, entonces queda pendiente y aún no consume un cupo confirmado.

H-04-CA2: Dada una solicitud pendiente o aceptada del mismo pasajero, cuando intenta solicitar otra vez ese viaje, entonces se rechaza el duplicado.

Estimación: Como H-01: alta persistente con reglas de unicidad y disponibilidad.

INVEST: I: La solicitud se comprueba antes de aceptarla. | N: La redacción de la confirmación es ajustable. | V: Ordena la intención de viajar. | E: Una solicitud por pasajero y viaje. | S: Una transición inicial de estado. | T: Se observa el estado y se intenta duplicar.

Trazabilidad: C-04 → N-02 → E-04.

#### H-05 · Resolver solicitudes · 5 puntos · MVP
Como conductor, quiero aceptar o rechazar solicitudes para decidir quién viajará sin exceder mis cupos.

H-05-CA1: Dado un conductor propietario y una solicitud pendiente, cuando la acepta o rechaza, entonces cambia su estado; un pasajero no puede ejecutar esta decisión.

H-05-CA2: Dado un viaje con un solo cupo y dos solicitudes, cuando se intentan aceptar ambas, entonces solo una se confirma y los cupos libres nunca son negativos.

Estimación: Mayor que H-01: autorización y aceptación atómica frente a competencia por cupos.

INVEST: I: Se prueba con solicitudes precargadas. | N: La decisión puede ampliarse con un mensaje posterior. | V: Previene comprometer un asiento dos veces. | E: Dos decisiones y reglas de capacidad definidas. | S: No agrega lista de espera ni chat. | T: Dos aceptaciones competidoras comprueban el límite.

Trazabilidad: C-04 → N-02 → E-04.

#### H-06 · Consultar confirmación · 3 puntos · MVP
Como participante, quiero consultar mis viajes y solicitudes para saber si mi acuerdo está confirmado.

H-06-CA1: Dado un pasajero con solicitud aceptada, cuando abre Mis solicitudes, entonces ve la confirmación y el punto de encuentro.

H-06-CA2: Dado un cambio guardado, cuando cierro y reabro la aplicación o su base, entonces se conserva el estado y cada pasajero solo consulta sus propias solicitudes.

Estimación: Como H-01: consultas por propietario y continuidad de sesión.

INVEST: I: Consulta registros sin alterarlos. | N: Se puede mejorar la presentación de estados. | V: Reduce incertidumbre antes de salir. | E: Lecturas por perfil y campos definidos. | S: No exige notificaciones en tiempo real. | T: La consulta aislada y la reapertura son comprobables.

Trazabilidad: C-03 → N-03 → E-05.

#### H-07 · Cancelar coordinación · 5 puntos · MVP
Como participante, quiero cancelar una solicitud o un viaje futuro para evitar que los demás cuenten con un acuerdo que ya no cumpliré.

H-07-CA1: Dada una solicitud aceptada en un viaje futuro abierto, cuando el pasajero la cancela, entonces queda cancelada y vuelve a quedar libre su cupo.

H-07-CA2: Dado un viaje futuro abierto, cuando el conductor lo cancela, entonces desaparece de la búsqueda y sus solicitudes se muestran canceladas.

Estimación: Mayor que H-01: dos actores, cupos derivados y cancelación visible a terceros.

INVEST: I: Se prueba sobre coordinaciones de ejemplo. | N: El plazo de cancelación puede revisarse. | V: Evita acuerdos desactualizados. | E: Dos cancelaciones y límite antes de salida. | S: No incluye penalizaciones ni reembolsos. | T: Estados, búsqueda y cupos prueban sus efectos.

Trazabilidad: C-04 → N-02 → E-05.

#### H-08 · Finalizar viaje · 2 puntos · MVP
Como conductor, quiero finalizar un recorrido después de su salida para conservar su estado en el historial.

H-08-CA1: Dado un viaje cuya salida aún no ocurrió, cuando intento finalizarlo, entonces se rechaza el cierre anticipado.

H-08-CA2: Dado mi viaje abierto cuya salida ya ocurrió, cuando lo finalizo, entonces se conserva como finalizado en Mis viajes y no admite nuevas solicitudes.

Estimación: Menor que H-01: una transición de estado con restricción temporal.

INVEST: I: Se prueba con un viaje y reloj de referencia. | N: Puede añadirse hora de llegada en otra historia. | V: Distingue oferta activa de recorrido cerrado. | E: Una transición y una consulta de historial. | S: No registra GPS ni telemetría. | T: Se prueban reloj previo, cierre y bloqueo de solicitudes.

Trazabilidad: C-03 → N-03 → E-05.

#### H-09 · Editar un viaje sin solicitudes · 3 puntos · Posterior
Como conductor, quiero corregir un viaje sin solicitudes para actualizar condiciones antes de coordinar con alguien.

H-09-CA1: Dado mi viaje futuro sin solicitudes activas, cuando corrijo su encuentro y hora con valores válidos, entonces quedan guardados.

H-09-CA2: Dado un viaje con una solicitud pendiente o aceptada, cuando intento editar sus condiciones, entonces el cambio se rechaza.

Estimación: Como H-01: edición acotada con bloqueo por estado.

INVEST: I: Entrega edición independiente de cancelación. | N: Se negocian los campos editables. | V: Evita publicar otra oferta por una corrección. | E: Se limita a viajes sin acuerdos activos. | S: Una edición con regla de bloqueo. | T: Ambos casos se comprobarán al implementarla.

Trazabilidad: C-03 → N-03 → E-02.

#### H-10 · Filtrar aporte máximo · 2 puntos · Posterior
Como pasajero, quiero limitar el aporte mostrado para encontrar opciones que entren en mi presupuesto.

H-10-CA1: Dados viajes de diferentes aportes, cuando fijo un máximo de S/ 5, entonces solo aparecen viajes con aporte menor o igual a S/ 5.

H-10-CA2: Dado un máximo negativo o no numérico, cuando envío el filtro, entonces se muestra un error sin ejecutar una búsqueda válida.

Estimación: Menor que H-01: un filtro adicional sobre la búsqueda.

INVEST: I: Es un incremento sobre la búsqueda existente. | N: Se negocia el rango del filtro. | V: Apoya decisiones con presupuesto limitado. | E: Un filtro numérico y un error de validación. | S: No compara tarifas externas. | T: La frontera y el valor inválido son medibles.

Trazabilidad: C-02 → N-01 → E-03.

#### H-11 · Evaluar el recorrido · 5 puntos · Posterior
Como pasajero confirmado, quiero calificar un viaje finalizado para registrar mi experiencia.

H-11-CA1: Dado un viaje finalizado con mi solicitud aceptada, cuando asigno una puntuación de 1 a 5, entonces se guarda una única valoración mía.

H-11-CA2: Dado un viaje no finalizado o sin mi participación confirmada, cuando intento calificarlo, entonces se rechaza.

Estimación: Mayor que H-01: autorización, unicidad y agregación de valoraciones.

INVEST: I: El registro de valoración tiene un resultado propio. | N: La escala y visibilidad pueden negociarse. | V: Puede aportar señales de experiencia previa. | E: Participación, estado y escala definidos. | S: Una valoración sin comentarios públicos. | T: Se comprueban permisos y puntuaciones válidas.

Trazabilidad: C-01 → N-04 → E-06.

#### H-12 · Reportar un incidente · 5 puntos · Posterior
Como participante, quiero registrar un incidente de un viaje en el que participé para que EcoRuta pueda revisarlo.

H-12-CA1: Dado un viaje en el que soy conductor o pasajero confirmado, cuando selecciono una categoría y descripción válida, entonces recibo un identificador del reporte.

H-12-CA2: Dado un usuario ajeno al viaje, cuando intenta registrar o consultar el reporte, entonces el acceso se rechaza.

Estimación: Mayor que H-01: categorías, privacidad y recepción del reporte.

INVEST: I: Genera un reporte sin depender de una valoración. | N: Se negocian categorías y plazos de atención. | V: Apoya la revisión de situaciones de confianza. | E: Un reporte privado con pertenencia al viaje. | S: No intenta resolver incidentes automáticamente. | T: Se prueba el identificador y el control de acceso.

Trazabilidad: C-01 → N-04 → E-06.

### Evidencia 9 · Decisiones de alcance
Mapa en tiempo real · Fuera del MVP · C-03 demanda previsibilidad, pero no demuestra que el GPS sea necesario. Primero se prueba horario y encuentro explícitos. Considerarlo solo si persiste la incertidumbre y hay evidencia adicional.

Pagos integrados · Fuera del MVP · C-02 evidencia presión de gasto; no evidencia dificultad para cobrar. Mostrar el aporte y acordar el pago fuera del producto permite observar el valor antes de integrar cobros.

Reconocimiento facial · Fuera del MVP · C-01 evidencia desconfianza, pero no valida biometría como respuesta. Requiere un análisis adicional de consentimiento, costo y manejo de datos. Las cuentas de prueba solo distinguen roles.

### Evidencia 10 · Corte del MVP
Línea de corte después de H-08: 8 historias, 29 puntos. Flujo completo: conductor ingresa y publica; pasajero busca y solicita; conductor confirma; pasajero consulta; ambos pueden cancelar antes de salir; el conductor finaliza el recorrido después de la salida. El alcance permite probar la coordinación y disponibilidad. Medir reducción real del gasto exige ejecutar el piloto externo; la app por sí sola no demuestra el outcome.

### Evidencia 11 · Definition of Done
1. Los dos criterios de la historia están comprobados y se conserva la evidencia.
2. Las reglas y permisos se verifican del lado servidor, con datos ficticios.
3. Las pruebas de aceptación pertinentes pasan sin romper las anteriores.
4. La rama de la historia tiene commits que citan su identificador y se revisa antes de integrar.
5. La historia está desplegada y verificada en línea desde una sesión limpia.
6. La matriz relaciona cita, oportunidad, necesidad, épica, historia, criterio, commit y evidencia de la versión desplegada.

## Parte 4 — Construcción y despliegue

### Evidencia 12 · Sprint Backlog propuesto
**Sprint propuesto 1**
Goal: Permitir acceso, publicación, búsqueda y solicitud de un viaje.
11 horas estimadas de esfuerzo; la disponibilidad real del estudiante está por confirmar.
- H-01: Sesión, perfiles y errores de acceso — 2 h.
- H-02: Formulario, validaciones y persistencia — 3 h.
- H-03: Búsqueda, zona horaria y estado vacío — 2 h.
- H-04: Solicitud única y validaciones de disponibilidad — 2 h.
- Transversal: Pruebas y revisión del incremento desplegado — 2 h.

**Sprint propuesto 2**
Goal: Confirmar cupos, mantener estados y cerrar la coordinación.
11 horas estimadas de esfuerzo; reservar tiempo adicional para entrevistas y experimento. No equivale a horas ya trabajadas.
- H-05: Aceptación atómica y permisos — 3 h.
- H-06: Consultas por perfil y recuperación de estado — 2 h.
- H-07: Cancelación y cálculo de disponibilidad — 2 h.
- H-08: Cierre temporal e historial — 1 h.
- Transversal: Pruebas, matriz, despliegue y revisión externa — 3 h.

### Evidencia 13 · Repositorio
https://github.com/mauriciogallegos-create/-EcoRuta
Ramas feature/H-01 a feature/H-08, commits por historia y código fuente legible. El tag final solo corresponde tras la verificación del despliegue.

### Evidencia 14 · Seguimiento
Solo existe registro de esta sesión de construcción. No hay cinco días de trabajo verificables. El tablero y el burndown deben completarse con registros reales del estudiante; no se reconstruye un historial ficticio.
Impedimento: Observado: el acceso a GitHub desde la terminal restringida falló; se confirmó el repositorio mediante la conexión autenticada y se recuperó el acceso de Git desde el entorno de construcción. El acceso de Miro sigue pendiente de verificación.

### Evidencia 15 · MVP
URL pública: https://ecoruta-mauricio-tecsup.wirygoldfish.chatgpt.site
16 criterios comprobados por HTTP en línea. Revisión visual en incógnito pendiente.
Acceso de prueba: conductor@ecoruta.test, pasajero@ecoruta.test y pasajero2@ecoruta.test. Contraseña común de demostración: EcoRuta2026!

### Evidencia 16 · Registro de cambios
Se mantiene el corte de 8 historias. Se precisó que una solicitud pendiente no consume cupo; solo una aceptación confirmada lo hace. Se acotó el cierre de viajes al momento posterior a su salida para evitar finalizaciones anticipadas.

## Parte 5 — Cierre

### Evidencia 17 · Matriz del hilo conductor
Ver MATRIZ_TRAZABILIDAD.csv: una fila por cada uno de los 16 criterios del MVP. Los 16 criterios se comprobaron por HTTP contra la versión desplegada. Revisión visual en incógnito pendiente.

### Evidencia 18 · Sprint Review
Pendiente de una Sprint Review con 2 personas externas sobre el MVP desplegado. Recoger al menos 2 observaciones, decidir su efecto en el backlog y comparar lo aprendido con el outcome. La aprobación técnica automatizada no reemplaza a estas personas.

### Evidencia 19 · Retrospectiva técnica
Bien: Se definió un flujo completo y las comprobaciones automatizadas detectan duplicados, permisos incorrectos y exceso de cupos.
Por mejorar: No se disponía de evidencia propia de Discovery antes de construir y falló el acceso inicial a algunas herramientas.
1. Ejecutar las entrevistas y el experimento antes de ampliar el alcance; registrar cita, fecha, resultado y decisión el mismo día.
2. Reservar un bloque de despliegue y prueba con usuarios al inicio de cada sprint; registrar el defecto y su verificación en línea antes de cerrar una historia.

### Evidencia 20 · Lanzamiento
MVP publicado en https://ecoruta-mauricio-tecsup.wirygoldfish.chatgpt.site. Se verificaron por HTTP los 16 criterios de aceptación contra la versión desplegada del commit b9dd1b8. Persistencia de base tras reapertura comprobada localmente; continuidad de estados comprobada en línea tras salir y volver a ingresar. Falta revisión visual en incógnito y comunicación a revisores externos. No se declara realizado un piloto con personas.

### Evidencia real pendiente
- Evidencia 2: tres entrevistas propias con seudónimos, fechas y citas literales.
- Evidencia 4: experimento ejecutado con umbrales previos, datos y decisión.
- Evidencia 12: capacidad real confirmada por el estudiante.
- Evidencia 14: cinco días reales, burndown ideal y real, y seguimiento de impedimentos.
- Evidencia 18: revisión real con dos personas externas.
- Miro: tablero exclusivo y acceso de visualización por enlace.
- Evidencias 15, 17 y 20: completar verificación pública y lanzamiento.

