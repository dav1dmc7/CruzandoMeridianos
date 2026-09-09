export type CatalogCategory =
  | "regiones"
  | "naturaleza"
  | "parques"
  | "playas"
  | "fauna"
  | "cultura"
  | "actividades";

export interface CatalogEntry {
  id: string;
  name: string;
  category: CatalogCategory;
  description: string;
  region?: string;
  featured?: boolean;
  sourceUrl?: string;
  sourceLabel?: string;
}

const visitCostaRica = "https://es.visitcostarica.com";
const sinac = "https://www.sinac.go.cr";

export const destinationCatalog: Record<string, CatalogEntry[]> = {
  "costa-rica": [
    {
      id: "caribe",
      name: "Caribe",
      category: "regiones",
      description: "Costa caribeña, selva, arrecifes y una identidad afrocaribeña muy marcada.",
      featured: true,
      sourceUrl: `${visitCostaRica}/where-to-go`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "pacifico-central",
      name: "Pacífico Central",
      category: "regiones",
      description: "Costa, bosque tropical, actividades al aire libre y acceso a parques y fauna.",
      featured: true,
      sourceUrl: `${visitCostaRica}/where-to-go`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "valle-central",
      name: "Valle Central",
      category: "regiones",
      description: "Ciudades, volcanes, mercados, cultura y montañas alrededor del núcleo urbano del país.",
      sourceUrl: `${visitCostaRica}/where-to-go`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "guanacaste",
      name: "Guanacaste",
      category: "regiones",
      description: "Bosque seco tropical, grandes playas, paisajes volcánicos y costa del Pacífico Norte.",
      featured: true,
      sourceUrl: `${visitCostaRica}/where-to-go`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "llanuras-del-norte",
      name: "Llanuras del Norte",
      category: "regiones",
      description: "Volcanes, bosques, ríos, cascadas y aguas termales en el norte del país.",
      featured: true,
      sourceUrl: `${visitCostaRica}/where-to-go`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "puntarenas",
      name: "Puntarenas",
      category: "regiones",
      description: "Costa e islas, bosque nuboso y algunas de las experiencias naturales más conocidas del país.",
      sourceUrl: `${visitCostaRica}/where-to-go`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "pacifico-sur",
      name: "Pacífico Sur",
      category: "regiones",
      description: "Bosque lluvioso, playas y algunos de los territorios más intactos de Costa Rica.",
      featured: true,
      sourceUrl: `${visitCostaRica}/where-to-go`,
      sourceLabel: "Visit Costa Rica",
    },

    {
      id: "corcovado",
      name: "Parque Nacional Corcovado",
      category: "parques",
      description: "Gran espacio protegido del Pacífico Sur, asociado a selva tropical y una biodiversidad excepcional.",
      region: "Pacífico Sur",
      featured: true,
      sourceUrl: `${sinac}/ES/ac/acosa/Paginas/mapa.aspx`,
      sourceLabel: "SINAC",
    },
    {
      id: "marino-ballena",
      name: "Parque Nacional Marino Ballena",
      category: "parques",
      description: "Área protegida marina y costera en el Pacífico Sur, conocida también por su relación con la observación de fauna marina.",
      region: "Pacífico Sur",
      sourceUrl: `${sinac}/ES/ac/acosa/Paginas/mapa.aspx`,
      sourceLabel: "SINAC",
    },
    {
      id: "cahuita",
      name: "Parque Nacional Cahuita",
      category: "parques",
      description: "Bosque tropical, costa caribeña y ecosistemas marinos protegidos en una misma visita.",
      region: "Caribe",
      featured: true,
      sourceUrl: `${sinac}/ES/ac/aclac/Paginas/mapa.aspx`,
      sourceLabel: "SINAC",
    },
    {
      id: "volcan-arenal",
      name: "Parque Nacional Volcán Arenal",
      category: "parques",
      description: "Bosque y paisaje volcánico alrededor de uno de los grandes iconos naturales del país.",
      region: "Llanuras del Norte",
      featured: true,
      sourceUrl: `${visitCostaRica}/things-to-do/ecoturism/national-parks`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "carara",
      name: "Parque Nacional Carara",
      category: "parques",
      description: "Área protegida del Pacífico Central con una transición destacada entre ecosistemas secos y húmedos.",
      region: "Pacífico Central",
      sourceUrl: `${sinac}/ES/ac/acopac/Paginas/mapas.aspx`,
      sourceLabel: "SINAC",
    },
    {
      id: "manuel-antonio",
      name: "Parque Nacional Manuel Antonio",
      category: "parques",
      description: "Bosque tropical y costa del Pacífico Central en uno de los parques más conocidos del país.",
      region: "Pacífico Central",
      featured: true,
      sourceUrl: `${sinac}/ES/ac/acopac/Paginas/mapas.aspx`,
      sourceLabel: "SINAC",
    },
    {
      id: "rincon-de-la-vieja",
      name: "Parque Nacional Rincón de la Vieja",
      category: "parques",
      description: "Volcanismo, bosque y paisajes del noroeste de Costa Rica.",
      region: "Guanacaste",
      sourceUrl: `${sinac}/ES/ac/acg/Paginas/mapa.aspx`,
      sourceLabel: "SINAC",
    },
    {
      id: "tenorio",
      name: "Parque Nacional Volcán Tenorio",
      category: "parques",
      description: "Bosque y paisaje volcánico en el entorno asociado al río Celeste.",
      region: "Llanuras del Norte",
      sourceUrl: `${sinac}/ES/ac/acat/Paginas/mapa.aspx`,
      sourceLabel: "SINAC",
    },
    {
      id: "poas",
      name: "Parque Nacional Volcán Poás",
      category: "parques",
      description: "Volcán activo y uno de los grandes espacios naturales del entorno del Valle Central.",
      region: "Valle Central",
      sourceUrl: "https://www.sinac.go.cr/ES/ac/accvc/pnvp/Paginas/default.aspx",
      sourceLabel: "SINAC",
    },
    {
      id: "monteverde",
      name: "Bosque Nuboso de Monteverde",
      category: "naturaleza",
      description: "Paisaje de bosque nuboso especialmente conocido por su biodiversidad y sus experiencias de naturaleza.",
      region: "Puntarenas",
      featured: true,
      sourceUrl: `${visitCostaRica}/where-to-go`,
      sourceLabel: "Visit Costa Rica",
    },

    {
      id: "puerto-viejo",
      name: "Puerto Viejo de Talamanca",
      category: "playas",
      description: "Base del Caribe Sur para combinar costa, selva y cultura local.",
      region: "Caribe",
      featured: true,
      sourceUrl: `${visitCostaRica}/where-to-go`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "cocles",
      name: "Playa Cocles",
      category: "playas",
      description: "Playa del Caribe Sur especialmente vinculada al surf, la costa tropical y el entorno de Puerto Viejo.",
      region: "Caribe",
      sourceUrl: `${visitCostaRica}/things-to-do/beaches-and-relaxation`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "punta-uva",
      name: "Punta Uva",
      category: "playas",
      description: "Una de las playas del Caribe Sur que combina paisaje tropical y proximidad a bosque y fauna.",
      region: "Caribe",
      sourceUrl: `${visitCostaRica}/things-to-do/beaches-and-relaxation`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "tamarindo",
      name: "Tamarindo",
      category: "playas",
      description: "Destino costero de Guanacaste conocido por su playa, surf y ambiente.",
      region: "Guanacaste",
      featured: true,
      sourceUrl: `${visitCostaRica}/things-to-do/beaches-and-relaxation`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "playa-conchal",
      name: "Playa Conchal",
      category: "playas",
      description: "Playa de Guanacaste destacada por su paisaje costero y sus aguas del Pacífico Norte.",
      region: "Guanacaste",
      sourceUrl: `${visitCostaRica}/things-to-do/beaches-and-relaxation`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "nosara",
      name: "Nosara",
      category: "playas",
      description: "Zona de Guanacaste asociada a playa, surf y un ambiente más relajado.",
      region: "Guanacaste",
      sourceUrl: `${visitCostaRica}/things-to-do/beaches-and-relaxation`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "dominical",
      name: "Dominical",
      category: "playas",
      description: "Costa del Pacífico Sur conocida por su playa, surf y entorno natural.",
      region: "Pacífico Sur",
      sourceUrl: `${visitCostaRica}/things-to-do/beaches-and-relaxation`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "uvita",
      name: "Uvita",
      category: "playas",
      description: "Localidad costera del Pacífico Sur vinculada al Parque Nacional Marino Ballena y su entorno marino.",
      region: "Pacífico Sur",
      sourceUrl: `${visitCostaRica}/things-to-do/beaches-and-relaxation`,
      sourceLabel: "Visit Costa Rica",
    },

    {
      id: "tortuguero",
      name: "Tortuguero",
      category: "fauna",
      description: "Zona caribeña célebre por sus canales, humedales y posibilidades de observación de fauna.",
      region: "Caribe",
      featured: true,
      sourceUrl: `${visitCostaRica}/where-to-go`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "cano-negro",
      name: "Caño Negro",
      category: "fauna",
      description: "Humedales del norte especialmente interesantes para observar aves y fauna ligada al agua.",
      region: "Llanuras del Norte",
      sourceUrl: `${visitCostaRica}/plan-your-trip/when-to-visit`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "ballenas-delfines",
      name: "Ballenas y delfines",
      category: "fauna",
      description: "El Pacífico Sur ofrece temporadas y espacios vinculados a la observación de cetáceos.",
      region: "Pacífico Sur",
      sourceUrl: `${visitCostaRica}/plan-your-trip/when-to-visit`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "aves-monteverde",
      name: "Observación de aves en Monteverde",
      category: "fauna",
      description: "El bosque nuboso es uno de los entornos destacados del país para la observación de aves.",
      region: "Puntarenas",
      sourceUrl: `${visitCostaRica}/plan-your-trip/when-to-visit`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "monos-perezosos",
      name: "Monos y perezosos",
      category: "fauna",
      description: "La fauna terrestre es uno de los grandes atractivos del país, especialmente en bosques y áreas protegidas.",
      region: "Varias regiones",
      sourceUrl: `${visitCostaRica}/explore-costa-rica`,
      sourceLabel: "Visit Costa Rica",
    },

    {
      id: "san-jose",
      name: "San José",
      category: "cultura",
      description: "Capital del país y punto de acceso para conocer museos, mercados, gastronomía y vida urbana.",
      region: "Valle Central",
      sourceUrl: `${visitCostaRica}/where-to-go`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "mercado-central",
      name: "Mercado Central",
      category: "cultura",
      description: "Espacio emblemático de San José para acercarse a productos, comida y vida cotidiana.",
      region: "Valle Central",
      sourceUrl: `${visitCostaRica}/plan-your-trip/when-to-visit`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "fincas-chocolate",
      name: "Fincas de cacao y chocolate",
      category: "cultura",
      description: "Experiencias ligadas al cacao y al turismo rural que permiten conocer una parte de la producción local.",
      region: "Varias regiones",
      sourceUrl: `${visitCostaRica}/plan-your-trip/when-to-visit`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "pura-vida",
      name: "Pura Vida",
      category: "cultura",
      description: "Una expresión convertida en rasgo cultural asociado a la vida cotidiana y a la identidad costarricense.",
      region: "Todo el país",
      sourceUrl: `${visitCostaRica}/about-costa-rica`,
      sourceLabel: "Visit Costa Rica",
    },

    {
      id: "rafting-pacuare",
      name: "Río Pacuare",
      category: "actividades",
      description: "Uno de los grandes escenarios del país para actividades de aventura en río.",
      region: "Caribe / Zona Norte",
      featured: true,
      sourceUrl: `${visitCostaRica}/things-to-do`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "surf",
      name: "Surf",
      category: "actividades",
      description: "La costa del Pacífico y algunas zonas del Caribe ofrecen condiciones y ambientes distintos para practicar surf.",
      region: "Pacífico y Caribe",
      sourceUrl: `${visitCostaRica}/things-to-do/beaches-and-relaxation`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "tirolina",
      name: "Tirolina entre el bosque",
      category: "actividades",
      description: "Una de las actividades de aventura más características del entorno de bosque y montaña.",
      region: "Puntarenas / Monteverde",
      sourceUrl: `${visitCostaRica}/things-to-do`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "aguas-termales",
      name: "Aguas termales",
      category: "actividades",
      description: "La actividad volcánica del norte del país permite encontrar diferentes experiencias de aguas termales.",
      region: "Llanuras del Norte",
      sourceUrl: `${visitCostaRica}/where-to-go`,
      sourceLabel: "Visit Costa Rica",
    },
    {
      id: "senderismo",
      name: "Senderismo",
      category: "actividades",
      description: "Hay senderos y experiencias de bosque en parques nacionales, reservas y entornos de montaña de todo el país.",
      region: "Todo el país",
      sourceUrl: `${visitCostaRica}/things-to-do/ecoturism/national-parks`,
      sourceLabel: "Visit Costa Rica",
    },
  ],
};

export const getDestinationCatalog = (slug: string): CatalogEntry[] =>
  destinationCatalog[slug] ?? [];

export const getCatalogCategories = (slug: string): CatalogCategory[] => {
  const order: CatalogCategory[] = [
    "regiones",
    "naturaleza",
    "parques",
    "playas",
    "fauna",
    "cultura",
    "actividades",
  ];

  const entries = getDestinationCatalog(slug);
  return order.filter((category) => entries.some((entry) => entry.category === category));
};
