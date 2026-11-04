// Datos de la clínica. En producción vendrían del CMS (un documento "Ajustes del sitio").
// Todo lo marcado como ejemplo o entre corchetes lo sustituye el cliente con sus datos reales.

export type Horario = { etiqueta: string; tramos: { abre: string; cierra: string }[] };

export const sitio = {
  nombre: 'Clínica Dental Alba',
  eslogan: 'Odontología general y especializada',
  descripcion:
    'Clínica dental con revisiones, empastes, endodoncias, implantes, ortodoncia, blanqueamiento y odontopediatría. Primera visita de valoración y presupuesto por escrito antes de empezar.',
  url: 'https://www.clinicadentalalba.example',
  // Datos de ejemplo
  telefono: '+34934000000',
  telefonoVisible: '934 00 00 00',
  telefonoUrgencias: '+34600000001',
  telefonoUrgenciasVisible: '600 00 00 01',
  whatsapp: '34600000000',
  email: 'hola@clinicadentalalba.example',
  direccion: { calle: 'Carrer de Mostra, 22, entresuelo', cp: '08010', ciudad: 'Barcelona', provincia: 'Barcelona' },
  mapa: 'https://www.openstreetmap.org/search?query=Barcelona',
  endpointFormularios: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '',
  financiacion: { tin: 8.5, plazoMin: 6, plazoMax: 60 },
  horarios: [
    { etiqueta: 'Lunes a jueves', tramos: [{ abre: '09:00', cierra: '13:30' }, { abre: '15:30', cierra: '20:00' }] },
    { etiqueta: 'Viernes', tramos: [{ abre: '09:00', cierra: '14:00' }] },
    { etiqueta: 'Sábados y domingos', tramos: [] },
  ] as Horario[],
  semana: {
    0: [],
    1: [['09:00', '13:30'], ['15:30', '20:00']],
    2: [['09:00', '13:30'], ['15:30', '20:00']],
    3: [['09:00', '13:30'], ['15:30', '20:00']],
    4: [['09:00', '13:30'], ['15:30', '20:00']],
    5: [['09:00', '14:00']],
    6: [],
  } as Record<number, string[][]>,
  // Datos legales de un centro sanitario: los completa el cliente
  centro: {
    razonSocial: '[Razón social del cliente]',
    nif: '[NIF]',
    domicilio: 'Carrer de Mostra, 22, entresuelo, 08010 Barcelona',
    autorizacion: '[Nº de autorización sanitaria del centro]',
    director: '[Nombre del director o directora sanitaria y nº de colegiado]',
    colegio: '[Colegio profesional de dentistas]',
    seguroRC: '[Aseguradora y nº de póliza de responsabilidad civil]',
    dpd: '[Delegado de protección de datos, si procede]',
  },
};

export const menu = [
  { href: '/tratamientos/', texto: 'Tratamientos' },
  { href: '/primera-visita/', texto: 'Primera visita' },
  { href: '/que-me-pasa/', texto: '¿Qué me pasa?' },
  { href: '/equipo/', texto: 'Equipo' },
  { href: '/precios/', texto: 'Precios' },
  { href: '/urgencias/', texto: 'Urgencias' },
  { href: '/blog/', texto: 'Blog' },
];
