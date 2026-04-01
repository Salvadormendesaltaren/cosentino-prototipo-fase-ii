export interface Column {
  title: string;
  body: string;
  link?: string;
  goToSection?: number;
}

export interface Section {
  heroImage: string;
  heroTitle: string;
  introText: string[];
  videoLabel: string;
  loomId: string;
  bottomTitle: string;
  columns: Column[];
}

export const sections: Section[] = [
  {
    heroImage: "/hero.png",
    heroTitle: "Sobre el prototipo.\nDe la pantalla a la grandeza.",
    introText: [
      "Con este concepto hemos querido poner en valor el diseño en la tecnología al servicio de soluciones funcionales y estéticas, que eleven branding, experiencia de producto, que inspiren y que conviertan.",
      "El área que se nos ha pedido trabajar es compleja y contiene muchas decisiones detrás, es por eso que hemos querido trasladar todo el proceso en este documento.",
      "Cada apartado contiene un video explicativo así como los artefactos oportunos para acompañar el proceso.",
    ],
    videoLabel: "Video explicativo",
    loomId: "285713651ecf4fc4899cb7ae055e7af1",
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
        body: "Hemos creado un sandbox y una pequeña guía práctica de uso del CMS que proponemos para la tecnología detrás de la gestión de contenidos.",
        link: "Saber más →",
        goToSection: 2,
      },
      {
        title: "Prototipo Navegable",
        body: "Nos hemos sumergido en el problema, buscando los puntos clave de la experiencia de uso del área de inspiración, sus usuarios y los por qués que deben guiar nuestras decisiones.",
        link: "Saber más →",
        goToSection: 3,
      },
    ],
  },
  {
    heroImage: "/hero-investigacion.png",
    heroTitle: "Investigación. Entender para resolver.",
    introText: [
      "Con este concepto hemos querido poner en valor el diseño en la tecnología al servicio de soluciones funcionales y estéticas, que eleven branding, experiencia de producto, que inspiren y que conviertan.",
      "El área que se nos ha pedido trabajar es compleja y contiene muchas decisiones detrás, es por eso que hemos querido trasladar todo el proceso en este documento.",
      "Cada apartado contiene un video explicativo así como los artefactos oportunos para acompañar el proceso.",
    ],
    videoLabel: "Video explicativo",
    loomId: "bdad78c149a34424905dd03bd5fbd9f7",
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
        body: "Hemos hablado con dos arquitectos que dirigen sendos estudios de arquitectura, con el objetivo de entender mejor cuál es la realidad del uso del área de inspiración.",
      },
    ],
  },
  {
    heroImage: "/hero-cms.png",
    heroTitle: "Cómo funciona el CMS. Escalabilidad y sencillez nunca vista.",
    introText: [
      "Con este concepto hemos querido poner en valor el diseño en la tecnología al servicio de soluciones funcionales y estéticas, que eleven branding, experiencia de producto, que inspiren y que conviertan.",
      "El área que se nos ha pedido trabajar es compleja y contiene muchas decisiones detrás, es por eso que hemos querido trasladar todo el proceso en este documento.",
      "Cada apartado contiene un video explicativo así como los artefactos oportunos para acompañar el proceso.",
    ],
    videoLabel: "Video explicativo",
    loomId: "285713651ecf4fc4899cb7ae055e7af1",
    bottomTitle: "Probar el CMS",
    columns: [
      {
        title: "Prueba el CMS en vivo",
        body: "Hemos creado el Sandbox para que probéis Contentful en vivo. ¡Podéis tocar y romper todo lo que queráis!\n\nPara loguearte simplemente sigue el enlace y usa las credenciales que te hemos dejado",
        link: "Probar Contentful →",
      },
      {
        title: "Credenciales",
        body: "Usuario:\nPassword:",
      },
    ],
  },
  {
    heroImage: "/hero-prototipo.png",
    heroTitle: "Prototipo. Audacia para que marca y producto confluyan.",
    introText: [
      "Con este concepto hemos querido poner en valor el diseño en la tecnología al servicio de soluciones funcionales y estéticas, que eleven branding, experiencia de producto, que inspiren y que conviertan.",
      "El área que se nos ha pedido trabajar es compleja y contiene muchas decisiones detrás, es por eso que hemos querido trasladar todo el proceso en este documento.",
      "Cada apartado contiene un video explicativo así como los artefactos oportunos para acompañar el proceso.",
    ],
    videoLabel: "Video explicativo",
    loomId: "285713651ecf4fc4899cb7ae055e7af1",
    bottomTitle: "",
    columns: [
      {
        title: "No pretende cubrir todos los casos de uso",
        body: "Aunque el prototipo tiene una apariencia realista, no puede ni pretende resolver todos los casos de uso. Es un área compleja con muchas implicaciones que requieren investigación.",
      },
      {
        title: "Toma de decisiones",
        body: "Hemos querido mejorarnos a la hora de realizar esta exploración. Sin duda, nuestras decisiones deben evaluarse en un entorno real pero queremos mostrar las posibilidades que tenemos partiendo de las necesidades de la organización y nuestros usuarios.",
      },
      {
        title: "Conversaciones con profesionales",
        body: "Hemos hablado con dos arquitectos que dirigen sendos estudios de arquitectura, con el objetivo de entender mejor cuál es la realidad del uso del área de inspiración.",
      },
    ],
  },
];
