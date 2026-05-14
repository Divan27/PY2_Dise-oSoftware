export const NEWS = [
  {
    id: 1,
    date: "13 Feb 2026",
    category: "Escrutinio",
    tag: "Oficial",
    emoji: "🗳️",
    color: "azul",
    title: "Inicio del escrutinio definitivo de la papeleta diputadil",
    excerpt:
      "El próximo lunes comenzará el proceso de escrutinio definitivo de la papeleta diputadil a nivel nacional, supervisado por los magistrados del TSE.",
  },
  {
    id: 2,
    date: "16 Feb 2026",
    category: "Servicios",
    tag: "Servicio",
    emoji: "🚐",
    color: "verde",
    title: "TSE ofrecerá servicios a domicilio en comunidades de Bagaces",
    excerpt:
      "El Tribunal llevará sus servicios de registración civil directamente a comunidades del cantón de Bagaces con unidades móviles especializadas.",
  },
  {
    id: 3,
    date: "01 Nov 2025",
    category: "Seguridad",
    tag: "Alerta",
    emoji: "🔒",
    color: "rojo",
    title: "¡Que no lo engañen! Identifique el sitio oficial del TSE",
    excerpt:
      "El TSE alerta a la ciudadanía sobre sitios fraudulentos. Verifique siempre que la dirección sea tse.go.cr antes de ingresar sus datos personales.",
  },
  {
    id: 4,
    date: "20 Ene 2026",
    category: "Elecciones",
    tag: "Oficial",
    emoji: "🏛️",
    color: "azul",
    title: "Nuevas autoridades gobernantes toman posesión ante el TSE",
    excerpt:
      "Las autoridades electas en los comicios nacionales tomaron posesión formal ante el Tribunal Supremo de Elecciones en ceremonia oficial.",
  },
  {
    id: 5,
    date: "10 Dic 2025",
    category: "Democracia",
    tag: "Educación",
    emoji: "📚",
    color: "azul",
    title: "Programa de formación en democracia alcanza 50.000 estudiantes",
    excerpt:
      "El programa educativo del TSE llegó a más de cincuenta mil estudiantes de secundaria en todo el país durante el ciclo lectivo 2025.",
  },
  {
    id: 6,
    date: "05 Dic 2025",
    category: "Registro",
    tag: "Servicio",
    emoji: "📋",
    color: "verde",
    title: "Nuevas opciones para solicitar certificaciones digitales en línea",
    excerpt:
      "El TSE amplió su plataforma en línea para permitir la solicitud de certificaciones de nacimiento, matrimonio y defunción de manera remota.",
  },
];

export const PADRON_DATA = {
  "1-0000-0000": {
    nombre: "CARLOS ANDRÉS MORA JIMÉNEZ",
    cedula: "1-0000-0000",
    provincia: "San José",
    canton: "San José",
    distrito: "Carmen",
    junta: "0142",
    recinto: "Escuela República de Chile",
    direccion: "200 m norte del Parque Central, San José Centro",
  },
  "2-1234-5678": {
    nombre: "LAURA PATRICIA VARGAS SOLÍS",
    cedula: "2-1234-5678",
    provincia: "Alajuela",
    canton: "Alajuela",
    distrito: "Alajuela",
    junta: "0057",
    recinto: "Colegio Bilingüe de Alajuela",
    direccion: "Avenida 5, Calle 2, Alajuela Centro",
  },
  "3-0987-6543": {
    nombre: "MARIO ALBERTO ROJAS ULATE",
    cedula: "3-0987-6543",
    provincia: "Cartago",
    canton: "Cartago",
    distrito: "Oriental",
    junta: "0201",
    recinto: "Liceo de Cartago",
    direccion: "Frente al Parque Central de Cartago",
  },
};

export const CIVIL_DATA = {
  "1-0000-0000": {
    nombre: "CARLOS ANDRÉS MORA JIMÉNEZ",
    cedula: "1-0000-0000",
    sexo: "Masculino",
    nacionalidad: "Costarricense",
    provincia: "San José",
    fechaNacimiento: "12/03/1985",
    estado: "Vigente",
    vencimiento: "12/03/2030",
  },
  "2-1234-5678": {
    nombre: "LAURA PATRICIA VARGAS SOLÍS",
    cedula: "2-1234-5678",
    sexo: "Femenino",
    nacionalidad: "Costarricense",
    provincia: "Alajuela",
    fechaNacimiento: "08/07/1992",
    estado: "Vigente",
    vencimiento: "08/07/2027",
  },
  "3-0987-6543": {
    nombre: "MARIO ALBERTO ROJAS ULATE",
    cedula: "3-0987-6543",
    sexo: "Masculino",
    nacionalidad: "Costarricense",
    provincia: "Cartago",
    fechaNacimiento: "22/11/1978",
    estado: "Vigente",
    vencimiento: "22/11/2028",
  },
};

export const QUICK_SERVICES = [
  { icon: "🗳️", title: "Padrón Electoral", desc: "Conozca su centro de votación y junta receptora asignados.", page: "padron" },
  { icon: "🪪", title: "Consulta Civil", desc: "Verifique el estado y vigencia de su cédula de identidad.", page: "civil" },
  { icon: "📜", title: "Certificaciones", desc: "Solicite certificados de nacimiento, matrimonio y defunción.", page: "noticias" },
  { icon: "⚖️", title: "Jurisprudencia", desc: "Acceda a resoluciones y normativa electoral vigente.", page: "noticias" },
  { icon: "🏛️", title: "Sobre el TSE", desc: "Conozca la misión, visión y estructura del Tribunal.", page: "noticias" },
  { icon: "🌐", title: "Partidos Políticos", desc: "Información sobre partidos inscritos y financiamiento.", page: "noticias" },
];
