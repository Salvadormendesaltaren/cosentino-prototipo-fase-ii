export interface Column {
  title: string;
  body: string;
  link?: string;
  goToSection?: number;
  isCard?: boolean;
}

export interface Section {
  heroImage: string;
  heroTitle: string;
  introText: string[];
  videoLabel: string;
  loomId: string;
  loomId2?: string;
  bottomTitle: string;
  columns: Column[];
  ctaLabel?: string;
  ctaHref?: string;
}

export const sections: Section[] = [
  {
    heroImage: "/hero.png",
    heroTitle: "Sobre el prototipo.\nDe la pantalla a la grandeza.",
    introText: [
      "Con este concepto hemos querido demostrar cómo el diseño y la tecnología pueden trabajar juntos al servicio de soluciones que eleven la marca, la experiencia de producto, que inspiren y que conviertan.",
      "El área que se nos ha pedido trabajar es compleja y lleva detrás muchas decisiones. Por eso hemos querido trasladar todo el proceso a este documento.",
      "Cada apartado contiene un video explicativo así como los artefactos oportunos para acompañar el proceso.",
    ],
    videoLabel: "Video explicativo",
    loomId: "36c50dac91534283b7252723e575f384",
    bottomTitle: "",
    columns: [
      {
        title: "Investigación",
        body: "Nos hemos sumergido en el problema, buscando los puntos clave de la experiencia de uso del área de inspiración, sus usuarios y los por qués que deben guiar nuestras decisiones.",
        link: "Saber más →",
        goToSection: 1,
      },
      {
        title: "Cómo funciona el CMS",
        body: "Hemos creado un sandbox y una guía práctica del CMS que proponemos para gestionar los contenidos del área de inspiración.",
        link: "Saber más →",
        goToSection: 2,
      },
      {
        title: "Prototipo Navegable",
        body: "Hemos construido un prototipo navegable que materializa las decisiones de diseño clave del proyecto. Tres tipologías de contenido —editorial, referencial y mixto— organizadas en dos formas de consumo distintas, cada una pensada para un modelo mental diferente del usuario: dejarse inspirar o buscar con precisión.",
        link: "Saber más →",
        goToSection: 3,
      },
    ],
  },
  {
    heroImage: "/hero-investigacion.png",
    heroTitle: "Investigación. Entender para resolver.",
    introText: [
      "Antes de diseñar, necesitábamos entender cómo los distintos perfiles de usuario se relacionan con el contenido de inspiración. No es lo mismo un arquitecto que busca referencias de proyecto para enviar a su cliente, que un particular reformando su cocina, que un comercial de Cosentino preparando una visita, o un marmolista buscando aplicaciones de un material concreto.",
      "Para ello hemos combinado una auditoría del área existente con conversaciones con dos estudios de arquitectura: Felipe Espinel, de 1118 Estudio, y Bea Jiménez, de Suav Estudio. Ambos nos han dado las pistas sobre cómo un área de inspiración puede convertirse en una herramienta profesional real, y no solo en un escaparate.",
      "Las conclusiones de esta fase nos han llevado a identificar tres tipologías de contenido —puramente editorial, puramente referencial y un contenido mixto que es a la vez inspiración y referencia— y a entender que la clave no está solo en qué se muestra, sino en cómo el usuario espera encontrarlo según su modelo mental en cada momento.",
    ],
    videoLabel: "Video explicativo",
    loomId: "3225544ac9b2492091318198fae9c03c",
    loomId2: "bdad78c149a34424905dd03bd5fbd9f7",
    bottomTitle: "Fases de la investigación",
    columns: [
      {
        title: "Auditoría del área de inspiración",
        body: "Hemos analizado en profundidad el área de inspiración actual, identificando su estructura, contenidos y patrones de uso para detectar oportunidades de mejora.",
      },
      {
        title: "Mapeo de arquitectura",
        body: "Hemos documentado y visualizado la arquitectura de información existente, estableciendo una base sólida sobre la que construir la nueva propuesta.",
      },
      {
        title: "Conversaciones con profesionales",
        body: "Hemos hablado con Felipe Espinel, de 1118 Estudio, y con Bea Jiménez, de Suav Estudio, para entender cómo los profesionales se relacionan realmente con el área de inspiración y qué necesitan de ella.",
      },
    ],
  },
  {
    heroImage: "/hero-cms.png",
    heroTitle: "Cómo funciona el CMS. Escalabilidad y sencillez nunca vista.",
    introText: [
      "La tecnología detrás de la gestión de contenidos es tan importante como el diseño que la envuelve. Proponemos Contentful como CMS headless para el área de inspiración, una solución que permite a los equipos de contenido trabajar con total autonomía.",
      "Su arquitectura desacoplada garantiza que el front-end pueda evolucionar sin depender de desarrollo: crear artículos, publicar proyectos, gestionar galerías y entrevistas sin tocar una línea de código.",
      "Hemos preparado un sandbox en el que podéis probar la herramienta en vivo, crear contenidos y comprobar cómo se estructura la información que después alimenta el prototipo.",
    ],
    videoLabel: "Video explicativo",
    loomId: "b600d1ac53364e6f85cf5a1165f55eee",
    bottomTitle: "Probar el CMS",
    ctaLabel: "Entrar en Contentful →",
    ctaHref: "https://app.contentful.com",
    columns: [
      {
        title: "Prueba el CMS en vivo",
        body: "Hemos preparado un sandbox de Contentful para que podáis experimentar con la herramienta en primera persona. Crear contenidos, modificar estructuras, probar flujos de publicación: todo está abierto para que toquéis lo que queráis sin miedo a romper nada.",
      },
      {
        title: "Recibiréis una invitación",
        body: "Os enviaremos una invitación al espacio de Contentful por email. Una vez dentro, tendréis acceso completo al sandbox con los modelos de contenido que alimentan el prototipo.",
      },
      {
        title: "Qué podréis hacer",
        body: "Crear y editar artículos, proyectos y galerías. Ver cómo se estructuran los contenidos con modelos reutilizables. Comprobar cómo los cambios en el CMS se reflejan directamente en el front-end sin intervención de desarrollo.",
      },
    ],
  },
  {
    heroImage: "/hero-prototipo.png",
    heroTitle: "Prototipo. Audacia para que marca y producto confluyan.",
    introText: [
      "El prototipo se organiza en torno a cómo el usuario se relaciona con el contenido en cada momento. Hemos identificado tres tipologías: contenido puramente editorial (entrevistas, artículos), contenido puramente referencial (galerías de producto y aplicación) y un contenido mixto —los proyectos y casos de estudio— que es a la vez inspiración y referencia técnica.",
      "Esa tercera tipología es la que aparece en las dos formas de consumo. El Magazine es un espacio desordenado y bello, como la vida misma, donde convive lo editorial con los proyectos para posicionar, conectar con la marca e inspirar. El área Encuentra es precisa y eficiente, como un Pinterest construido para Cosentino, donde los proyectos conviven con las galerías para que tanto un particular, un arquitecto, un comercial o un marmolista encuentren exactamente lo que necesitan.",
      "Hemos puesto especial esfuerzo en que el área de inspiración funcione como herramienta: guardar proyectos en listas, compartirlas con clientes y consumirlas en formato editorial o funcional. El objetivo es que un profesional pueda enviar a su cliente una selección de referencias desde Cosentino, convirtiendo el área de inspiración en un motor de negocio.",
    ],
    videoLabel: "Video explicativo",
    loomId: "598ae6662fa743a98c8cc88be0979f2d",
    bottomTitle: "",
    ctaLabel: "Explorar el prototipo →",
    ctaHref: "/prototipo",
    columns: [
      {
        title: "No pretende cubrir todos los casos de uso",
        body: "Aunque el prototipo tiene una apariencia realista, no puede ni pretende resolver todos los casos de uso. Es un área compleja donde cada decisión afecta a múltiples perfiles de usuario y requiere validación en un entorno real.",
      },
      {
        title: "Toma de decisiones",
        body: "Hemos querido ser ambiciosos con esta exploración. Nuestras decisiones deben evaluarse en un entorno real, pero queremos mostrar hasta dónde se puede llegar cuando se parte de las necesidades reales de la organización, sus profesionales y sus usuarios finales.",
      },
      {
        title: "Una herramienta, no un escaparate",
        body: "El área de inspiración debe servir tanto para enamorar como para vender. Un arquitecto que envía a su cliente una lista de proyectos en Silestone. Un comercial de Cosentino que prepara una selección para un estudio. Un marmolista que busca aplicaciones para recomendar a un constructor. Hemos diseñado para que todos esos momentos ocurran aquí.",
      },
    ],
  },
];
