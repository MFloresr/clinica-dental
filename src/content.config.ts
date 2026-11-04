// Esquemas del contenido. Cada colección equivale a un tipo de documento del futuro CMS (Sanity):
// tratamientos, entradas del blog y datos sueltos (equipo, opiniones, preguntas, síntomas).
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

export const AREAS = ['general', 'estetica', 'ortodoncia', 'cirugia', 'infantil'] as const;
export const URGENCIAS = ['urgente', 'pronto', 'rutina'] as const;

const tratamientos = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/tratamientos' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      area: z.enum(AREAS),
      resumen: z.string(),
      queEs: z.array(z.string()), // párrafos
      cuando: z.array(z.string()), // en qué casos se recomienda
      pasos: z.array(z.object({ titulo: z.string(), texto: z.string() })),
      duracion: z.string(),
      cuidados: z.array(z.string()),
      desde: z.number().nullable(), // precio orientativo en euros; null = tras valoración
      unidadPrecio: z.string().default(''),
      foto: image(),
      fotoAlt: z.string(),
      orden: z.number(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumen: z.string(),
      fecha: z.coerce.date(),
      categoria: z.string(),
      foto: image(),
      fotoAlt: z.string(),
      minutos: z.number(),
    }),
});

const equipo = defineCollection({
  loader: file('src/content/datos/equipo.json'),
  schema: z.object({ nombre: z.string(), cargo: z.string(), especialidad: z.string(), texto: z.string() }),
});

const opiniones = defineCollection({
  loader: file('src/content/datos/opiniones.json'),
  schema: z.object({ nombre: z.string(), contexto: z.string(), texto: z.string() }),
});

const preguntas = defineCollection({
  loader: file('src/content/datos/preguntas.json'),
  schema: z.object({ tema: z.enum(['primera-visita', 'tratamientos', 'precios', 'miedo', 'ninos', 'urgencias']), pregunta: z.string(), respuesta: z.string() }),
});

const sintomas = defineCollection({
  loader: file('src/content/datos/sintomas.json'),
  schema: z.object({
    sintoma: z.string(),
    urgencia: z.enum(URGENCIAS),
    mensaje: z.string(),
    mientras: z.array(z.string()),
    tratamiento: z.string().nullable(), // id de un tratamiento
    orden: z.number(),
  }),
});

export const collections = { tratamientos, blog, equipo, opiniones, preguntas, sintomas };
