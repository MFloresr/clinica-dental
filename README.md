# Clínica Dental Alba: web de ejemplo

Web de una clínica dental hecha con Astro 7, pensada como punto de partida para un cliente real. Todo el contenido (tratamientos, equipo, opiniones, blog, datos legales) es de ejemplo y sale de archivos que equivalen a los documentos de un CMS, para pasarla a Sanity sin rehacer las páginas.

## Qué incluye (28 páginas)

- **Portada** serena, con la guía «¿Qué te pasa?» y la tira de tonos dentales como motivo visual.
- **Guía de síntomas** (`/que-me-pasa/`): el visitante elige lo que nota y recibe una orientación sobre la urgencia (hoy, esta semana o sin prisa), qué hacer mientras tanto y el tratamiento relacionado. Siempre con el aviso de que no es un diagnóstico y el 112 en emergencias.
- **Tratamientos** (8): revisión y limpieza, empastes, endodoncia, implantes, ortodoncia, blanqueamiento, periodoncia y odontopediatría. Cada uno explica qué es, cuándo se recomienda, cómo se hace, el cuidado posterior, la duración y un precio orientativo «desde».
- **Primera visita** (qué pasa, qué traer, qué hacemos si da miedo), **Urgencias** (teléfono y pautas generales), **Equipo**, **La clínica**, **Precios y financiación** (tabla y calculadora de cuota), **Cita**, **Contacto**, **Blog** (4 artículos de salud bucodental) y preguntas frecuentes con datos estructurados.
- Aviso legal con datos de centro sanitario, privacidad, cookies (plantillas), créditos de las fotos, 404, sitemap y `robots.txt`.

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview
```

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Tratamientos | `src/content/tratamientos/*.json` |
| Blog | `src/content/blog/*.md` |
| Equipo, opiniones, preguntas, síntomas | `src/content/datos/*.json` |
| Datos de la clínica y legales | `src/lib/sitio.ts` |
| Esquemas del contenido | `src/content.config.ts` |
| Acceso al contenido (aquí entra el CMS) | `src/lib/contenido.ts` |
| Diseño | `src/styles/global.css` |
| Fotos | `src/assets/fotos/` · créditos en `src/lib/creditos.json` |

## Pasar el contenido a un CMS (Sanity)

Las páginas solo llaman a `src/lib/contenido.ts`. Hay que crear los tipos `tratamiento`, `entrada`, `persona`, `opinion`, `pregunta`, `sintoma` y un documento único `ajustes`, con los mismos campos que `src/content.config.ts`, y reescribir `contenido.ts` con consultas GROQ. Un webhook de Sanity que lance un nuevo despliegue al publicar completa el circuito. Los textos médicos deberían pasar por revisión del director sanitario antes de publicarse.

## Publicidad sanitaria: cómo está planteada

Los centros sanitarios tienen normas específicas de publicidad (autorización previa en muchas comunidades autónomas). La web evita lo que suele estar prohibido o mal visto: no promete resultados ni curaciones, no dice «el mejor» ni compara con otras clínicas, no usa «sin dolor» ni testimonios con fotos de pacientes, y avisa de que los resultados varían y de que los precios son orientativos. Aun así, **el texto debe revisarlo el director sanitario y el asesor del cliente** y, si procede, tramitarse la autorización de publicidad.

## Protección de datos (health data)

Los datos de salud son de categoría especial (art. 9 del RGPD). Cómo se ha enfocado:

- **Minimizar:** los formularios no piden datos clínicos. El campo de motivo es opcional, limitado a 400 caracteres y avisa de que no hace falta contar detalles.
- **Consentimiento explícito y separado** para los datos de salud que el paciente decida escribir (casilla distinta de la de privacidad, sin marcar de inicio).
- **Sin terceros:** la web no pone cookies, no guarda nada en el navegador y no contacta con dominios externos. Tipografías y fotos están alojadas en la propia web, y el mapa se abre en otra página.
- **Textos legales** con el responsable, los datos de salud, la base jurídica, la conservación (la historia clínica tiene plazos propios, como mínimo cinco años desde el alta) y los derechos.

Pendiente antes de recoger datos reales:

- [ ] Elegir **dónde se guardan las solicitudes**: un sistema alojado en la UE, con contrato de encargado de tratamiento y acceso restringido. **No enviar los formularios por correo sin cifrar** si pueden contener datos de salud.
- [ ] Valorar con su delegado de protección de datos si hace falta una **evaluación de impacto** (art. 35 del RGPD) y anotar el tratamiento en el registro de actividades.
- [ ] Definir el procedimiento para **atender derechos** (acceso, rectificación, supresión) en un mes, y para **notificar brechas** en 72 horas.
- [ ] Revisar los plazos de conservación según la comunidad autónoma.

## Cuando se quiera activar los formularios

`PUBLIC_FORM_ENDPOINT` recibe los formularios (cita y contacto) como JSON. Sin él funcionan en modo demostración: validan y confirman, pero no envían nada.

## Antes de entregar al cliente

- [ ] Sustituir datos de la clínica, equipo (nombres y números de colegiado), precios, horarios y fotos propias (las actuales son de ejemplo).
- [ ] Rellenar los datos de centro sanitario del aviso legal (autorización, dirección sanitaria, colegio, seguro de responsabilidad civil).
- [ ] Revisar con el director sanitario los textos de tratamientos, la guía de síntomas y las pautas de urgencias.
- [ ] Revisar aviso legal y privacidad con su asesor y su delegado de protección de datos.
- [ ] Si se añade analítica, chat, mapas o vídeos: actualizar la página de cookies y añadir un aviso con aceptar y rechazar.
- [ ] Cambiar el dominio en `astro.config.mjs`, `sitio.ts` y `robots.txt`.
- [ ] Quitar la franja amarilla «Web de demostración» del pie (`Pie.astro`).

## Fotos

Proceden de Wikimedia Commons (CC0, CC BY y CC BY-SA), con autor y licencia en `/creditos/`. No se usan fotos de pacientes. Son de calidad desigual: para producción conviene cambiarlas por fotos propias de la clínica y de su equipo.

## Calidad

Probada con axe-core (WCAG 2.2 A y AA y buenas prácticas): sin violaciones en las 27 páginas, en ordenador y móvil. La web no pone cookies ni contacta con dominios externos. Prueba de extremo a extremo (guía de síntomas, cita con consentimientos, calculadora y fichas) en `webs-clientes/_herramientas/flujo-clinica.cjs`. El escáner automático de RGPD marca falsos positivos por palabras clave, y no sustituye la revisión de un delegado de protección de datos.
