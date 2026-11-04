import type { CollectionEntry } from 'astro:content';

export type Tratamiento = CollectionEntry<'tratamientos'>;

export const NBSP = ' ';
const nf = new Intl.NumberFormat('es-ES', { useGrouping: 'always' });
export const euros = (n: number) => `${nf.format(Math.round(n))}${NBSP}€`;

export const ETIQUETA_AREA: Record<string, string> = {
  general: 'Odontología general',
  estetica: 'Estética dental',
  ortodoncia: 'Ortodoncia',
  cirugia: 'Cirugía e implantes',
  infantil: 'Odontopediatría',
};

export const URGENCIA: Record<string, { etiqueta: string; accion: string; plazo: string }> = {
  urgente: { etiqueta: 'Conviene atenderlo hoy', accion: 'Llama ahora', plazo: 'Hoy mismo' },
  pronto: { etiqueta: 'Conviene verlo esta semana', accion: 'Pide cita', plazo: 'En los próximos días' },
  rutina: { etiqueta: 'No es urgente', accion: 'Pide cita cuando te venga bien', plazo: 'Sin prisa' },
};

/** Cuota mensual con sistema francés. tin en %, meses de plazo. */
export function cuota(importe: number, meses: number, tin: number): number {
  if (importe <= 0) return 0;
  const i = tin / 100 / 12;
  return i === 0 ? importe / meses : (importe * i) / (1 - Math.pow(1 + i, -meses));
}
