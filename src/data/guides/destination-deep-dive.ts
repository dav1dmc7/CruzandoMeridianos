import type { GuideSection } from "./types";

const REVIEWED_AT = "2026-09-17";
type SectionOverride = Omit<GuideSection, "number">;

type DeepDive = {
  name: string;
  zones: string[];
  experience: string[];
  season: string[];
  bases: Array<{ title: string; description: string }>;
  experiences: Array<{ title: string; description: string }>;
};

const deepDive: Record<string, DeepDive> = {
  polonia: {
    name: "Polonia",
    zones: [
      "Cracovia concentra patrimonio, casco histórico, Kazimierz y excursiones de gran peso como Auschwitz-Birkenau y las minas de sal; merece varios días si es tu primera aproximación.",
      "Varsovia aporta otra lectura del país: historia del siglo XX, casco reconstruido, barrios contemporáneos y una vida urbana diferente. Gdansk añade costa y arquitectura portuaria, mientras Wroclaw funciona muy bien para una ruta urbana más tranquila.",
      "Para una primera ruta suele ser más coherente unir dos o tres ciudades conectadas por tren que intentar cubrir todo el país en coche.",
    ],
    experience: [
      "La combinación más rica suele mezclar ciudades históricas con una experiencia que explique la historia reciente, en vez de acumular centros históricos similares.",
      "Cracovia, Varsovia y Gdansk tienen suficiente personalidad para funcionar como viajes distintos. La gastronomía, los mercados y los barrios aportan mucho cuando se deja tiempo fuera del monumento principal.",
    ],
    season: [
      "Primavera y otoño equilibran temperaturas y visitas urbanas; el invierno transforma el viaje con días cortos y ambiente más frío, mientras el verano amplía las horas de luz pero aumenta la demanda.",
      "Para una ruta con varias ciudades pesa más el clima que una supuesta temporada perfecta: la mejor fecha depende de cuánto caminarás y de si quieres combinar costa, naturaleza o solo ciudades.",
    ],
    bases: [
      { title: "Cracovia", description: "Base muy potente para patrimonio, gastronomía y excursiones; evita convertir todas las mañanas en traslados." },
      { title: "Varsovia", description: "Conviene darle identidad propia y no tratarla como una extensión de Cracovia: su historia contemporánea cambia completamente la experiencia." },
      { title: "Gdansk / Wroclaw", description: "Añaden personalidad geográfica y permiten construir una ruta urbana menos repetitiva." },
    ],
    experiences: [
      { title: "Patrimonio", description: "Casco histórico, arquitectura, iglesias, plazas y barrios con capas históricas diferentes." },
      { title: "Historia reciente", description: "Museos y lugares vinculados a la Segunda Guerra Mundial y al siglo XX, tratados con tiempo y contexto." },
      { title: "Vida local", description: "Mercados, cafés, gastronomía y barrios que merecen tanto espacio como los grandes monumentos." },
    ],
  },
  italia: {
    name: "Italia",
    zones: [
      "Italia funciona mejor cuando se elige una geografía: Roma y Toscana, norte de Italia y lagos, Sicilia, Campania y costa Amalfitana, Puglia, Dolomitas o una combinación muy controlada.",
      "Roma, Florencia y Venecia pueden conectarse muy bien en tren, mientras que muchas zonas rurales y costeras ganan con coche. El error es intentar usar un único modelo de transporte para todo el país.",
      "Las distancias ferroviarias engañan menos que las carreteras costeras o de montaña, donde aparcamiento, tráfico, ZTL y tiempo real pueden alterar por completo un día.",
    ],
    experience: [
      "Italia tiene suficiente patrimonio para llenar un viaje entero, pero también paisajes, gastronomía, pueblos, lagos y costa. La clave es alternar intensidad cultural con días de ritmo más bajo.",
      "Las visitas con hora, museos muy demandados y monumentos principales deben ocupar los días más estructurados; mercados, paseos, miradores y pueblos funcionan mejor como piezas flexibles.",
    ],
    season: [
      "Primavera y otoño suelen ser muy versátiles para ciudades y rutas; el verano puede ser excelente para costa o montaña, pero cambia el ritmo por calor, demanda y precios.",
      "En zonas alpinas la temporada es completamente distinta de Sicilia o Puglia. La fecha debe salir de la región y de la actividad que quieras priorizar.",
    ],
    bases: [
      { title: "Roma", description: "Necesita varios días solo para entender sus capas históricas; añadir demasiadas excursiones reduce la experiencia de la propia ciudad." },
      { title: "Florencia + Toscana", description: "Una combinación natural cuando quieres arte y ciudad junto a pueblos, paisaje y gastronomía con coche selectivo." },
      { title: "Norte / Lagos / Dolomitas", description: "Mucho más dependiente de carretera, montaña, aparcamiento y temporada que una ruta clásica por ciudades." },
    ],
    experiences: [
      { title: "Arte y patrimonio", description: "Grandes museos y monumentos, pero también iglesias, barrios y patrimonio menor que explica mejor cada ciudad." },
      { title: "Paisaje y carretera", description: "Toscana, lagos, costa y Dolomitas permiten que el viaje cambie de ritmo sin abandonar Italia." },
      { title: "Comer como parte del viaje", description: "Mercados, trattorias, productos regionales y horarios locales forman parte de la experiencia, no un descanso entre monumentos." },
    ],
  },
  viena: {
    name: "Viena",
    zones: [
      "El Innere Stadt concentra una parte enorme de los iconos, pero repartir el viaje entre Ringstrasse, MuseumsQuartier, Belvedere, Schönbrunn y barrios residenciales evita caminar siempre por la misma zona turística.",
      "Grinzing y los Heuriger, Prater y los barrios junto al canal muestran una Viena diferente de la imperial. Son piezas especialmente útiles cuando dispones de más de dos días.",
      "La ciudad funciona muy bien con transporte público y paseos; no suele compensar diseñarla como una ruta de coche.",
    ],
    experience: [
      "Viena se disfruta tanto por sus museos y palacios como por cafés, música, barrios, mercados y parques. Conviene alternar grandes interiores con paseos.",
      "Un viaje corto puede centrarse en centro histórico + un gran museo + Schönbrunn; con más días aparecen Belvedere, barrios y excursiones al entorno.",
    ],
    season: [
      "La ciudad funciona todo el año y cada estación cambia el peso de mercados, jardines, conciertos y paseos. La temporada cultural también puede alterar disponibilidad y precios.",
      "Para aprovechar jardines y excursiones pesa más la luz y la meteorología; para museos y música, la temporada cultural puede ser un criterio más importante.",
    ],
    bases: [
      { title: "Centro histórico", description: "Máxima comodidad para una primera visita si quieres caminar entre monumentos y museos." },
      { title: "Barrios bien conectados", description: "Pueden ofrecer una experiencia más local sin perder acceso gracias al transporte público." },
      { title: "Schönbrunn como bloque", description: "Mejor reservarle su propio bloque temporal que intentar encajarlo entre muchas visitas del centro." },
    ],
    experiences: [
      { title: "Imperial", description: "Hofburg, Schönbrunn, Ringstrasse y arquitectura monumental como hilo conductor." },
      { title: "Cultura", description: "Museos, música, cafés y programación temporal que puede cambiar de un viaje a otro." },
      { title: "Viena cotidiana", description: "Mercados, barrios, parques y Heuriger para salir de la ruta imperial." },
    ],
  },
  praga: {
    name: "Praga",
    zones: [
      "Staré Město, Josefov, Malá Strana y Hradčany forman el núcleo histórico. Agruparlos por zonas permite caminar mucho y depender poco del transporte.",
      "Vyšehrad y barrios fuera del centro ayudan a recuperar ritmo cuando los lugares más conocidos están llenos. El tranvía es parte práctica de la ciudad y permite ampliar el radio sin complicar la estancia.",
      "Para una excursión cercana conviene comprobar primero si realmente aporta algo frente a disfrutar una mañana adicional en la propia Praga.",
    ],
    experience: [
      "Praga gana cuando se camina sin convertir cada puente y plaza en una foto rápida. Las primeras horas y las tardes permiten leer la ciudad con otra densidad de visitantes.",
      "Arquitectura, cafés, música, barrios y miradores completan los monumentos más conocidos y ayudan a repartir la experiencia.",
    ],
    season: [
      "Primavera y otoño favorecen largos días de paseo con temperaturas moderadas; el invierno aporta otra atmósfera pero reduce las horas de luz.",
      "La experiencia cambia bastante con eventos, Navidad y puentes, así que la demanda real debe mirarse junto con la fecha.",
    ],
    bases: [
      { title: "Staré Město", description: "Muy útil para una primera visita si quieres salir andando hacia los principales iconos." },
      { title: "Malá Strana", description: "Interesante para un ritmo más tranquilo y para acceder temprano al Castillo y al entorno del río." },
      { title: "Zonas fuera del centro", description: "Pueden ofrecer mejor relación entre precio y vida local si tienes transporte público bien conectado." },
    ],
    experiences: [
      { title: "Arquitectura", description: "Gótico, barroco, modernismo y arquitectura del siglo XX conviven en un radio relativamente pequeño." },
      { title: "Río y miradores", description: "El Moldava cambia la lectura de la ciudad y permite alternar paseos con visitas interiores." },
      { title: "Vida cultural", description: "Cafés, música, cerveza, galerías y barrios permiten construir días sin necesidad de encadenar monumentos." },
    ],
  },
  budapest: {
    name: "Budapest",
    zones: [
      "Budapest se entiende mejor separando Buda y Pest y usando el Danubio como eje. El Distrito del Castillo, el centro de Pest y los barrios del antiguo Jewish Quarter tienen ritmos diferentes.",
      "Los baños termales no son una visita de media hora: ocupan una franja de la jornada y funcionan mejor integrados con el resto del día según clima y energía.",
      "El transporte público hace fácil cubrir distancias, pero conviene agrupar Parlamento, ribera, Basílica y barrio histórico en bloques caminables antes de cruzar de un lado al otro.",
    ],
    experience: [
      "El Danubio, la arquitectura y los baños termales son las tres grandes capas; después entran gastronomía, mercados, cafés y vida nocturna.",
      "Una buena ruta evita repetir el mismo mirador de día y de noche como si fueran experiencias completamente distintas: el tiempo se aprovecha mejor combinando barrios y actividades.",
    ],
    season: [
      "Primavera y otoño suelen equilibrar paseo y temperaturas; el verano añade terrazas y jornadas largas, pero también calor y mayor demanda.",
      "El invierno puede funcionar especialmente bien si el viaje se apoya en baños, cafés y patrimonio interior y se acepta el día corto.",
    ],
    bases: [
      { title: "Pest centro", description: "Práctico para una primera visita y para combinar restaurantes, monumentos y transporte." },
      { title: "Buda", description: "Más atmosférico y tranquilo, especialmente si valoras el Castillo y vistas del Danubio." },
      { title: "Antiguo barrio judío", description: "Interesante para gastronomía y vida nocturna, pero hay que distinguir ambiente de descanso nocturno." },
    ],
    experiences: [
      { title: "Danubio", description: "Parlamento, puentes, riberas y vistas desde ambos lados del río." },
      { title: "Termas", description: "Una experiencia propia de la ciudad que merece tiempo suficiente, no un hueco improvisado." },
      { title: "Barrios y gastronomía", description: "Mercados, cafés, cocina húngara y vida nocturna completan el patrimonio monumental." },
    ],
  },
  amsterdam: {
    name: "Amsterdam",
    zones: [
      "El anillo de canales concentra iconos, pero el Museumplein, Jordaan, De Pijp, Noord, Oost y Westerpark permiten construir una ciudad mucho más amplia.",
      "Para museos con franja horaria, el orden del día debe construirse alrededor de la entrada reservada y no al revés. Después se puede conectar con barrios cercanos a pie o en tranvía.",
      "Zaanse Schans y otras excursiones cercanas pueden tener sentido con tiempo suficiente; no deberían comerse el día central de una estancia corta.",
    ],
    experience: [
      "Los canales son solo el principio: Rijksmuseum, Van Gogh, Stedelijk, barrios, mercados, arquitectura moderna y parques aportan suficiente variedad para varios días.",
      "La bicicleta es una experiencia, pero no una obligación. La elección debe depender de tu confianza, tráfico, lluvia y tipo de trayecto.",
    ],
    season: [
      "Primavera tiene un interés añadido por el paisaje de flores y el verano ofrece más horas de luz; otoño e invierno pueden favorecer museos y una ciudad más recogida.",
      "Eventos y exposiciones modifican muchísimo la demanda, por lo que el calendario cultural es parte real de la planificación.",
    ],
    bases: [
      { title: "Canal Ring / Jordaan", description: "Gran base para caminar y entender la ciudad histórica sin depender demasiado del transporte." },
      { title: "Oud-Zuid / Museumplein", description: "Muy útil cuando los museos son una prioridad y buscas una estancia más residencial." },
      { title: "Noord", description: "Interesante para una visión contemporánea de la ciudad, siempre que los trayectos encajen con tu ruta." },
    ],
    experiences: [
      { title: "Grandes museos", description: "Reserva primero lo que tenga hora concreta y usa el resto del día para recorrer barrios próximos." },
      { title: "Canales y barrios", description: "Caminar, navegar y descubrir mercados explica mejor la ciudad que acumular puntos fotográficos." },
      { title: "Amsterdam más allá del centro", description: "Noord, Westerpark, Oost y otras zonas aportan arquitectura, cultura y espacios verdes." },
    ],
  },
  paris: {
    name: "París",
    zones: [
      "París funciona por barrios: Marais, Île de la Cité y Louvre, Saint-Germain y Barrio Latino, Montmartre, Canal Saint-Martin y otras zonas deben organizarse por proximidad.",
      "La ciudad permite caminar muchísimo, pero el metro y RER son esenciales cuando el recorrido cruza varios distritos. No conviene diseñar días que salten continuamente de una punta a otra.",
      "Versalles y otras excursiones tienen sentido con estancias suficientemente largas; en dos o tres días suele aportar más profundizar en París que añadir otra ciudad.",
    ],
    experience: [
      "Además de los iconos, París tiene una enorme densidad de museos, jardines, mercados, arquitectura, gastronomía y barrios con personalidad. Una visita bien diseñada alterna grandes reservas con tiempo abierto.",
      "Para un primer viaje conviene aceptar algunos imprescindibles y construir alrededor de ellos por zonas, evitando cruzar la ciudad solo para una foto.",
    ],
    season: [
      "Primavera y comienzos de otoño suelen ser especialmente agradables para caminar; verano aporta mucha luz y eventos, mientras invierno favorece museos y estancias interiores.",
      "La agenda cultural puede cambiar completamente el interés de una fecha, así que conviene revisar exposiciones y espectáculos además del clima.",
    ],
    bases: [
      { title: "Marais / centro histórico", description: "Muy versátil para una primera visita y para moverse a pie entre barrios centrales." },
      { title: "Saint-Germain / Barrio Latino", description: "Interesante para combinar cultura, paseos, restaurantes y acceso a la ribera sur." },
      { title: "Montmartre", description: "Tiene personalidad propia, aunque conviene valorar las conexiones y el ambiente nocturno antes de elegirlo solo por estética." },
    ],
    experiences: [
      { title: "Grandes iconos", description: "Torre Eiffel, Louvre, Notre-Dame y otros imprescindibles requieren orden, reservas y margen." },
      { title: "Barrios", description: "Marais, Montmartre, Saint-Germain y otros distritos hacen que la ciudad cambie por completo de una calle a otra." },
      { title: "Cultura y paseo", description: "Museos, jardines, mercados, Seine y cafés dan continuidad a los días entre monumentos." },
    ],
  },
  "sur-de-francia": {
    name: "Sur de Francia",
    zones: [
      "No es un único destino: Costa Azul, Provenza, Camarga, Luberon y el entorno de Occitania requieren ritmos y alojamientos diferentes.",
      "Nice puede ser una base eficiente para costa y excursiones ferroviarias, mientras que la Provenza interior gana mucho con coche. Lo importante es no mezclar cada día costa, pueblos y grandes trayectos.",
      "Mercados y pueblos tienen horarios y ritmos propios; conviene construir las mañanas alrededor de los lugares que realmente quieras vivir y dejar las tardes más flexibles.",
    ],
    experience: [
      "El gran atractivo está en combinar costa, pueblos, paisaje, gastronomía y mercados sin intentar visitar todos los pueblos famosos.",
      "Una ruta muy buena puede tener menos paradas y más tiempo para caminar, comer y conducir por carreteras escénicas.",
    ],
    season: [
      "Primavera y otoño ofrecen buena combinación de temperaturas y vida local; verano favorece costa pero aumenta demanda y calor en zonas interiores.",
      "Algunos atractivos y alojamientos tienen temporada muy marcada, por lo que conviene comprobar calendarios locales antes de fijar una ruta.",
    ],
    bases: [
      { title: "Nice", description: "Base urbana muy útil para Riviera y conexiones en tren hacia varios puntos de la costa." },
      { title: "Aix / Avignon", description: "Buenas bases para interior y patrimonio cuando quieres reducir kilómetros de carretera." },
      { title: "Luberon y pueblos", description: "Más bonito con coche y ritmo lento; cambiar de alojamiento cada noche suele restar más de lo que aporta." },
    ],
    experiences: [
      { title: "Costa", description: "Nice, Antibes, Menton y otros puntos costeros permiten construir días distintos según playa, cultura o paseo." },
      { title: "Provenza interior", description: "Pueblos, mercados, viñedos y paisaje agrícola necesitan tiempo y no solo paradas fotográficas." },
      { title: "Carretera y gastronomía", description: "El desplazamiento puede ser parte del viaje cuando no se sobrecarga el calendario." },
    ],
  },
  "nueva-york": {
    name: "Nueva York",
    zones: [
      "Manhattan no es un solo barrio: Downtown, SoHo, Greenwich Village, Chelsea, Midtown y Upper Manhattan ofrecen experiencias muy diferentes. Brooklyn añade otra capa y merece tiempo propio.",
      "El metro permite cruzar la ciudad rápidamente, pero el diseño diario sigue siendo más eficiente por zonas. Un día puede agrupar Lower Manhattan y Brooklyn, otro Midtown y Central Park, otro museos y Upper Manhattan.",
      "Los miradores, Broadway, grandes museos y determinados restaurantes funcionan con reservas; deben ser las piezas fijas alrededor de las que se construye el resto.",
    ],
    experience: [
      "Nueva York se entiende mejor alternando iconos con barrios: arquitectura y skyline, museos, parques, comida, música y escenas locales.",
      "No hace falta llenar cada hora. Caminar por un barrio concreto y descubrirlo suele aportar más que sumar una atracción lejana.",
    ],
    season: [
      "Primavera y otoño son muy buenos para caminar; verano ofrece mucha actividad pero puede ser caluroso; invierno transforma la ciudad y reduce horas de luz.",
      "Broadway, exposiciones, deportes y eventos pueden pesar tanto como el clima al elegir fechas concretas.",
    ],
    bases: [
      { title: "Midtown", description: "Práctico para una primera visita muy enfocada a iconos, aunque menos residencial." },
      { title: "SoHo / Greenwich Village / Chelsea", description: "Más interesantes cuando quieres combinar barrios, restaurantes, arte y paseos." },
      { title: "Brooklyn", description: "Puede ser una segunda base o un objetivo de uno o varios días, pero no conviene reducirlo a una excursión de foto rápida." },
    ],
    experiences: [
      { title: "Skyline e iconos", description: "Miradores, puentes, Central Park y arquitectura deben repartirse por zonas y horarios." },
      { title: "Museos", description: "Met, MoMA y otras instituciones requieren bastante tiempo; elegir por intereses mejora mucho la experiencia." },
      { title: "Barrios", description: "La personalidad de Nueva York está también en mercados, restaurantes, parques y calles sin monumento principal." },
    ],
  },
  washington: {
    name: "Washington",
    zones: [
      "El National Mall concentra una cantidad extraordinaria de instituciones y monumentos; no conviene tratarlo como un paseo de dos horas si quieres entrar en museos.",
      "Capitol Hill, Penn Quarter, Georgetown, Dupont Circle y el entorno de Arlington ofrecen lecturas distintas y permiten repartir el día cuando el Mall empieza a saturar la agenda.",
      "La red de Metro y los desplazamientos a pie funcionan muy bien para unir bloques, mientras que Alexandria puede tener sentido como excursión si la estancia lo permite.",
    ],
    experience: [
      "La gran fortaleza es la combinación de historia, política, arquitectura y una oferta museística enorme, con muchos espacios gratuitos o de acceso controlado según institución.",
      "Conviene decidir qué museos realmente quieres visitar antes de llegar: intentar ver todos convierte la ciudad en una carrera interior.",
    ],
    season: [
      "Primavera tiene especial interés por los cerezos, pero también puede elevar la demanda. Otoño es cómodo para caminar y verano amplía las jornadas pero añade calor.",
      "El calendario institucional y de eventos puede cambiar accesos y afluencia, por lo que merece una revisión cercana al viaje.",
    ],
    bases: [
      { title: "Downtown / Penn Quarter", description: "Muy práctico para primera visita y para acceder caminando a parte del Mall." },
      { title: "Capitol Hill", description: "Interesante cuando el Congreso y el este del Mall son importantes en el viaje." },
      { title: "Georgetown / Dupont", description: "Aporta barrios, restaurantes y ambiente más residencial fuera del eje monumental." },
    ],
    experiences: [
      { title: "National Mall", description: "Monumentos y museos forman un conjunto enorme que merece dividirse por días." },
      { title: "Historia", description: "Arlington, Capitol Hill y espacios históricos amplían la narrativa más allá del Mall." },
      { title: "Barrios", description: "Georgetown, Dupont y otros distritos permiten equilibrar la densidad institucional." },
    ],
  },
  egipto: {
    name: "Egipto",
    zones: [
      "El viaje suele organizarse alrededor de tres bloques muy diferentes: Cairo/Giza, el valle del Nilo entre Luxor y Asuán, y el Mar Rojo. No todos necesitan el mismo número de noches.",
      "Luxor merece tiempo porque las orillas este y oeste tienen visitas distintas. Asuán y Abu Simbel cambian el ritmo hacia paisaje, navegación y patrimonio del sur.",
      "Los vuelos internos pueden ahorrar grandes jornadas de carretera y los cruceros del Nilo pueden simplificar la logística entre Luxor y Asuán, pero la elección depende del ritmo y de la experiencia buscada.",
    ],
    experience: [
      "Egipto no debería reducirse a pirámides: además de Cairo/Giza, Luxor, Asuán, Abu Simbel, navegación por el Nilo, museos, desierto y Mar Rojo ofrecen viajes muy diferentes.",
      "El calor condiciona muchísimo la experiencia arqueológica. Conviene colocar las visitas exteriores exigentes a primera hora siempre que la logística lo permita.",
    ],
    season: [
      "Los meses más suaves suelen favorecer el circuito arqueológico; los meses calurosos pueden seguir funcionando si se adapta el horario y se priorizan actividades interiores o costa.",
      "El clima del Mediterráneo, Cairo, valle del Nilo y Mar Rojo no se comporta exactamente igual: elegir fechas por todo el país a la vez puede ser engañoso.",
    ],
    bases: [
      { title: "Cairo / Giza", description: "Necesita combinar visitas de patrimonio con tiempo urbano; no conviene usarla solo como puerta de entrada a las pirámides." },
      { title: "Luxor", description: "Es el gran nodo arqueológico del Nilo y funciona mejor con varios bloques de visitas y madrugones controlados." },
      { title: "Asuán + Abu Simbel", description: "Añade paisaje y una escala distinta; requiere mirar conexiones antes de fijar vuelos o crucero." },
    ],
    experiences: [
      { title: "Arqueología", description: "Giza, Saqqara, Luxor, Valle de los Reyes, Karnak y otros complejos requieren elegir profundidad frente a acumulación." },
      { title: "Nilo", description: "Crucero, faluca y vida ribereña cambian la percepción del país frente a la visita puramente terrestre." },
      { title: "Mar Rojo y desierto", description: "Buceo, snorkel, costa y experiencias desérticas permiten construir una segunda mitad mucho más lenta." },
    ],
  },
  mauricio: {
    name: "Mauricio",
    zones: [
      "El norte, oeste, suroeste y este tienen perfiles distintos. El alojamiento importa mucho porque desplazarte todos los días de una costa a otra puede comerse una parte importante de la estancia.",
      "Port Louis funciona como bloque urbano y cultural; Le Morne y el suroeste concentran paisaje y actividades; el este tiene una lectura más marítima y de resort.",
      "El coche da libertad para explorar, pero conviene reservar algunos días sin grandes desplazamientos para que la isla no se convierta en una colección de excursiones.",
    ],
    experience: [
      "Mauricio combina playas y lagunas con montaña, senderos, cultura criolla, gastronomía y excursiones. La experiencia mejora cuando no se reserva todo el viaje alrededor del resort.",
      "Le Morne, Black River Gorges, mercados y costa permiten equilibrar días de naturaleza con jornadas de agua y descanso.",
    ],
    season: [
      "La meteorología tropical cambia según costa y época, por lo que el viaje debe mantener flexibilidad para mover excursiones de mar cuando cambien las condiciones.",
      "La fecha puede ser excelente para unas actividades y menos favorable para otras; por eso importa más el conjunto de prioridades que una única tabla de temporada.",
    ],
    bases: [
      { title: "Oeste / suroeste", description: "Muy útil para combinar atardeceres, Le Morne, parques y actividad de costa." },
      { title: "Norte", description: "Aporta playas, vida local y acceso cómodo a Port Louis y a varias excursiones marítimas." },
      { title: "Este", description: "Más orientado a lagunas y resort; puede funcionar mejor para un tramo de descanso real." },
    ],
    experiences: [
      { title: "Mar", description: "Lagunas, playas, navegación, snorkel y otras actividades acuáticas son parte central del destino." },
      { title: "Naturaleza", description: "Montaña, senderos, cascadas y paisajes del interior rompen la lógica de playa continua." },
      { title: "Cultura y comida", description: "Port Louis, mercados y cocina local aportan contexto y hacen que la isla sea mucho más que un resort." },
    ],
  },
  malta: {
    name: "Malta",
    zones: [
      "Valletta y las Tres Ciudades, Mdina/Rabat, la costa y Gozo forman bloques distintos. Pretender visitarlos todos desde una única jornada de ida y vuelta puede generar demasiados traslados.",
      "Gozo merece considerarse como una estancia o un día largo según la duración total; Comino y las zonas de baño dependen especialmente del estado del mar y de la temporada.",
      "La conducción permite acceder a rincones difíciles de conectar, pero tráfico, aparcamiento y carreteras estrechas hacen que el ritmo sea distinto al de un mapa turístico.",
    ],
    experience: [
      "Malta combina historia mediterránea, ciudades fortificadas, templos, calas, buceo, gastronomía y vida marítima. La ventaja está en mezclar capas, no en recorrer playas una detrás de otra.",
      "Gozo puede ser especialmente útil para introducir paisaje y un ritmo algo más pausado frente a la densidad histórica de Valletta y Mdina.",
    ],
    season: [
      "Primavera y otoño suelen ser muy buenos para recorrer patrimonio y caminar; verano favorece mar y baño pero trae calor y mayor presión en los lugares más conocidos.",
      "El viento y el estado del mar pueden ser tan importantes como la temperatura para excursiones en barco y determinados planes de costa.",
    ],
    bases: [
      { title: "Valletta / entorno", description: "Excelente para historia, restaurantes y conexiones; muy práctica si el patrimonio es prioridad." },
      { title: "Mellieħa / norte", description: "Útil para combinar costa, ferris y zonas de baño sin depender siempre del centro histórico." },
      { title: "Gozo", description: "Interesante como noche adicional cuando quieres reducir ritmo y profundizar en la isla." },
    ],
    experiences: [
      { title: "Historia", description: "Valletta, Three Cities, Mdina y templos prehistóricos forman una capa histórica extraordinaria." },
      { title: "Mar", description: "Calas, navegación, snorkel y buceo necesitan revisar viento y estado del mar." },
      { title: "Gozo", description: "Paisaje, pueblos y ritmo más tranquilo aportan contraste frente a la Malta monumental." },
    ],
  },
  "gran-canaria": {
    name: "Gran Canaria",
    zones: [
      "Las Palmas, norte, centro montañoso y sur turístico pueden sentirse como destinos distintos. El error típico es dormir en el sur y calcular que todo lo demás queda cerca.",
      "Las carreteras de montaña cambian mucho los tiempos reales; un recorrido que parece pequeño en kilómetros puede ocupar una parte importante del día.",
      "Una combinación de base urbana y costa, o una sola base bien situada con excursiones selectivas, suele tener más sentido que cambiar de hotel continuamente.",
    ],
    experience: [
      "Gran Canaria ofrece playa y resort, pero también barrios urbanos, pueblos, montaña, miradores, barrancos y gastronomía. El interior merece tiempo propio.",
      "El clima cambia mucho entre vertientes y altitud, así que conviene elegir qué zona visitar según la previsión del día.",
    ],
    season: [
      "El clima suave hace viable viajar durante gran parte del año, pero la experiencia de playa, senderismo y montaña cambia con nubosidad, viento y temperaturas en altura.",
      "En temporadas de mayor demanda conviene reservar actividades o alojamientos con suficiente margen, especialmente en zonas costeras populares.",
    ],
    bases: [
      { title: "Las Palmas", description: "Muy interesante para ciudad, gastronomía, barrios y playa urbana, con otra sensación de isla." },
      { title: "Sur", description: "Práctico para costa y descanso, pero exige asumir trayectos más largos hacia el interior." },
      { title: "Interior", description: "Adecuado para una escapada de paisaje y pueblos si la prioridad no es el baño diario." },
    ],
    experiences: [
      { title: "Ciudad y cultura", description: "Las Palmas añade vida urbana, barrios históricos, mercados y playa." },
      { title: "Montaña", description: "Miradores, pueblos y carreteras interiores construyen una cara completamente distinta de la isla." },
      { title: "Costa", description: "Playas y zonas de descanso pueden integrarse sin convertir cada día en una excursión de carretera." },
    ],
  },
  lanzarote: {
    name: "Lanzarote",
    zones: [
      "Lanzarote funciona muy bien por bloques: Timanfaya y el suroeste, Arrecife y centro, norte volcánico y Haría, y las zonas de costa y playas.",
      "La isla permite hacer muchas excursiones desde una sola base si aceptas conducir. La decisión depende más de la ubicación del alojamiento y del ritmo que de la necesidad de cambiar cada noche.",
      "Viento y calor modifican bastante la experiencia de playas, senderos y miradores; conviene consultar la previsión antes de fijar la actividad exterior principal.",
    ],
    experience: [
      "La arquitectura de César Manrique, los volcanes, Timanfaya, La Geria, el norte y las playas crean una identidad muy particular.",
      "Los centros de arte y paisaje funcionan mejor combinados con los paisajes que les dan contexto, en lugar de tratarlos como una lista independiente de museos.",
    ],
    season: [
      "Lanzarote es muy versátil durante el año, aunque viento, temperatura y demanda cambian. El invierno puede ser especialmente atractivo para escapar del frío europeo, mientras verano favorece más horas de luz.",
      "Para actividades exteriores, el viento puede ser más determinante que unos grados de diferencia en temperatura.",
    ],
    bases: [
      { title: "Puerto del Carmen", description: "Práctico para costa y servicios, con buena posición para explorar gran parte de la isla." },
      { title: "Costa Teguise", description: "Equilibrio entre playa, servicios y acceso relativamente cómodo al norte." },
      { title: "Norte / Haría", description: "Mejor encaje para un viaje más centrado en paisaje, pueblos y ritmo pausado." },
    ],
    experiences: [
      { title: "Volcanes", description: "Timanfaya y otros paisajes volcánicos son la estructura natural del viaje." },
      { title: "Manrique", description: "Jameos, Mirador del Río y otras intervenciones explican cómo arte y paisaje se integran en la isla." },
      { title: "Costa y pueblos", description: "Playas, pueblos pesqueros y La Geria añaden ritmo cuando no quieres pasar todo el día en coche." },
    ],
  },
  fuerteventura: {
    name: "Fuerteventura",
    zones: [
      "Corralejo y el norte, centro histórico, península de Jandía y costa occidental tienen perfiles muy diferentes y distancias que conviene respetar.",
      "La isla premia el coche, pero también exige aceptar carreteras largas y tramos donde la belleza está precisamente en el paisaje entre dos puntos.",
      "El viento es una variable de diseño: puede cambiar qué playa, deporte o excursión tiene sentido en un día concreto.",
    ],
    experience: [
      "Dunas, playas, volcanes, pueblos, faros y deportes de viento son las grandes capas. El viaje gana con tiempo de playa y conducción tranquila, no con una lista enorme de paradas.",
      "Cofete y algunas zonas remotas merecen plantearse como experiencias de día completo por tiempos de carretera y condiciones del terreno.",
    ],
    season: [
      "La isla puede visitarse todo el año, pero viento, oleaje y temperatura del agua cambian la experiencia. Para playa y deportes acuáticos conviene revisar condiciones cerca de la fecha.",
      "Los meses con más demanda pueden encarecer zonas costeras, mientras que épocas intermedias permiten un ritmo más relajado.",
    ],
    bases: [
      { title: "Corralejo", description: "Gran base para norte, dunas y excursiones a Lobos, con mucha oferta de servicios." },
      { title: "Caleta de Fuste", description: "Práctica para una estancia intermedia y conexiones por carretera." },
      { title: "Morro Jable / Jandía", description: "Adecuada para priorizar playas del sur y hacer del descanso una parte real del viaje." },
    ],
    experiences: [
      { title: "Playas y dunas", description: "Grandes espacios de arena y costa abierta donde el viento condiciona la experiencia." },
      { title: "Paisaje volcánico", description: "Carreteras interiores y miradores explican la geología de la isla mejor que una sucesión de playas." },
      { title: "Pueblos y gastronomía", description: "Betancuria y otros núcleos aportan contexto y ayudan a equilibrar los días de costa." },
    ],
  },
  "el-hierro": {
    name: "El Hierro",
    zones: [
      "El Hierro es una isla para conducir despacio. Valverde, Frontera, La Restinga y los miradores del norte y centro necesitan tiempo de carretera y no admiten una planificación basada solo en kilómetros.",
      "La Restinga tiene una identidad muy ligada al mar y al buceo; Frontera y el entorno de La Maceta permiten otro ritmo, mientras el interior concentra bosques, volcanes y miradores.",
      "Una sola base puede funcionar, pero una estancia más larga puede justificar dividir la experiencia para reducir conducción diaria.",
    ],
    experience: [
      "El atractivo está en la combinación de paisaje volcánico, costa, bosques, miradores, pueblos pequeños y actividades de naturaleza.",
      "El Hierro funciona mejor para quien disfruta de descubrir y parar que para quien necesita una gran lista de monumentos o mucha vida urbana.",
    ],
    season: [
      "El clima es suave, pero relieve, viento y nubosidad pueden cambiar la experiencia de un extremo de la isla a otro. Es importante revisar condiciones antes de las rutas exteriores.",
      "Para buceo y mar, la meteorología y el estado del océano pesan más que la temperatura media del día.",
    ],
    bases: [
      { title: "Frontera", description: "Buena base para explorar buena parte del norte y centro y acceder a diferentes paisajes." },
      { title: "La Restinga", description: "La opción natural cuando el mar y el buceo son una prioridad del viaje." },
      { title: "Valverde", description: "Interesante como punto de servicios y para equilibrar desplazamientos si la ruta es corta." },
    ],
    experiences: [
      { title: "Volcanes y miradores", description: "El paisaje es el gran patrimonio de la isla y merece conducción con margen." },
      { title: "Buceo y mar", description: "Una parte esencial del destino para quien prioriza naturaleza marina, condicionada por el estado del océano." },
      { title: "Bosques y pueblos", description: "La escala pequeña y la tranquilidad son parte de la experiencia y no deben rellenarse con actividades por obligación." },
    ],
  },
};

const makeSection = (
  id: string,
  title: string,
  category: GuideSection["category"],
  paragraphs: string[],
  highlights: Array<{ title: string; description: string; type: NonNullable<GuideSection["highlights"]>[number]["type"] }>,
): SectionOverride => ({
  id,
  title,
  category,
  paragraphs,
  highlights,
  status: "published",
  reviewedAt: REVIEWED_AT,
});

export const destinationDeepDiveOverrides: Record<string, SectionOverride[]> = Object.fromEntries(
  Object.entries(deepDive).map(([slug, value]) => [
    slug,
    [
      makeSection(
        "zonas-y-ritmo",
        `Cómo repartir ${value.name} sin correr`,
        "planning",
        value.zones,
        value.bases.map((item, index) => ({
          ...item,
          type: index === 0 ? "decision" : index === 1 ? "tip" : "important",
        })),
      ),
      makeSection(
        "cuando-ir",
        `Cuándo viajar a ${value.name} y qué cambia con la fecha`,
        "planning",
        value.season,
        [
          { title: "La temporada no decide por ti", description: value.season[0], type: "decision" },
          { title: "Mira condiciones concretas", description: value.season[1], type: "important" },
          { title: "Deja margen", description: "Cuanto más dependas de clima, mar, montaña o reservas con hora, más valor tiene poder mover una actividad sin romper el día.", type: "tip" },
        ],
      ),
      makeSection(
        "experiencias-que-merecen-espacio",
        `Qué merece realmente espacio en ${value.name}`,
        "experience",
        value.experience,
        value.experiences.map((item, index) => ({
          ...item,
          type: index === 0 ? "experience" : index === 1 ? "decision" : "tip",
        })),
      ),
    ],
  ]),
);
