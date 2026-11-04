// Capa de acceso al contenido. Las páginas solo llaman a estas funciones.
// Hoy leen los archivos de src/content; para pasar al CMS (Sanity) basta con reescribir este archivo
// y devolver la misma forma de datos con consultas GROQ, sin tocar las páginas ni los componentes.
import { getCollection, getEntry } from 'astro:content';

export async function getTratamientos() {
  return (await getCollection('tratamientos')).sort((a, b) => a.data.orden - b.data.orden);
}
export const getTratamiento = (id: string) => getEntry('tratamientos', id);

export async function getEntradas() {
  return (await getCollection('blog')).sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}
export const getEquipo = () => getCollection('equipo');
export const getOpiniones = () => getCollection('opiniones');
export const getSintomas = async () => (await getCollection('sintomas')).sort((a, b) => a.data.orden - b.data.orden);
export const getPreguntas = async (tema?: string) => {
  const todas = await getCollection('preguntas');
  return tema ? todas.filter((p) => p.data.tema === tema) : todas;
};
