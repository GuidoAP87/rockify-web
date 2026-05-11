const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000; // El servidor escuchará en el puerto 3000

// Configuración inicial
app.use(cors()); // Permite que el frontend se conecte
app.use(express.json());

// ==========================================
//  BASE DE DATOS (EN EL SERVIDOR)
// ==========================================
// --- BASE DE DATOS DE ARTISTAS (35 BANDAS) ---
const artistsData = [
    {
        id: 1,
        name: "Charly García",
        bio: "La banda sonora de la historia argentina. Genio del oído absoluto, Charly definió cada década: el folk con Sui Generis en los 70, el rock virtuoso con Serú Girán, la modernidad pop en los 80 y la vanguardia 'Say No More' en los 90. Su obra es un mapa del inconsciente colectivo nacional.",
        image: "img/Charly/charly.jpg",
        topSongs: ["Nos siguen pegando abajo", "Demoliendo hoteles", "Inconsciente colectivo"],
        discography: [
            { 
                title: "Yendo de la cama al living", 
                cover: "img/Charly/yendo.jpg", 
                year: 1982, 
                songs: [
                    "Yendo de la cama al living", "Superhéroes", "No bombardeen Buenos Aires", 
                    "Vos también estabas verde", "Yo no quiero volverme tan loco", "Canción de dos por tres", 
                    "Peluca telefónica", "Inconsciente colectivo"
                ] 
            },
            { 
                title: "Clics modernos", 
                cover: "img/Charly/clics.jpg", 
                year: 1983, 
                songs: [
                    "Nos siguen pegando abajo", "No soy un extraño", "Dos cero uno", 
                    "Nuevos trapos", "Bancate ese defecto", "No me dejan salir", 
                    "Los dinosaurios", "Plateado sobre plateado", "Ojos de video tape"
                ] 
            },
            { 
                title: "Piano Bar", 
                cover: "img/Charly/pianobar.jpg", 
                year: 1984, 
                songs: [
                    "Demoliendo hoteles", "Promesas sobre el bidet", "Raros peinados nuevos", 
                    "Piano bar", "No te animás a despegar", "No se va a llamar mi amor", 
                    "Tuve tu amor", "Rap del exilio", "Cerca de la revolución", "Total interferencia"
                ] 
            },
            { 
                title: "Parte de la religión", 
                cover: "img/Charly/parte.jpg", 
                year: 1987, 
                songs: [
                    "Necesito tu amor", "Buscando un símbolo de paz", "Parte de la religión", 
                    "Rap de las hormigas", "Adela en el carrousel", "No voy en tren", 
                    "Rezo por vos", "El karma de vivir al sur", "Ella adivinó", "La ruta del tentempié"
                ] 
            },
            { 
                title: "Cómo conseguir chicas", 
                cover: "img/Charly/conseguirchicas.jpg", 
                year: 1989, 
                songs: [
                    "No toquen", "Zocacola", "Fanky", "No me verás en el subte", 
                    "Ella es bailarina", "Anhedonia", "Suicida", "Fantasy", 
                    "A punto de caer", "Shala-lala"
                ] 
            },
            { 
                title: "Filosofía barata y zapatos de goma", 
                cover: "img/Charly/filosofia.jpg", 
                year: 1990, 
                songs: [
                    "De mí", "Filosofía barata y zapatos de goma", "Reloj de plastilina", 
                    "Gato de metal", "Curitas", "Sólo un poquito no más", 
                    "Siempre puedes olvidar", "La canción del indeciso", "Himno nacional argentino", 
                    "Me siento mucho mejor", "Juegos de seducción"
                ] 
            },
            { 
                title: "La hija de la lágrima", 
                cover: "img/Charly/lagrima.jpg", 
                year: 1994, 
                songs: [
                    "Overture", "Víctima", "Jaco y Chofi", "Atlántida", "La sal no sala", 
                    "Chibi", "Calle", "Love is love", "Tema de amor", "Pequeño amor", 
                    "Tu amor", "James Brown", "Intruder", "Workin'", "Kurosawa", "Chiquilín"
                ] 
            },
            { 
                title: "Say No More", 
                cover: "img/Charly/saynomore.jpg", 
                year: 1996, 
                songs: [
                    "Estaba en llamas cuando me acosté", "Vemos...", "Canciones de jirafas", 
                    "Necesito un gol", "Alguien en el mundo piensa en mí", "Constant Concept", 
                    "Say No More", "Cuchillos", "A1", "Plan 9", "Casa vacía", 
                    "Podrías entender", "Intuición", "La vanguardia es así"
                ] 
            },
            { 
                title: "El Aguante", 
                cover: "img/Charly/elaguante.jpg", 
                year: 1998, 
                songs: [
                    "El aguante", "Kill My Mother", "Pedro trabaja en el cine", 
                    "Dos edificios dorados", "Tu arma en el sur", "Mamá", 
                    "Correte Beethoven", "Boxeo", "Lo que ves es lo que hay", "Soldado de plomo"
                ] 
            },
            { 
                title: "Demasiado Ego (En Vivo)", 
                cover: "img/Charly/demasiadoego.jpg", 
                year: 1999, 
                songs: [
                    "Sarabande", "Cerca de la revolución (En vivo)", "Música de fondo... (En vivo)", 
                    "Los dinosaurios (En vivo)", "Canciones de jirafas (En vivo)", "Sweet Home Buenos Aires (En vivo)", 
                    "Pasajera en trance (En vivo)", "Kill My Mother (En vivo)", "El show de los muertos (En vivo)", 
                    "Chipi Chipi (En vivo)", "Hablando a tu corazón (En vivo)", "Alguien en el mundo piensa en mí (En vivo)"
                ] 
            },
            { 
                title: "Influencia", 
                cover: "img/Charly/influencia.jpg", 
                year: 2002, 
                songs: [
                    "Tu vicio", "I'm Not in Love", "Influencia", "Encuentro con el diablo", 
                    "El amor espera", "Película sordomuda", "Mi nena", "Be yourself", 
                    "Llorando en el espejo", "Happy and Real"
                ] 
            },
            { 
                title: "Rock and Roll YO", 
                cover: "img/Charly/rockandrollyo.jpg", 
                year: 2003, 
                songs: [
                    "Dileando con un alma", "Rehén", "Asesíname", "Linda bailarina", 
                    "Asesíname (Stone)", "VSD", "Tango", "Cretino", "Rock and Roll Yo", 
                    "Wonder", "Dealer (reprise)"
                ] 
            },
            { 
                title: "El Concierto Subacuático (En Vivo)", 
                cover: "img/Charly/subacuatico.jpg", 
                year: 2009, 
                songs: [
                    "El amor espera (En vivo)", "Rap del exilio (En vivo)", "Cerca de la revolución (En vivo)", 
                    "Chipi Chipi (En vivo)", "Fanky (En vivo)", "Demoliendo hoteles (En vivo)", 
                    "Promesas sobre el bidet (En vivo)", "Rezo por vos (En vivo)", "Yendo de la cama al living (En vivo)", 
                    "Canción de 2x3 (En vivo)", "Pecado mortal (En vivo)", "Influencia (En vivo)", 
                    "Llorando en el espejo (En vivo)", "Raros peinados nuevos (En vivo)", "Me siento mucho mejor (En vivo)", 
                    "No voy en tren (En vivo)", "No toquen (En vivo)", "No se va a llamar mi amor (En vivo)"
                ] 
            },
            { 
                title: "Kill Gil", 
                cover: "img/Charly/killgil.jpg", 
                year: 2010, 
                songs: [
                    "No importa", "King Kong", "Pasto", "Transformación", 
                    "Happy and Real", "Mirando las ruedas", "Break it up", 
                    "Los fantasmas", "Telepáticamente", "In the City", "Corazón de hormigón"
                ] 
            },
            { 
                title: "Random", 
                cover: "img/Charly/random.jpg", 
                year: 2017, 
                songs: [
                    "La máquina de ser feliz", "Ella es tan Kubrick", "Primavera", 
                    "Rivalidad", "Otro", "Lluvia", "Believe", 
                    "Amigos de Dios", "Spectro", "Mundo B"
                ] 
            },
            { 
                title: "La Lógica del Escorpión", 
                cover: "img/Charly/escorpion.jpg", 
                year: 2024, 
                songs: [
                    "Rompela", "Yo ya sé", "El Club de los 27", "La Medicina N°9", 
                    "Te recuerdo invierno", "Autobuses", "América", "Juan Represión", 
                    "Estrellas al caer", "La Pelícana y el Androide", "Watching the Wheels", 
                    "La Lógica del Escorpión", "Rock and Roll Star"
                ] 
            }
        ]
    },
    {
        id: 2,
        name: "Gustavo Cerati",
        bio: "El arquitecto del sonido. Gustavo Cerati fue el alquimista moderno que dotó al rock de una elegancia inédita. Desde la masividad de Soda Stereo hasta su sofisticada carrera solista, tejió puentes perfectos entre la vanguardia sónica, la electrónica y la sensibilidad popular. Su legado es una fuerza natural.",
        image: "img/Gustavo/cerati.jpg",
        topSongs: ["Crimen", "Puente", "Adiós"],
        discography: [
            { 
                title: "Colores Santos (con Melero)", 
                cover: "img/Gustavo/coloressantos.jpg", 
                year: 1992, 
                songs: [
                    "Vuelta por el universo", "Marea de Venus", "Cozumel", 
                    "Quarda la tosca", "Tu medicina", "Colores santos", 
                    "Hoy ya no soy yo", "La cuerda planetaria", "Madre Tierra", 
                    "Alborada", "Pudo ser"
                ] 
            },
            { 
                title: "Amor Amarillo", 
                cover: "img/Gustavo/amoramarillo.jpg", 
                year: 1993, 
                songs: [
                    "Amor amarillo", "Lisa", "Te llevo para que me lleves", 
                    "Pulsar", "Cabeza de medusa", "Av. Alcorta", 
                    "Bajan", "Rombos", "Ahora es nunca", "A merced", "Torture"
                ] 
            },
            { 
                title: "Bocanada", 
                cover: "img/Gustavo/bocanada.jpg", 
                year: 1999, 
                songs: [
                    "Tabú", "Engaña", "Bocanada", "Puente", "Río Babel", 
                    "Beautiful", "Perdonar es divino", "Verbo carne", "Raíz", 
                    "Y si el humo está en foco...", "Paseo inmoral", 
                    "Aquí & ahora (Los primeros tres minutos)", 
                    "Aquí & ahora (Y después)", "Alma", "Balsa"
                ] 
            },
            { 
                title: "11 Episodios Sinfónicos", 
                cover: "img/Gustavo/episodiossinfonicos.jpg", 
                year: 2001, 
                songs: [
                    "Canción animal", "Bocanada", "Corazón delator", 
                    "El rito", "A merced", "Raíz", "Sweet Sahumerio", 
                    "Persiana americana", "Verbo carne", "Un millón de años luz", 
                    "Signos"
                ] 
            },
            { 
                title: "Siempre es hoy", 
                cover: "img/Gustavo/siempreeshoy.jpg", 
                year: 2002, 
                songs: [
                    "Cosas imposibles", "No te creo", "Artefacto", "Nací para esto", 
                    "Amo dejarte así", "Tu cicatriz en mí", "Señales luminosas", 
                    "Karaoke", "Sulky", "Casa", "Camuflaje", "Altar", 
                    "Torre de marfil", "Fantasma", "Vivo", "Sudestada", "Especie"
                ] 
            },
            { 
                title: "Ahí vamos", 
                cover: "img/Gustavo/ahivamos.jpg", 
                year: 2006, 
                songs: [
                    "Al fin sucede", "La excepción", "Uno entre 1000", 
                    "Adiós", "Bomba de tiempo", "Caravana", "Jugo de luna", 
                    "Me quedo aquí", "Lago en el cielo", "Dios nos libre", 
                    "Otra piel", "Medium", "Crimen"
                ] 
            },
            { 
                title: "Fuerza Natural", 
                cover: "img/Gustavo/fuerzanatural.jpg", 
                year: 2009, 
                songs: [
                    "Fuerza natural", "Déjà vu", "Magia", "Amor sin rodeos", 
                    "Tracción a sangre", "Desastre", "Rapto", "Cactus", 
                    "Naturaleza muerta", "Dominó", "Sal", "Convoy", 
                    "He visto a Lucy", "# (Numeral)"
                ] 
            }
        ]
    },
    {
        id: 3,
        name: "Patricio Rey y sus Redonditos de Ricota",
        bio: "El pogo más grande del mundo. Mística, independencia y el fenómeno social más grande de la historia argentina. Liderados por el Indio Solari y Skay Beilinson, crearon una religión pagana que atravesó generaciones, pasando de los sótanos del under a llenar estadios sin publicidad oficial.",
        image: "img/Redondos/redondos.jpg",
        topSongs: ["Ji Ji Ji", "Juguetes perdidos", "Un poco de amor francés"],
        discography: [
            { 
                title: "Gulp!", 
                cover: "img/Redondos/gulp.jpg", 
                year: 1985, 
                songs: [
                    "Barbazul versus el amor letal", "La bestia pop", "Roto y mal parado", 
                    "Pierre el vitricida", "Unos pocos peligros sensatos", "Yo no me caí del cielo", 
                    "Te voy a atornillar", "Superlógico", "Ñam fri fruli fali fru", 
                    "El infierno está encantador esta noche", "Criminal mambo"
                ] 
            },
            { 
                title: "Oktubre", 
                cover: "img/Redondos/oktubre.jpg", 
                year: 1986, 
                songs: [
                    "Fuegos de Octubre", "Preso en mi ciudad", "Música para pastillas", 
                    "Semen-Up", "Divina TV Führer", "Motor psico", "Ji ji ji", 
                    "Canción para naufragios", "Ya nadie va a escuchar tu remera"
                ] 
            },
            { 
                title: "Un baión para el ojo idiota", 
                cover: "img/Redondos/ubaion.jpg", 
                year: 1988, 
                songs: [
                    "Masacre en el puticlub", "Noticias de ayer", "Aquella solitaria vaca cubana", 
                    "Todo preso es político", "Vencedores vencidos", "Vamos las bandas", 
                    "Ella debe estar tan linda", "Todo un palo"
                ] 
            },
            { 
                title: "¡Bang! ¡Bang! ... Estás liquidado", 
                cover: "img/Redondos/bangbang.jpg", 
                year: 1989, 
                songs: [
                    "Héroe del whisky", "Rock para los dientes", "La parabellum del buen psicópata", 
                    "Un pacman en el savoy", "Nadie es perfecto", "Esa estrella era mi lujo", 
                    "Maldición va a ser un día hermoso", "Ropa sucia", "Nuestro amo juega al esclavo"
                ] 
            },
            { 
                title: "La mosca y la sopa", 
                cover: "img/Redondos/lamosca.jpg", 
                year: 1991, 
                songs: [
                    "Toxi-taxi", "Fusilados por la cruz roja", "Un poco de amor francés", 
                    "Mi perro dinamita", "Blues de la artillería", "Tarea fina", 
                    "El pibe de los astilleros", "Nueva Roma", "Salando las heridas", "Queso ruso"
                ] 
            },
            { 
                title: "En Directo (En Vivo)", 
                cover: "img/Redondos/endirecto.jpg", 
                year: 1992, 
                songs: [
                    "Nuestro amo juega al esclavo (En vivo)", "Barbazul versus el amor letal (En vivo)", 
                    "Yo no me caí del cielo (En vivo)", "Héroe del whisky (En vivo)", 
                    "La parabellum del buen psicópata (En vivo)", "Maldición va a ser un día hermoso (En vivo)", 
                    "El blues del noticiero (En vivo)", "Todo un palo (En vivo)", 
                    "Unos pocos peligros sensatos (En vivo)", "Criminal mambo (En vivo)", 
                    "Rock para los dientes (En vivo)", "Vamos las bandas (En vivo)"
                ] 
            },
            { 
                title: "Lobo suelto (Vol. 1)", 
                cover: "img/Redondos/lobosuelto.jpg", 
                year: 1993, 
                songs: [
                    "Invocación", "Rock para el negro Atila", "Sorpresa de Shangai", 
                    "Shopping Disco-Zen", "Un ángel para tu soledad", "Buenas noticias", 
                    "Sushi", "Lavi-rap", "Gran Lady", "La hija del fletero", 
                    "El lobo caído", "Susanita"
                ] 
            },
            { 
                title: "Cordero atado (Vol. 2)", 
                cover: "img/Redondos/corderoatado.jpg", 
                year: 1993, 
                songs: [
                    "Yo caníbal", "Ladrón de mi cerebro", "¡Es la hora!", 
                    "Caña seca y un membrillo", "Soga de Caín", "Etiqueta negra", 
                    "Espejismo", "Botija rapado", "Perdiendo el tiempo"
                ] 
            },
            { 
                title: "Luzbelito", 
                cover: "img/Redondos/luzbelito.jpg", 
                year: 1996, 
                songs: [
                    "Luzbelito y las sirenas", "Cruz diablo!", "Ella baila con todos", 
                    "Fanfarria del cabrío", "Nuotatori professionisti", "Blues de la libertad", 
                    "La dicha no es una cosa alegre", "Me matan Limón!", "Rock Yugular", 
                    "Mariposa Pontiac - Rock del país", "Juguetes perdidos"
                ] 
            },
            { 
                title: "Último bondi a Finisterre", 
                cover: "img/Redondos/ultimobondi.jpg", 
                year: 1998, 
                songs: [
                    "Las increíbles andanzas del Capitán Buscapina", "Estás frito angelito", 
                    "El árbol del gran bonete", "Gualicho", "Pogo", "Alien Duce", 
                    "La pequeña novia del carioca", "Drogocop", "Scaramanzia", "Esto es to-to-todo amigos"
                ] 
            },
            { 
                title: "Momo Sampler", 
                cover: "img/Redondos/momosampler.jpg", 
                year: 2000, 
                songs: [
                    "Templo de Momo", "Morta punto com", "La murga de la virgencita", 
                    "Una piba con la remera de Greenpeace", "Pool, averna y papusa", 
                    "Murga de los renegados", "Dr. Saturno", "La marcha que resuena", 
                    "Sherarade", "Pensando como una acelga", "Rato molesto"
                ] 
            }
        ]
    },
    {
        id: 4,
        name: "Luis Alberto Spinetta",
        bio: "El Flaco. La figura más luminosa, compleja y respetada de nuestra música. Poeta, guitarrista y compositor que, a través de sus bandas eternas (Almendra, Pescado Rabioso, Invisible, Jade) y su carrera solista, definió la estética y la ética del rock nacional. Su obra es un jardín de gente.",
        image: "img/Spinetta/spinetta.jpg",
        topSongs: ["Bajan", "Seguir viviendo sin tu amor", "Muchacha ojos de papel"],
        discography: [
            { 
                title: "Almendra I", 
                cover: "img/Spinetta/almendra1.jpg", 
                year: 1969, 
                songs: [
                    "Muchacha (Ojos de papel)", "Color humano", "Figuración", "Ana no duerme", 
                    "Fermín", "Plegaria para un niño dormido", "A estos hombres tristes", 
                    "Que el viento borró tus manos", "Laura va"
                ] 
            },
            { 
                title: "Artaud", 
                cover: "img/Spinetta/artaud.jpg", 
                year: 1973, 
                songs: [
                    "Todas las hojas son del viento", "Cementerio Club", "Por", 
                    "Superchería", "La sed verdadera", "Cantata de puentes amarillos", 
                    "Bajan", "A Starosta, el idiota", "Las habladurías del mundo"
                ] 
            },
            { 
                title: "El jardín de los presentes (Invisible)", 
                cover: "img/Spinetta/jardin.jpg", 
                year: 1976, 
                songs: [
                    "El anillo del Capitán Beto", "Los libros de la buena memoria", "Alarma entre los ángeles", 
                    "Que ves el cielo", "Ruido de magia", "Doscientos años", 
                    "Perdonado (Niño condenado)", "Las golondrinas de Plaza de Mayo"
                ] 
            },
            { 
                title: "A 18' del sol", 
                cover: "img/Spinetta/18delsol.jpg", 
                year: 1977, 
                songs: [
                    "Viento del azur", "Telgopor", "Viejas mascarillas", 
                    "A 18' del sol", "Canción para los días de la vida", 
                    "Toda la vida tiene música hoy", "¿Dónde está el topacio?", "La eternidad imaginaria"
                ] 
            },
            { 
                title: "Kamikaze", 
                cover: "img/Spinetta/kamikaze.jpg", 
                year: 1982, 
                songs: [
                    "Kamikaze", "Ella también", "Águila de trueno I", "Águila de trueno II", 
                    "Almendra", "Barro tal vez", "Ah! basta de pensar", "La aventura de la abeja reina", 
                    "Y tu amor es una vieja medalla", "Quedándote o yéndote", "Casas marcadas"
                ] 
            },
            { 
                title: "Téster de violencia", 
                cover: "img/Spinetta/tester.jpg", 
                year: 1988, 
                songs: [
                    "Leves instrucciones", "Siempre en la pared", "Al ver verás", 
                    "La luz de la manzana", "Gritar", "Organismo en el aire", 
                    "Tres llaves", "El mono tremendo", "El marcapiel"
                ] 
            },
            { 
                title: "Pelusón of milk", 
                cover: "img/Spinetta/peluson.jpg", 
                year: 1991, 
                songs: [
                    "Seguir viviendo sin tu amor", "Lago de forma mía", "Ganges", 
                    "La montaña", "Panacea", "Domo tu", "Cada luz", 
                    "Bomba azul", "Cielo de ti", "Cruzarás", 
                    "Hombre de lata", "Pies de atril", "Jilguero", "Dime la forma", "Lago de forma mía"
                ] 
            },
            { 
                title: "Spinetta y los Socios del Desierto", 
                cover: "img/Spinetta/socios.jpg", 
                year: 1997, 
                songs: [
                    "Cheques", "Paraiso", "Los duendes", "Cuenta en el sol", 
                    "Diana", "Oh! Magnolia", "Luna de abril", "Se convirtió en la noche", 
                    "Tony", "Así nunca encontrarás el mar", "Cuentas de un collar", 
                    "Mi sueño de hoy", "Jardín de gente", "La orilla infinita"
                ] 
            },
            { 
                title: "Pan", 
                cover: "img/Spinetta/pan.jpg", 
                year: 2006, 
                songs: [
                    "Sinfín", "Bolsodios", "Canción de bajo", "Preconición", 
                    "Proserpina", "No te busques ya en el umbral", "Siniestro", 
                    "Cabecita calesita", "La flor de Santo Tomé", "Atado a tu frontera", 
                    "Qué hermosa estás", "Espuma mística"
                ] 
            },
            { 
                title: "Un mañana", 
                cover: "img/Spinetta/unmanana.jpg", 
                year: 2008, 
                songs: [
                    "La mendiga", "Vacío sideral", "No quiere decir", "Tu vuelo al fin", 
                    "Hiedra al sol", "Canción de amor para Olga", "Un mañana", 
                    "Mi elemento", "El enemigo", "Olvidar", "Despierta en la brisa", "Preso ventanilla"
                ] 
            }
        ]
    },
    {
        id: 5,
        name: "Los Piojos",
        bio: "El ritual. Nacidos en El Palomar, fusionaron rock, candombe, murga y tango. Liderados por Andrés Ciro Martínez, pasaron del under a llenar estadios (River, Boca) convirtiéndose en una de las bandas más convocantes y festivas de la historia del rock nacional.",
        image: "img/LosPiojos/lospiojos.jpg",
        topSongs: ["El Farolito", "Verano del 92", "Tan Solo"],
        discography: [
            { 
                title: "Chactuchac", 
                cover: "img/LosPiojos/chactuchac.jpg", 
                year: 1992, 
                songs: [
                    "Llevatelo", "Chac Tu Chac", "Yira - Yira", "Can-candombe", 
                    "Tan solo", "Cancheros", "Los mocosos", "A veces", 
                    "Blues del traje gris", "Pega-pega", "Siempre bajando", "Cruel"
                ] 
            },
            { 
                title: "Ay Ay Ay", 
                cover: "img/LosPiojos/ayayay.jpg", 
                year: 1994, 
                songs: [
                    "Arco", "Babilonia", "Ay ay ay", "Pistolas", 
                    "Angelito", "Manise", "Ximenita", "Ando ganas (Llora llora)", 
                    "Fumigator", "Muy despacito", "Es sentir", "Te diría", "Arco II"
                ] 
            },
            { 
                title: "3er Arco", 
                cover: "img/LosPiojos/3erarco.jpg", 
                year: 1996, 
                songs: [
                    "Esquina Libertad", "Taxi boy", "El farolito", "Shup - Shup", 
                    "Verano del 92", "Agua", "Todo pasa", "Intro Maradó", 
                    "Maradó", "Gris", "Muevelo", "Don't Say Tomorrow"
                ] 
            },
            { 
                title: "Azul", 
                cover: "img/LosPiojos/azul.jpg", 
                year: 1998, 
                songs: [
                    "Vals inicial", "El balneario de los doctores crotos", "Genius", 
                    "A ver cuándo", "Desde lejos no se ve", "Santo", "Agua (II)", 
                    "Buenos tiempos", "Go God", "Uoh Pa Pa Pa", "Quemado", 
                    "Murguita", "Adentro y afuera", "Finale"
                ] 
            },
            { 
                title: "Ritual (En Vivo)", 
                cover: "img/LosPiojos/ritual.jpg", 
                year: 1999, 
                songs: [
                    "Olvidate (ya ves)", "Chac tu chac", "Ay ay ay", "Arco", 
                    "Tan solo", "Labios de seda", "El balneario de los doctores crotos", 
                    "Ando ganas", "Pistolas", "El farolito", "Cruel", 
                    "It's Only Rock and Roll"
                ] 
            },
            { 
                title: "Verde paisaje del infierno", 
                cover: "img/LosPiojos/verdepaisaje.jpg", 
                year: 2000, 
                songs: [
                    "María y José", "Labios de seda", "Luz de marfil", "Vine hasta aquí", 
                    "Globalización", "Fijate", "Reggae rojo y negro", "Ruleta", 
                    "Morella", "La luna y la cabra", "Media caña", "Mi babilonia", 
                    "San Jauretche", "Pollo viejo"
                ] 
            },
            { 
                title: "Huracanes en luna plateada (En Vivo)", 
                cover: "img/LosPiojos/huracanes.jpg", 
                year: 2002, 
                songs: [
                    "María y José", "Babilonia", "Ximenita", "Taxi boy", 
                    "A ver cuándo", "Ruleta", "Morella", "El farolito", 
                    "Llevatelo", "Little Red Rooster", "Pensar en nada", "El rey del blues"
                ] 
            },
            { 
                title: "Máquina de sangre", 
                cover: "img/LosPiojos/maquina.jpg", 
                year: 2003, 
                songs: [
                    "Fantasma", "Guadalupe", "Como Alí", "Langostas", 
                    "Sudestada", "Motumbo", "Entrando en tu ciudad", "Amor de perros", 
                    "Solo y en paz", "Dientes de cordero", "Al desierto", 
                    "No parés", "Canción de cuna"
                ] 
            },
            { 
                title: "Fantasmas peleándole al viento (En Vivo)", 
                cover: "img/LosPiojos/fantasmas.jpg", 
                year: 2006, 
                songs: [
                    "Fantasma", "Babilonia", "Te diría", "Taxi boy", 
                    "Luz de marfil", "Pistolas", "Angelito", "Guadalupe", 
                    "Ruleta", "Media caña", "Motumbo", "Maradó"
                ] 
            },
            { 
                title: "Civilización", 
                cover: "img/LosPiojos/civilizacion.jpg", 
                year: 2007, 
                songs: [
                    "Manjar", "Pacífico", "Civilización", "Bicho de ciudad", 
                    "Pollo no quiero", "Cruces y flores", "Difícil", "Un buen día", 
                    "Basta de penas", "Unbekannt", "Salitral", "Hoy es hoy", "Buenos días Palomar"
                ] 
            }
        ]
    },
    {
        id: 6,
        name: "Intoxicados",
        bio: "La locura genial del Pity Álvarez. Tras la disolución de Viejas Locas, Pity rompió todos los moldes del 'rock chabón' mezclando rock con hip hop, reggae, funk y electrónica. Sus letras, entre lo cotidiano y lo surrealista, definieron la década del 2000.",
        image: "img/Intoxicados/intoxicados.jpg",
        topSongs: ["Fuego", "Nunca Quise", "Señor Kiosquero"],
        discography: [
            { 
                title: "¡¡Buen día!!", 
                cover: "img/Intoxicados/buendia.jpg", 
                year: 2001, 
                songs: [
                    "Prólogo", "Mi inteligencia intrapersonal", "Noche con amigos", 
                    "Como ganado", "Vacíos de fe", "Un gran camping", 
                    "Se fue al cielo", "Homenaje a los locos del Borda", "Viviendo con él", 
                    "Alegría", "Señor Kiosquero", "El rey", 
                    "Isondú", "Religión", "Yo no fui"
                ] 
            },
            { 
                title: "No es sólo rock and roll", 
                cover: "img/Intoxicados/noessolorock.jpg", 
                year: 2003, 
                songs: [
                    "Intro", "Está saliendo el sol", "No tengo ganas", 
                    "Departamento deshabitado", "Mi madre", "Felicidad, depresión", 
                    "Cantante", "Por un beso", "Una vela", 
                    "Espero que la vida", "Miu migñon", "De la guitarra", 
                    "Reggae para los amigos", "Despierta"
                ] 
            },
            { 
                title: "Otro día en el planeta Tierra", 
                cover: "img/Intoxicados/otrodia.jpg", 
                year: 2005, 
                songs: [
                    "Prólogo", "Niña de Tilcara", "Nunca quise", 
                    "Las cosas que no se tocan", "Fuiste lo mejor", "Una señal", 
                    "Te la vamos a dar", {title: "Fuego", file: "fuego.mp3"}, "Necesito", 
                    "Señor Cobranza", "Reggae para Mirta", "Transan", 
                    "Espero", "Duérmete niño"
                ] 
            },
            { 
                title: "El exilio de las especies (Thend)", 
                cover: "img/Intoxicados/elexilio.jpg", 
                year: 2008, 
                songs: [
                    "Comandante", "Noche de casamiento", "Pila pila", 
                    "Me vuelvo loco", "¿Quién soy?", "Un secreto", 
                    "Casi sin pensar", "Mayonesa", "Jaime Mastro", 
                    "Del mar", "África", "Himno a Bolaños", "La música"
                ] 
            },
            { 
                title: "Otra noche en la Luna (En Vivo)", 
                cover: "img/Intoxicados/otranoche.jpg", 
                year: 2020, 
                songs: [
                    "Intro (En vivo)", "Mi inteligencia intrapersonal (En vivo)", "Departamento deshabitado (En vivo)", 
                    "No tengo ganas (En vivo)", "Volver a casa (En vivo)", "Te la vamos a dar (En vivo)", 
                    "Fuego (En vivo)", "Las cosas que no se tocan (En vivo)", "Una vela (En vivo)", 
                    "Homenaje a los locos del Borda (En vivo)", "Señor Kiosquero (En vivo)", "Reggae para los amigos (En vivo)", 
                    "Está saliendo el sol (En vivo)", "Nunca quise (En vivo)", "Duérmete niño (En vivo)"
                ] 
            }
        ]
    },
    {
        id: 7,
        name: "Callejeros",
        bio: "La voz de una generación barrial. Con letras directas, saxos melancólicos y una lírica que reflejaba la realidad urbana, Callejeros se convirtió en el símbolo del rock barrial de los 2000. Sus canciones son himnos que quedaron marcados a fuego en la historia argentina.",
        image: "img/Callejeros/callejeros.jpg",
        topSongs: ["Una nueva noche fría", "Prohibido", "Imposible"],
        discography: [
            { 
                title: "Sed", 
                cover: "img/Callejeros/sed.jpg", 
                year: 2001, 
                songs: [
                    "Los invisibles", "Rompiendo espejos", "El nudo", "Milonga del rocanrol", 
                    "No somos nadie", "Vicioso, jugador y mujeriego", "Palo borracho", 
                    "Sonando", "La cuadra", "El ancla", "Armar de nuevo", "A callejear"
                ] 
            },
            { 
                title: "Presión", 
                cover: "img/Callejeros/presion.jpg", 
                year: 2003, 
                songs: [
                    "Otro viento mejor", "Presión", "Tres", "Una nueva noche fría", 
                    "Fantasía y realidad", "Morir", "Cristal", "Imposible", 
                    "Callejeros de Boedo", "Si me cansé", "Ahogados de razón", 
                    "Tiempo de estar", "El duende", "El equilibrista"
                ] 
            },
            { 
                title: "Rocanroles sin destino", 
                cover: "img/Callejeros/rocanroles.jpg", 
                year: 2004, 
                songs: [
                    "Distinto", "Sé que no sé", "Sería una pena", "Algo peor, algo mejor", 
                    "Rebelde, agitable y rocanrol", "Prohibido", "Tan perfecto que asusta", 
                    "Tratando de olvidar", "Rocanroles sin destino", "La llave", 
                    "Parte menor", "Canciones y almas", "Todo eso"
                ] 
            },
            { 
                title: "Obras 2004 en Directo (En Vivo)", 
                cover: "img/Callejeros/obras2004.jpg", 
                year: 2004, 
                songs: [
                    "El nudo (En vivo)", "Rompiendo espejos (En vivo)", "Una nueva noche fría (En vivo)", 
                    "Presión (En vivo)", "Tratando de olvidar (En vivo)", "Si me cansé (En vivo)", 
                    "Vicioso (En vivo)", "Imposible (En vivo)", "Callejeros de Boedo (En vivo)", 
                    "Rocanroles sin destino (En vivo)", "Prohibido (En vivo)", "Tan perfecto que asusta (En vivo)"
                ] 
            },
            { 
                title: "Señales", 
                cover: "img/Callejeros/senales.jpg", 
                year: 2006, 
                songs: [
                    "Daños", "Puede", "Límites", "Creo", "Frente al río", 
                    "Sin paciencia", "Día a día", "Sueño", "Hoy", 
                    "9 de Julio", "Señales", "Quedó"
                ] 
            },
            { 
                title: "Disco Escultura", 
                cover: "img/Callejeros/discoescultura.jpg", 
                year: 2008, 
                songs: [
                    "Guiños", "El espejo", "La canción", "Rehén", 
                    "Esa invisible línea", "Mas allá", "Quedar", 
                    "Siempre un poco más", "El ignorante", "Lo que hay", 
                    "Canción de cuna para Julieta", "Dirección", "Pomelo"
                ] 
            }
        ]
    },
    {
        id: 8,
        name: "Las Pastillas del Abuelo",
        bio: "Rock, fusión y letras narrativas. Liderados por Piti Fernández, trajeron una nueva poética al rock de los 2000, mezclando rock barrial con reggae, candombe, chacarera y jazz. Sus canciones son crónicas urbanas que, desde 'El Sensei', marcaron a una generación entera.",
        image: "img/Pastillas/pastillas.jpg",
        topSongs: ["El Sensei", "Princesa", "Qué es Dios?"],
        discography: [
            { 
                title: "Por Colectora", 
                cover: "img/Pastillas/porcolectora.jpg", 
                year: 2005, 
                songs: [
                    "José", "Solo Dios", "Peldaño", "Saber cuando parar", 
                    "Cubano", "Skalipso", "Cerveza", "Oscarcito", 
                    "Perdido", "Lo + Fino", "La Casada", "Resulta imposible", "El Sensei"
                ] 
            },
            { 
                title: "Las Pastillas del Abuelo", 
                cover: "img/Pastillas/homonimo.jpg", 
                year: 2006, 
                songs: [
                    "Intemperie", "Ojos de dragón", "La casada", "Princesa", 
                    "Tantas escaleras", "Cerveza", "Por colectora", 
                    "Amar y envejecer", "Contra viento y marea", "Oscarcito", 
                    "Resulta imposible", "Envuelto en soledad"
                ] 
            },
            { 
                title: "Crisis", 
                cover: "img/Pastillas/crisis.jpg", 
                year: 2008, 
                songs: [
                    "¿De dónde vengo?", "¿Hacia dónde voy?", "¿Casualidad o causalidad?", 
                    "¿Qué carajo es el amor?", "¿Quiero tener razón o ser feliz?", 
                    "¿Qué vicios tengo?", "¿Dónde esconder tantas manos?", 
                    "¿Cómo pudo entrar en mí?", "¿Viviré a conciencia esta lección?", 
                    "¿Qué es Dios?", "¿Qué hago yo esperando un puto As?", 
                    "¿Me juego el corazón?", "¿Qué pretendo no saber?", "Duda", "Maldito y cortamambo"
                ] 
            },
            { 
                title: "Desafíos", 
                cover: "img/Pastillas/desafios.jpg", 
                year: 2011, 
                songs: [
                    "Cambios de tiempo", "Viejo karma", "Leer y escribir", 
                    "Lo que no se ve", "Fuerza, locura y libertad", "Loco, no discrimines", 
                    "La experiencia", "Viles medios", "El fondo de tu vida", 
                    "Gobiernos procaces", "Ojos de dragón", "Diosa de la transformación", 
                    "Hasta acá nos ayudó Dios"
                ] 
            },
            { 
                title: "El Barrio en sus Puños", 
                cover: "img/Pastillas/elbarrio.jpg", 
                year: 2014, 
                songs: [
                    "Nació Bonavena", "El barrio", "Los 60", "La hazaña", 
                    "El héroe", "La pasión", "La pasión (2da parte)", 
                    "Las paces", "Enseñanzas", "Último round", 
                    "Crónicas del domingo", "Siempre llegando"
                ] 
            },
            { 
                title: "Paradojas", 
                cover: "img/Pastillas/paradojas.jpg", 
                year: 2015, 
                songs: [
                    "Absolutismos", "Rompecabezas de amor", "Inercia", 
                    "Ansiedad", "La creatividad", "Lo que tenga que ser", 
                    "Ella dice", "Permiso y prometo", "Milagroso eslabón", 
                    "Gigantes", "Artesano", "Saber hacer"
                ] 
            },
            { 
                title: "Vivo de Pastillas: Locura y Realidad (En Vivo)", 
                cover: "img/Pastillas/vivo.jpg", 
                year: 2017, 
                songs: [
                    "Rompecabezas de amor (En vivo)", "Saber hacer (En vivo)", 
                    "Viejo karma (En vivo)", "Absolutismos (En vivo)", 
                    "Permiso y prometo (En vivo)", "Diosa de la transformación (En vivo)", 
                    "El Cowboy (En vivo)", "Ojos de dragón (En vivo)", 
                    "Inercia (En vivo)", "Lo que tenga que ser (En vivo)", 
                    "Gigantes (En vivo)", "Vuelta de tuerca (En vivo)"
                ] 
            },
            { 
                title: "2020", 
                cover: "img/Pastillas/2020.jpg", 
                year: 2020, 
                songs: [
                    "Interpretación", "Rocanrol N'N'N'", "Azúcar impalpable", 
                    "El encanto del flagelo", "Neblina", "Dos ángeles", 
                    "El favor", "Incontinencia verbal", "Más lejos", "Veinte"
                ] 
            }
        ]
    },
    {
        id: 9,
        name: "Divididos",
        bio: "La Aplanadora del Rock. Tras la muerte de Luca Prodan y el fin de Sumo, Ricardo Mollo y Diego Arnedo formaron este power trío que fusionó la potencia de Hendrix con el folklore argentino. Son la banda con el sonido más demoledor del país.",
        image: "img/Divididos/divididos.jpg",
        topSongs: ["Ala Delta", "Spaghetti del Rock", "Par mil"],
        discography: [
            { 
                title: "40 dibujos ahí en el piso", 
                cover: "img/Divididos/40dibujos.jpg", 
                year: 1989, 
                songs: [
                    "Camarón bombay", "Che, qué esperás?", "La mosca porteña", 
                    "Haciendo cosas raras", "Los sueños y las guerras", "Gárgara larga", 
                    "Camus", "Sisters", "Light My Fire", "¿De qué diario sos?", 
                    "Un montón de huesos", "Camarón bombay (Reprise)"
                ] 
            },
            { 
                title: "Acariciando lo áspero", 
                cover: "img/Divididos/acariciando.jpg", 
                year: 1991, 
                songs: [
                    "El 38", "Sábado", "Cuadros de mí", "Azulejo", 
                    "El burro", "Haciendo cola para nacer", "Cielito lindo", 
                    "Qué tal?", "Ala delta", "Voodoo Child", "Paraguay", 
                    "Besos de porcellana", "Huelga de amores"
                ] 
            },
            { 
                title: "La era de la boludez", 
                cover: "img/Divididos/laera.jpg", 
                year: 1993, 
                songs: [
                    "Salir a asustar", "Ortega y Gases", "El arriero", "Salir a comprar", 
                    "Qué ves?", "Pestaña de camello", "Rasputín", "Dame un limón", 
                    "Paisano de Hurlingham", "Cristófolo Cacarnú", "Indio deja el mezcal", 
                    "Huelga de amores", "Tajo C", "Pee Dee"
                ] 
            },
            { 
                title: "Otroletravaladna", 
                cover: "img/Divididos/otroletra.jpg", 
                year: 1995, 
                songs: [
                    "Tomando mate en la paz", "Volver ni a palos", "Basta fuerte", 
                    "15-5", "Cajita musical", "Andá a lavartelos", "Miente el after hour", 
                    "Hace que hace", "Por el aire", "Abajo solo"
                ] 
            },
            { 
                title: "Gol de mujer", 
                cover: "img/Divididos/goldemujer.jpg", 
                year: 1998, 
                songs: [
                    "Alma de budín", "Nene de antes", "Luca", "Clavador de querubín", 
                    "Sobrio a las piñas", "Amor japonés", "Elefantes en Europa", 
                    "Zombie", "Vientito del tucumán", "Gol de mujer", "Basta de penas", 
                    "Salgan al sol", "Niño hereje", "Zombie", "Cosas de baboon"
                ] 
            },
            { 
                title: "Narigón del siglo", 
                cover: "img/Divididos/narigon.jpg", 
                year: 2000, 
                songs: [
                    "Casi estatua", "Par mil", "Tanto anteojo", "Como un cuento", 
                    "Spaghetti del rock", "Elefantes en Europa", "Vida de topo", 
                    "La firma del opa", "Sisters", "Sopa de tortuga", "Paswan", 
                    "Despiértate nena", "Mañana en el Abasto"
                ] 
            },
            { 
                title: "Vengo del placard de otro", 
                cover: "img/Divididos/placard.jpg", 
                year: 2002, 
                songs: [
                    "Cajita musical", "Ay, que Dios boludo", "Pepe Lui", "Mantecoso", 
                    "Libre el jabalí", "Vengo del placard de otro", "Casitas inundadas a votar", 
                    "Un alegre en este infierno", "Villancico del horror", "Guanuqueando", 
                    "Despiértate nena", "Abburgh", "Puertas"
                ] 
            },
            { 
                title: "Vivo acá (En Vivo)", 
                cover: "img/Divididos/vivoaca.jpg", 
                year: 2003, 
                songs: [
                    "Villancico del horror", "Casitas inundadas a votar", "Ay, que Dios boludo", 
                    "15-5", "Sisters", "Spaghetti del rock", "Pepe Lui", "Mantecoso", 
                    "Nene de antes", "Vengo del placard de otro", "Par mil", "Tanto anteojo", 
                    "Cajita musical", "Ala delta", "Mañana en el Abasto", "El arriero"
                ] 
            },
            { 
                title: "Amapola del 66", 
                cover: "img/Divididos/amapola.jpg", 
                year: 2010, 
                songs: [
                    "Hombre en U", "Buscando un ángel", "Mantecoso", "Muerto a laburar", 
                    "Amapola del 66", "La flor azul", "Senderos", "Jujuy", 
                    "Cristófolo Cacarnú", "Boyar nocturno", "Avanzando retroceden", 
                    "Perro funk", "Todos"
                ] 
            }
        ]
    },
    {
        id: 10,
        name: "Babasónicos",
        bio: "Iconos del rock sónico. Liderados por Adrián Dárgelos, pasaron de la movida sónica de los 90 a conquistar el mainstream con provocación, glamour y una reinvención constante. Son los maestros de la canción pop rock incorrecta y seductora.",
        image: "img/Babasonicos/babasonicos.jpg",
        topSongs: ["Irresponsables", "Putita", "El Colmo"],
        discography: [
            { 
                title: "Pasto", 
                cover: "img/Babasonicos/pasto.jpg", 
                year: 1992, 
                songs: [
                    "Intro", "D-Generación", "Tripeando", "41' de Ocio", 
                    "Sobre la Hierba", "Chicos en el Pasto", "Canción de la Bandera", 
                    "La Era del Amor", "Natural", "Mutha Fucka", "Somos la Pelota", 
                    "Guarda D.P!", "Bien", "Indios", "Margaritas"
                ] 
            },
            { 
                title: "Trance Zomba", 
                cover: "img/Babasonicos/trancezomba.jpg", 
                year: 1994, 
                songs: [
                    "Desarmate", "Malón", "Montañas de Agua", "Coralcaraza", 
                    "Ascendiendo", "Patinador Sagrado", "Koyote", "Poder Ñandú", 
                    "Árbol Palmera", "Sheeba Baby", "Posa de las Ánimas"
                ] 
            },
            { 
                title: "Dopádromo", 
                cover: "img/Babasonicos/dopadromo.jpg", 
                year: 1996, 
                songs: [
                    "Zubrowka", "El Médium", "Cybernecia", "Safari Vicio", 
                    "Viva Satana", "Perfume Casino", "Calmado", "Coyarama", 
                    "Su Ciervo", "Gronchótica", "Tarde para el Final", "Indiscretos"
                ] 
            },
            { 
                title: "Babasónica", 
                cover: "img/Babasonicos/babasonica.jpg", 
                year: 1997, 
                songs: [
                    "Egocripta", "Seis Vírgenes Descalzas", "Demonomanía", "Sharon Tate", 
                    "Sábato", "El Adversario", "El Rito", "Esther Narcótica", 
                    "Convoy", "Pasta de Hablar", "Passionale", "Yoga", "La Sangre"
                ] 
            },
            { 
                title: "Miami", 
                cover: "img/Babasonicos/miami.jpg", 
                year: 1999, 
                songs: [
                    "4 AM", "Desfachatados", "El Ringo", "El Playboy", 
                    "Drag Dealer", "Gustavo Show", "Combustibles", "Charo", 
                    "Casualidad", "El Sumum", "Bardo de Estrellas", "Paraguayan Wings", 
                    "Valle de Valium", "Malviaje", "El Shopping", "Colgado", "Ronco"
                ] 
            },
            { 
                title: "Jessico", 
                cover: "img/Babasonicos/jessico.jpg", 
                year: 2001, 
                songs: [
                    "Los Calientes", "Fizz", "Deléctrico", "Soy Rock", 
                    "Pendejo", "El Loco", "La Fox", "Tóxica", 
                    "Yoli", "Rubí", "Camarín", "Atomicum"
                ] 
            },
            { 
                title: "Infame", 
                cover: "img/Babasonicos/infame.jpg", 
                year: 2003, 
                songs: [
                    "Irresponsables", "Risa", "Pobre duende", "Gratuito", 
                    "Putita", "Suturno", "Mareo", "Sin mi diablo", 
                    "Curtis", "Y qué?", "Estertor", "Fan de Scorpions", 
                    "Once", "Sin mi diablo"
                ] 
            },
            { 
                title: "Anoche", 
                cover: "img/Babasonicos/anoche.jpg", 
                year: 2005, 
                songs: [
                    "Así se habla", "Carismático", "Yegua", "Un flash", 
                    "Pobre", "Exámenes", "Muñeco", "Luces", 
                    "Capricho", "El colmo", "Ciegos", "Falsario", 
                    "Puesto", "Carismático"
                ] 
            },
            { 
                title: "Mucho", 
                cover: "img/Babasonicos/mucho.jpg", 
                year: 2008, 
                songs: [
                    "Yo anuncio", "Pijamas", "Escamas", "Cuello Rojo", 
                    "Como eran las cosas", "Microdancing", "Las demás", "Estoy rabioso", 
                    "Nosotros", "El ídolo"
                ] 
            },
            { 
                title: "A propósito", 
                cover: "img/Babasonicos/aproposito.jpg", 
                year: 2011, 
                songs: [
                    "Flora y Fauno", "Fiesta popular", "Tormento", "Deshoras", 
                    "Ideas", "En privado", "Muñeco de Haití", "El pupilo", 
                    "Barranca abajo", "Chisme de zorro"
                ] 
            },
            { 
                title: "Romantisísmico", 
                cover: "img/Babasonicos/romantisismico.jpg", 
                year: 2013, 
                songs: [
                    "La lanza", "Aduana de palabras", "El baile de Odín", "Run Run", 
                    "Los burócratas del amor", "Negrita", "Uso", "Humo", 
                    "Cilada", "Paisano", "Celofán", "Uno tres dos"
                ] 
            },
            { 
                title: "Impuesto de Fe (Desde Adentro - En Vivo)", 
                cover: "img/Babasonicos/impuestodefe.jpg", 
                year: 2016, 
                songs: [
                    "El colmo", "Irresponsables", "Yegua", "Puesto", 
                    "Putita", "Como eran las cosas", "El maestro", "Sin mi diablo", 
                    "Rubí", "Natural", "Muñeco", "Deléctrico", 
                    "Los calientes", "Y qué?", "Zubrowka", "Chisme de zorro"
                ] 
            },
            { 
                title: "Discutible", 
                cover: "img/Babasonicos/discutible.jpg", 
                year: 2018, 
                songs: [
                    "La Pregunta", "Ingrediente", "Bestia Pequeña", "Trans-Algo", 
                    "Cretino", "Orfeo", "Adiós en Pompeya", "Teóricos", 
                    "Un pálpito", "Partícula"
                ] 
            },
            { 
                title: "Trinchera", 
                cover: "img/Babasonicos/trinchera.jpg", 
                year: 2022, 
                songs: [
                    "Mimos son mimos", "Paradoja", "Bye Bye", "Viento y Marea", 
                    "Mentira Nórdica", "La izquierda de la noche", "Madera Ideológica", "Vacia", 
                    "Anubis", "Trinchera", "Capital Afectivo"
                ] 
            }
        ]
    },
    {
        id: 11,
        name: "Guasones",
        bio: "Rock platense, guitarras stones y sentimiento de ruta. Liderados por Facundo Soto, se convirtieron en clásicos del rock and roll nacional con canciones que son himnos de la noche y el desamor. Su sonido crudo y directo es marca registrada.",
        image: "img/Guasones/guasones.jpg",
        topSongs: ["Reyes de la noche", "Pasan las horas", "Como un lobo"],
        discography: [
            { 
                title: "Guasones", 
                cover: "img/Guasones/guasone.jpg", 
                year: 2000, 
                songs: [
                    "La flaca Pili y el negro Tomás", "Es triste", "Magdalena", "Hombre de La Plata", 
                    "Si supieras", "Descuida Ma', solo son ratas", "Caballo loco", 
                    "Una gata en Barrio Norte", "Hombre del sur", "Todos y yo no", 
                    "Tapado de dolor", "Un viento fuerte está soplando"
                ] 
            },
            { 
                title: "Con la casa en orden", 
                cover: "img/Guasones/lacasa.jpg", 
                year: 2001, 
                songs: [
                    "Con la casa en orden", "Soledad", "Desireé I", "Desireé II", 
                    "Josefina", "Bla bla bla", "El rey", "Lady Mary", 
                    "Shaila Show", "La Plata 6 AM", "Voy a gritar", "Trago amargo"
                ] 
            },
            { 
                title: "Como animales", 
                cover: "img/Guasones/comoanimales.jpg", 
                year: 2003, 
                songs: [
                    "Fuera de mi país", "Eso estaba bien", "Sueños son", "Estupendo día", 
                    "Es tarde", "Decime la verdad", "Amaneciendo", "Baila baila", 
                    "Me muero", "Todavía", "Estrellas", "A mi lado", "My love", "No quiero"
                ] 
            },
            { 
                title: "Toro Rojo", 
                cover: "img/Guasones/tororojo.jpg", 
                year: 2005, 
                songs: [
                    "Paranoia 26", "Reyes de la noche", "Flores negras", "Ruta 36", 
                    "Una noche más", "Toro rojo", "100 años", "Fiebre", 
                    "Dame", "Gracias", "Down", "Chica de ojos tristes"
                ] 
            },
            { 
                title: "El Rock de mi Vida (En Vivo)", 
                cover: "img/Guasones/elrockdemivida.jpg", 
                year: 2007, 
                songs: [
                    "Con la casa en orden (En vivo)", "Me muero (En vivo)", "Sueños son (En vivo)", 
                    "Estrellas (En vivo)", "100 años (En vivo)", "Gracias (En vivo)", 
                    "Reyes de la noche (En vivo)", "Josefina (En vivo)", "Todavía (En vivo)", 
                    "La flaca Pili y el negro Tomás (En vivo)", "A mi lado (En vivo)", "Down (En vivo)"
                ] 
            },
            { 
                title: "Esclavo", 
                cover: "img/Guasones/esclavo.jpg", 
                year: 2008, 
                songs: [
                    "Buenos Aires", "Mierda", "Brillar", "Farmacia", "Días", 
                    "Todas quieren rock", "Esclavo", "Hay momentos", "Pasan las horas", 
                    "Como un lobo", "Tiempos de cambiar", "Blues de la desolación"
                ] 
            },
            { 
                title: "Parque de Depresiones", 
                cover: "img/Guasones/parque.jpg", 
                year: 2011, 
                songs: [
                    "Me estás tratando mal", "Heaven or Hell", "Esperándote", "Esmeralda colombiana", 
                    "Ya estoy subiendo", "La mansión del terror", "Fui silbando", "No soy yo", 
                    "El forastero", "Bajo el cielo", "Camellos", "Perdón", "Funk"
                ] 
            },
            { 
                title: "Acústico Gran Rex (En Vivo)", 
                cover: "img/Guasones/granrex.jpg", 
                year: 2013, 
                songs: [
                    "A mi lado (Acústico)", "Fui silbando (Acústico)", "Estupendo día (Acústico)", 
                    "Pasan las horas (Acústico)", "Descuida Ma' (Acústico)", "Me muero (Acústico)", 
                    "Brillar (Acústico)", "Perdón (Acústico)", "100 años (Acústico)", 
                    "Ya estoy subiendo (Acústico)", "Me estás tratando mal (Acústico)", "Reyes de la noche (Acústico)"
                ] 
            },
            { 
                title: "Locales Calientes", 
                cover: "img/Guasones/locales.jpg", 
                year: 2014, 
                songs: [
                    "Pobre tipo", "Infierno blanco", "Locales calientes", "Tan distintos", 
                    "Mi última canción", "Una razón", "Extraña sensación", "La sangre de Dios", 
                    "Pequeños ojos", "Vos", "Dr. Tazo", "Necesito"
                ] 
            },
            { 
                title: "Hasta el Final", 
                cover: "img/Guasones/hastafinal.jpg", 
                year: 2017, 
                songs: [
                    "Nada que ganar", "Hasta el final", "Canción para un amigo", "HDP", 
                    "Del olvido", "Leila", "Escapar", "Espejo roto", 
                    "Ella sabe", "Volar", "Culebras", "Monsterland"
                ] 
            },
            { 
                title: "El Huracán, Vol. 9", 
                cover: "img/Guasones/elhuracan.jpg", 
                year: 2022, 
                songs: [
                    "El huracán", "Ni siquiera", "La libertad", "El tren", 
                    "Suerte", "La vida es así", "Si te vas", "El brillo de tus ojos", 
                    "Voy voy voy", "Aquellos días", "Del otro lado de la ciudad"
                ] 
            }
        ]
    },
    {
        id: 12,
        name: "Bersuit Vergarabat",
        bio: "La argentinidad al palo. Fusión de cumbia, murga, rock y cuarteto. Desde el under más bizarro en pijamas hasta llenar el estadio de River, Bersuit retrató como nadie las crisis y las fiestas de la sociedad argentina con letras ácidas y melodías populares.",
        image: "img/Bersuit/bersuit.jpg",
        topSongs: ["Sr. Cobranza", "Un pacto", "Mi caramelo"],
        discography: [
            { 
                title: "Y punto", 
                cover: "img/Bersuit/ypunto.jpg", 
                year: 1992, 
                songs: [
                    "El tiempo no para", "Diez mil", "Tuyú", "Hacha de dos filos", 
                    "La logia de los tios...", "Sistema alucinógeno", "Venganza de los muertos pobres", 
                    "Homenaje a los locos del Borda", "Como nada puedo hacer", "Diez mil (versión 2)"
                ] 
            },
            { 
                title: "Asquerosa alegría", 
                cover: "img/Bersuit/asquerosa.jpg", 
                year: 1993, 
                songs: [
                    "Fuera de acá", "Sin son", "Tu pastilla", "Clara", 
                    "Cha cha cha", "Ausencia de estribillo", "Los elefantitos", 
                    "Nepore'y (tu ausencia)", "Buena suerte", "Marilyn", 
                    "Pasajeros", "Vamos no llegamos"
                ] 
            },
            { 
                title: "Don Leopardo", 
                cover: "img/Bersuit/donleopardo.jpg", 
                year: 1996, 
                songs: [
                    "Espíritu de esta selva", "Bolero militar", "Yo no juego más", 
                    "Cajón 5 estrellas", "Madrugona", "Ojo de tiza", "Betinotti", 
                    "Querido Colomba", "Abrazo de gol", "Ruego", "La mujer perfecta", 
                    "Encapuchados", "En trance", "Mi caramelo"
                ] 
            },
            { 
                title: "Libertinaje", 
                cover: "img/Bersuit/libertinaje.jpg", 
                year: 1998, 
                songs: [
                    "Yo tomo", "A los tambores", "De onda", "Señor Cobranza", 
                    "Vuelos", "Gente de mierda", "Sincerebro", 
                    "Murguita del sur", "A marcanzos", "C.S.M.", 
                    "¿Qué pasó?", "Gente de mierda (Radio edit)"
                ] 
            },
            { 
                title: "Hijos del Culo", 
                cover: "img/Bersuit/hijosdelculo.jpg", 
                year: 2000, 
                songs: [
                    "El viejo de arriba", "La bolsa", "Desconexión sideral", 
                    "El gordo motoneta", "Negra murguera", "Toco y me voy", 
                    "La petisita culona", "Caroncha", "Carnaval de Brasil", 
                    "Ayer se cortó la luz", "Porteño de ley", "Canción de Juan", 
                    "Es importante", "Veneno de humanidad"
                ] 
            },
            { 
                title: "De la cabeza con Bersuit (En Vivo)", 
                cover: "img/Bersuit/delacabeza.jpg", 
                year: 2002, 
                songs: [
                    "De la cabeza", "El tiempo no para", "Diez mil", "Tuyú", 
                    "Vuelos", "Mi caramelo", "Un pacto", "Perro amor explota", 
                    "Murguita del sur", "Señor Cobranza", "La bolsa", "El viejo de arriba"
                ] 
            },
            { 
                title: "La Argentinidad al Palo", 
                cover: "img/Bersuit/laargentinidad.jpg", 
                year: 2004, 
                songs: [
                    "Coger no es amor", "La soledad", "Va por Chapultepec", 
                    "Convalecencia en Valencia", "El baile de la gambeta", "No seas parca", 
                    "Ades tiempo", "El viento trae una copla", "Alucinando al pepino", 
                    "La murguita de los bichos", "Porno star", "La argentinidad al palo"
                ] 
            },
            { 
                title: "Testosterona", 
                cover: "img/Bersuit/testosterona.jpg", 
                year: 2005, 
                songs: [
                    "Yo", "Me duele el festejómetro", "En la ribera", "Sencillamente", 
                    "O vas a misa...", "Esperando el impacto", "El guerrero", 
                    "Vamo' en la salud", "Madre hay una sola", "Andan yugando", 
                    "La flor de mis heridas", "Y el viento se va", "Incomodo"
                ] 
            },
            { 
                title: "?", 
                cover: "img/Bersuit/signo.jpg", 
                year: 2007, 
                songs: [
                    "Laten bolas", "De ahí soy yo", "Mi vida", "Ebrio de sinrazón", 
                    "Rebelión", "Humor linyera", "Siempre el mismo", "Luna hermosa", 
                    "El lechero", "No te olvides", "Diez mil"
                ] 
            },
            { 
                title: "La Revuelta", 
                cover: "img/Bersuit/larevuelta.jpg", 
                year: 2012, 
                songs: [
                    "Cambiar el alma", "No te olvides", "Así es", "Dios te salve", 
                    "Es sólo una parte", "La serpiente", "El motor", "Santa Cecilia", 
                    "En el muelle", "Cargamos", "Afónico", "La revuelta"
                ] 
            },
            { 
                title: "El baile interior", 
                cover: "img/Bersuit/elbaileinterior.jpg", 
                year: 2014, 
                songs: [
                    "Huayno 14", "Me voy", "Ahí va Chavela", "Cuatro vientos", 
                    "Para bailar", "Tilcara en carnaval", "La señora", "Ayer se cortó la luz", 
                    "El baile interior", "De tripas corazón", "La vida boba", "Para Luis"
                ] 
            },
            { 
                title: "La nube rosa", 
                cover: "img/Bersuit/lanuberosa.jpg", 
                year: 2016, 
                songs: [
                    "Aquí estamos", "Cárcel, hospital o muerte", "Por si pasa", 
                    "Que hable de vos", "Como decirte", "El taparrollos", 
                    "Corazón de tiza", "La máquina de impedir", "La nube rosa", 
                    "No vengan", "Apunado", "Sentir", "Obstinato"
                ] 
            },
             { 
                title: "De la cabeza 2 (En Vivo)", 
                cover: "img/Bersuit/delacabeza2.jpg", 
                year: 2019, 
                songs: [
                    "La soledad (En vivo)", "Murguita del sur (En vivo)", "Toco y me voy (En vivo)", 
                    "El viejo de arriba (En vivo)", "Sencillamente (En vivo)", "Un pacto (En vivo)", 
                    "Sr. Cobranza (En vivo)", "Yo tomo (En vivo)", "La bolsa (En vivo)", 
                    "Mi caramelo (En vivo)", "Perro amor explota (En vivo)", "El tiempo no para (En vivo)"
                ] 
            }
        ]
    },
    {
        id: 13,
        name: "Soda Stereo",
        bio: "La banda más grande de Latinoamérica. Gustavo Cerati, Zeta Bosio y Charly Alberti no solo exportaron el rock en español, sino que definieron la modernidad, la estética y el sonido de todo un continente. Desde la new wave hasta el rock sónico, su legado es infinito.",
        image: "img/Soda/sodastereo.jpg",
        topSongs: ["De Música Ligera", "En la ciudad de la furia", "Persiana Americana"],
        discography: [
            { 
                title: "Soda Stereo", 
                cover: "img/Soda/soda1.jpg", 
                year: 1984, 
                songs: [
                    "¿Por qué no puedo ser del Jet-Set?", "Sobredosis de TV", "Te hacen falta vitaminas", 
                    "Trátame suavemente", "Dietético", "Tele-Ka", "Ni un segundo", 
                    "Un misil en mi placard", "El tiempo es dinero", "Afrodisíacos", "Mi novia tiene bíceps"
                ] 
            },
            { 
                title: "Nada Personal", 
                cover: "img/Soda/nadapersonal.jpg", 
                year: 1985, 
                songs: [
                    "Nada personal", "Si no fuera por...", "Cuando pase el temblor", 
                    "Danza rota", "El cuerpo del delito", "Juego de seducción", 
                    "Estoy azulado", "Observándonos", "Imágenes retro", "Ecos"
                ] 
            },
            { 
                title: "Signos", 
                cover: "img/Soda/signos.jpg", 
                year: 1986, 
                songs: [
                    "Sin sobredosis", "El rito", "Prófugos", "No existes", 
                    "Persiana americana", "En camino", "Signos", "Final caja negra"
                ] 
            },
            { 
                title: "Ruido Blanco (En Vivo)", 
                cover: "img/Soda/ruidoblanco.jpg", 
                year: 1987, 
                songs: [
                    "Signos (En vivo)", "Juego de seducción (En vivo)", "Persiana americana (En vivo)", 
                    "Sobredosis de TV (En vivo)", "Estoy azulado (En vivo)", "Final caja negra (En vivo)", 
                    "Cuando pase el temblor (En vivo)", "Vita-set (En vivo)", "Prófugos (En vivo)"
                ] 
            },
            { 
                title: "Doble Vida", 
                cover: "img/Soda/doblevida.jpg", 
                year: 1988, 
                songs: [
                    "Picnic en el 4º B", "En la ciudad de la furia", "Lo que sangra (La cúpula)", 
                    "En el borde", "Languis", "Día común - doble vida", 
                    "Corazón delator", "El ritmo de tus ojos", "Terapia de amor intensiva"
                ] 
            },
            { 
                title: "Canción Animal", 
                cover: "img/Soda/cancionanimal.jpg", 
                year: 1990, 
                songs: [
                    "(En) El séptimo día", "Un millón de años luz", "Canción animal", 
                    "1990", "Sueles dejarme solo", "De música ligera", 
                    "Hombre al agua", "Entre caníbales", "Té para tres", "Cae el sol"
                ] 
            },
            { 
                title: "Dynamo", 
                cover: "img/Soda/dynamo.jpg", 
                year: 1992, 
                songs: [
                    "Secuencia inicial", "Toma la ruta", "En remolinos", "Primavera 0", 
                    "Camaleón", "Luna roja", "Sweet sahumerio", "Ameba", 
                    "Nuestra fe", "Fue", "Claroscuro", "Texturas"
                ] 
            },
            { 
                title: "Sueño Stereo", 
                cover: "img/Soda/suenostereo.jpg", 
                year: 1995, 
                songs: [
                    "Ella usó mi cabeza como un revólver", "Disco eterno", "Zoom", 
                    "Ojo de la tormenta", "Efecto doppler", "Paseando por Roma", 
                    "Pasos", "Ángel eléctrico", "Crema de estrellas", 
                    "Planta", "X-Playo", "Moirè"
                ] 
            },
            { 
                title: "Comfort y Música Para Volar (MTV Unplugged)", 
                cover: "img/Soda/comfort.jpg", 
                year: 1996, 
                songs: [
                    "En la ciudad de la furia (Unplugged)", "Un misil en mi placard (Unplugged)", "Pasos (Unplugged)", 
                    "Entre caníbales (Unplugged)", "Té para tres (Unplugged)", "Ángel eléctrico (Unplugged)", 
                    "Ella usó mi cabeza como un revólver (Unplugged)", "Sonoman", "Planeador", "Coral", "Superstar"
                ] 
            },
            { 
                title: "El Último Concierto (En Vivo)", 
                cover: "img/Soda/elultimo.jpg", 
                year: 1997, 
                songs: [
                    "En la ciudad de la furia (En vivo)", "El rito (En vivo)", "Hombre al agua (En vivo)", 
                    "En el séptimo día (En vivo)", "Canción animal (En vivo)", "Juego de seducción (En vivo)", 
                    "Corazón delator (En vivo)", "Lo que sangra (La cúpula) (En vivo)", "Signos (En vivo)", 
                    "Zoom (En vivo)", "Ella usó mi cabeza como un revólver (En vivo)", "De música ligera (En vivo)"
                ] 
            },
            { 
                title: "Me Verás Volver (En Vivo)", 
                cover: "img/Soda/meverasvolver.jpg", 
                year: 2007, 
                songs: [
                    "Juegos de seducción (2007)", "Tele-Ka (2007)", "Imágenes retro (2007)", 
                    "Texturas (2007)", "Hombre al agua (2007)", "En la ciudad de la furia (2007)", 
                    "Picnic en el 4º B (2007)", "Zoom (2007)", "Cuando pase el temblor (2007)", 
                    "Signos (2007)", "Prófugos (2007)", "Nada personal (2007)"
                ] 
            }
        ]
    },
    {
        id: 14,
        name: "Serú Girán",
        bio: "Los Beatles Argentinos. Charly García, David Lebón, Pedro Aznar y Oscar Moro formaron el supergrupo definitivo. Virtuosismo técnico, lírica profunda y resistencia cultural en los años más oscuros del país. Su legado es sinónimo de perfección musical.",
        image: "img/SeruGiran/serugiran.jpg",
        topSongs: ["Seminare", "Viernes 3 AM", "Eiti Leda"],
        discography: [
            { 
                title: "Serú Girán", 
                cover: "img/SeruGiran/serugiran1.jpg", 
                year: 1978, 
                songs: [
                    "Eiti Leda", "El mendigo en el andén", "Separata", 
                    "Autos, jets, aviones, barcos", "Serú Girán", 
                    "Seminare", "Voy a mil", "Cosmigonón"
                ] 
            },
            { 
                title: "La Grasa de las Capitales", 
                cover: "img/SeruGiran/lagrasa.jpg", 
                year: 1979, 
                songs: [
                    "La grasa de las capitales", "San Francisco y el lobo", "Perro andaluz", 
                    "Frecuencia modulada", "Viernes 3 AM", "Noche de perros", 
                    "Los sobrevivientes", "Paranoia y soledad", "Canción de Hollywood"
                ] 
            },
            { 
                title: "Bicicleta", 
                cover: "img/SeruGiran/bicicleta.jpg", 
                year: 1980, 
                songs: [
                    "A los jóvenes de ayer", "Cuánto tiempo más llevará", "Canción de Alicia en el país", 
                    "La luna de marzo", "Mientras miro las nuevas olas", "Desarma y sangra", 
                    "Tema de Nayla", "Encuentro con el diablo"
                ] 
            },
            { 
                title: "Peperina", 
                cover: "img/SeruGiran/peperina.jpg", 
                year: 1981, 
                songs: [
                    "Peperina", "Llorando en el espejo", "Parado en el medio de la vida", 
                    "Cara de velocidad", "Esperando nacer", "Veinte trajes verdes", 
                    "Cinema Verité", "En la vereda del sol", "José Mercado", 
                    "Lo que dice la lluvia", "Salir de la melancolía"
                ] 
            },
            { 
                title: "No llores por mí, Argentina (En Vivo)", 
                cover: "img/SeruGiran/nollores.jpg", 
                year: 1982, 
                songs: [
                    "No llores por mí, Argentina", "En la vereda del sol", "Salir de la melancolía", 
                    "Popotitos", "Esperando nacer", "Canción de Alicia en el país", 
                    "Cuánto tiempo más llevará", "Seminare", "Eiti Leda"
                ] 
            },
            { 
                title: "Serú '92", 
                cover: "img/SeruGiran/seru92.jpg", 
                year: 1992, 
                songs: [
                    "Queen Elizabeth", "Mundo agradable", "No puedo dejar", 
                    "Ese tren", "A cada hombre, a cada mujer", "Hundiendo el Titanic", 
                    "Transformación", "Déjame entrar", "Nos veremos otra vez", 
                    "Si me das tu amor", "Muévete al hablar"
                ] 
            }
        ]
    },
    {
        id: 15,
        name: "La 25",
        bio: "Herederos del rock stone. Nacidos en Quilmes, La 25 levantó la bandera del rock and roll barrial cuando el género parecía apagarse. Con identidad de barrio, flequillos, zapatillas de lona y una fidelidad inquebrantable a los Rolling Stones, se convirtieron en la banda de culto del género.",
        image: "img/La25/la25.jpg",
        topSongs: ["Solo voy", "Chico Común", "Mil canciones"],
        discography: [
            { 
                title: "La Veinticinco Rock and Roll", 
                cover: "img/La25/la25rockandroll.jpg", 
                year: 2001, 
                songs: [
                    "Sucio sheriff", "Chico común", "Me da pena", "Roñoso y podrido", 
                    "Viajero", "La 25", "Hacelo de nuevo", "Mil canciones", 
                    "Pidan lo que quieran", "Farolito", "Dos velas", "Astilla"
                ] 
            },
            { 
                title: "Así es el rock and roll", 
                cover: "img/La25/asies.jpg", 
                year: 2002, 
                songs: [
                    "Así es el rock and roll", "Barrio viejo", "Como un extraño", 
                    "Mil melodías", "Dando vueltas", "Varias emociones", "La rockera", 
                    "Canción de barrios", "Vicios y rock and roll", "Desde el cielo", "25 horas"
                ] 
            },
            { 
                title: "Con el rock en las venas", 
                cover: "img/La25/conelrock.jpg", 
                year: 2004, 
                songs: [
                    "Huelo a soledad", "Dejame", "Solo dame un poco", "Hasta el final", 
                    "Nena", "Tarde de feria", "Que algo va a salir", "Todo sigue igual", 
                    "Pide por mí", "Vicio de tu alma", "Pontiac", "Salto de fe"
                ] 
            },
            { 
                title: "Ruta 25 (En Vivo)", 
                cover: "img/La25/ruta25.jpg", 
                year: 2005, 
                songs: [
                    "10", "Varias emociones (En vivo)", "Chico común (En vivo)", 
                    "Sucio Sheriff (En vivo)", "Todo sigue igual (En vivo)", "Nena (En vivo)", 
                    "Mil canciones (En vivo)", "Vicios y rock and roll (En vivo)", 
                    "Solo dame un poco (En vivo)", "Dejame (En vivo)", "Hasta el final (En vivo)", 
                    "Ruta 25"
                ] 
            },
            { 
                title: "Mundo Perfecto", 
                cover: "img/La25/mundoperfecto.jpg", 
                year: 2006, 
                songs: [
                    "Hasta la victoria siempre", "Solo voy", "Volver a casa", "Escombro", 
                    "Prisionero", "Dame damelo", "Andrajoso", "Primaverales", 
                    "Más que amigos", "Aquí te espero", "Mirmidones", "Sur"
                ] 
            },
            { 
                title: "Mundo Imperfecto", 
                cover: "img/La25/mundoimperfecto.jpg", 
                year: 2008, 
                songs: [
                    "Perfidia", "Antorchas", "Dame más", "El vecindario", 
                    "Buenos Aires", "La 25", "Solo esta noche", "No pares", 
                    "S.H.O.C.", "Antes de irme", "Rock and Roll hasta el amanecer"
                ] 
            },
            { 
                title: "S.H.O.C. (En Vivo)", 
                cover: "img/La25/shoc.jpg", 
                year: 2010, 
                songs: [
                    "25 horas (En vivo)", "Como un extraño (En vivo)", "Nena (En vivo)", 
                    "Antes de irme (En vivo)", "El vecindario (En vivo)", "Chico común (En vivo)", 
                    "Solo voy (En vivo)", "Mil canciones (En vivo)", "Hasta la victoria siempre (En vivo)", 
                    "S.H.O.C. (En vivo)", "Castillo de naipes"
                ] 
            },
            { 
                title: "El Origen", 
                cover: "img/La25/elorigen.jpg", 
                year: 2013, 
                songs: [
                    "No pares", "El origen", "Adicción", "Calles extrañas", 
                    "Me voy a ver", "Instinto animal", "Como el viento", "La mula", 
                    "Ciudad de Dios", "Las 24", "A la orden del día"
                ] 
            },
            { 
                title: "Vivo x La 25 (En Vivo)", 
                cover: "img/La25/vivoxla25.jpg", 
                year: 2016, 
                songs: [
                    "Adicción (En vivo)", "El origen (En vivo)", "La rockera (En vivo)", 
                    "Me voy a ver (En vivo)", "Antorchas (En vivo)", "Volver a casa (En vivo)", 
                    "Mil melodías (En vivo)", "Barrio viejo (En vivo)", "Cruz de sal (En vivo)", 
                    "No pares (En vivo)", "Solo voy (En vivo)"
                ] 
            },
            { 
                title: "Entre cuervos y chacales", 
                cover: "img/La25/entrecuervos.jpg", 
                year: 2018, 
                songs: [
                    "Marginados", "Libertad", "De paso", "Flores de estación", 
                    "Generación", "Olor a viejo", "Sol de mayo", "Gente extraña", 
                    "Esperame", "Lloran las rosas"
                ] 
            }
        ]
    },
    {
        id: 16,
        name: "Las Pelotas",
        bio: "La continuidad de Sumo con identidad propia. Tras la muerte de Luca, Germán Daffunchio y Alejandro Sokol formaron esta banda que supo mezclar reggae, rock y pop con una sensibilidad única. Son una de las bandas más queridas y respetadas de la escena nacional.",
        image: "img/LasPelotas/laspelotas.jpg",
        topSongs: ["Será", "Personalmente", "Si supieras"],
        discography: [
            { 
                title: "Corderos en la noche", 
                cover: "img/LasPelotas/corderos.jpg", 
                year: 1991, 
                songs: [
                    "Corderos en la noche", "La vaca y el bife", "Brilla (Shine)", "Sin hilo", 
                    "20 minutos", "Muchos mitos", "Nunca me des la espalda", 
                    "Levanta", "Bombachitas rosas", "Movete"
                ] 
            },
            { 
                title: "Máscaras de sal", 
                cover: "img/LasPelotas/mascaras.jpg", 
                year: 1994, 
                songs: [
                    "Captain", "Peces", "Escaleras", "Músculos", 
                    "Si supieras", "Sombra", "Ojos de buey", "Tucán", 
                    "Astroboy", "Boca de pez", "Sombras", "Solo"
                ] 
            },
            { 
                title: "Amor seco", 
                cover: "img/LasPelotas/amorseco.jpg", 
                year: 1995, 
                songs: [
                    "Hola, qué tal?", "Culpable", "El cazador", "Combate", 
                    "Se quema", "Grasa de chancho", "El ñandú", "Río gris", 
                    "Ella están", "Chupetrón", "Llamada"
                ] 
            },
            { 
                title: "La clave del éxito", 
                cover: "img/LasPelotas/laclave.jpg", 
                year: 1997, 
                songs: [
                    "Capitán América", "La cortina", "La clave del éxito", "Saben", 
                    "Si supieras (Nueva versión)", "Hola, qué tal? (Nueva versión)", "Hawaii", "Uva Uva"
                ] 
            },
            { 
                title: "¿Para qué?", 
                cover: "img/LasPelotas/paraque.jpg", 
                year: 1998, 
                songs: [
                    "Transparente", "¿Para qué?", "Saltando", "Me fui", 
                    "El peor", "El día después", "Pasillos", "Menos mal", 
                    "Sueños de mendigos", "El chupetón"
                ] 
            },
            { 
                title: "Todo por un polvo", 
                cover: "img/LasPelotas/todoporunpolvo.jpg", 
                year: 1999, 
                songs: [
                    "Video las pelotas", "Buscando", "El peor amor", "La mirada del amo", 
                    "El fantasma", "Viejas rameras", "Solito vas", "Generación @", 
                    "Gusanos", "No me acompañes", "Mañana es igual", "La marmota", "Aspirina"
                ] 
            },
            { 
                title: "Esperando el milagro", 
                cover: "img/LasPelotas/esperando.jpg", 
                year: 2003, 
                songs: [
                    "Será", "Mareada", "Tomás", "Desaparecido", 
                    "Día feliz", "Abejas", "Si sentís", "Tormenta en Júpiter", 
                    "Rey de los divinos", "Esperando el milagro", "Tiempo de matar", "La creciente"
                ] 
            },
            { 
                title: "Show (En Vivo)", 
                cover: "img/LasPelotas/show.jpg", 
                year: 2005, 
                songs: [
                    "Sombras (En vivo)", "Corderos en la noche (En vivo)", "Día feliz (En vivo)", 
                    "Bombachitas rosas (En vivo)", "Hola qué tal (En vivo)", "Uva uva (En vivo)", 
                    "Si supieras (En vivo)", "Será (En vivo)", "Sin hilo (En vivo)", 
                    "El ojo blindado (En vivo)", "Esperando el milagro (En vivo)"
                ] 
            },
            { 
                title: "Basta", 
                cover: "img/LasPelotas/basta.jpg", 
                year: 2007, 
                songs: [
                    "Basta", "Como se curan las heridas", "Siento luego existo", "Dicen que la distancia", 
                    "Partidos", "La brisa", "Buscando el cambio", "Ya no estás", 
                    "Donde se esconden", "Matrimonio", "Revolución", "Más que eso"
                ] 
            },
            { 
                title: "Despierta", 
                cover: "img/LasPelotas/despierta.jpg", 
                year: 2009, 
                songs: [
                    "Saben", "¿Qué podés dar?", "Pasajeros", "Nunca te jugaste", 
                    "Orden divina", "Personalmente", "Que estés sonriendo", "La semilla", 
                    "Destellos", "Menos mal (Versión 2)"
                ] 
            },
            { 
                title: "Cerca de las nubes", 
                cover: "img/LasPelotas/cerca.jpg", 
                year: 2012, 
                songs: [
                    "Cerca de las nubes", "Escondido bajo el brazo", "Siempre estará", "Cuantos más", 
                    "La cuerda", "Más de todo", "Quieren más", "Las voces", 
                    "A veces", "Tanto tiempo", "La distancia", "Eso que pasó"
                ] 
            },
            { 
                title: "Brindando por nada", 
                cover: "img/LasPelotas/brindando.jpg", 
                year: 2016, 
                songs: [
                    "Algún día", "Víctimas del cielo", "Era", "Como una estrella", 
                    "Dime", "Se puede", "Brindando por nada", "Nada es real", 
                    "Quizás no pueda", "El amor hace falta"
                ] 
            },
            { 
                title: "Es así", 
                cover: "img/LasPelotas/esasi.jpg", 
                year: 2020, 
                songs: [
                    "Es así", "Hasta que el sol", "Mirá", "Ya lo sabés", 
                    "Dando vueltas", "Nadie fue", "Si sentir", "Veo", 
                    "Al final", "Sol"
                ] 
            }
        ]
    },
    {
        id: 17,
        name: "Viejas Locas",
        bio: "El origen de todo. Antes de Intoxicados, Pity Álvarez definió el sonido del 'Rock Stone' argentino de los 90 desde el barrio de Piedrabuena. Con letras crudas sobre la vida en los monoblocks, la amistad y los excesos, Viejas Locas se convirtió en una banda de culto que marcó a fuego a toda una generación.",
        image: "img/ViejasLocas/viejaslocas.jpg",
        topSongs: ["Me gustas mucho", "Todo sigue igual", "Homero"],
        discography: [
            { 
                title: "Viejas Locas", 
                cover: "img/ViejasLocas/viejaslocas.jpg", 
                year: 1995, 
                songs: [
                    "Intoxicado", "Nena me gustas así", "Lo artesanal", "Te empezás a chorrear", 
                    "Tirado en la estación", "Hermanos de sangre", "Sacátelo", "Eva", 
                    "La simpática demonia", "Botella", "Si las cosas salen mal", "Puente La Noria"
                ] 
            },
            { 
                title: "Hermanos de Sangre", 
                cover: "img/ViejasLocas/hermanos.jpg", 
                year: 1997, 
                songs: [
                    "El chico de la oculta", "Perra", "Adrenalina", "Psicodélica", 
                    "Difícil de entender", "¿Qué vas a hacer tan sola hoy?", "Dos nenas", 
                    "Todo termina", "Caminando con las piedras", "Aunque a nadie ya le importe", 
                    "Dámelo", "Buenos tiempos", "Teté"
                ] 
            },
            { 
                title: "Especial", 
                cover: "img/ViejasLocas/especial.jpg", 
                year: 1999, 
                songs: [
                    "Noche de perros", "Homero", "Me gustas mucho", "Una vez más", 
                    "Todo sigue igual", "Excusas", "Sé que lo atraparé", "638...", 
                    "Niños", "Descansar en paz", "Una piba como vos", "El árbol de la vida", 
                    "Voy a dejarte", "Legalízenla"
                ] 
            },
            { 
                title: "Contra la pared", 
                cover: "img/ViejasLocas/contralapared.jpg", 
                year: 2011, 
                songs: [
                    "Contra la pared", "Ella no me quiere creer", "Roca & Giro", 
                    "Bailando en el infierno", "Perdóname mi amor", "Tirado y buenrolla", 
                    "La perla", "Pasión", "Un frasco vacío", "No me pienso levantar", 
                    "Viaje de ida", "Perro guardián", "En problemas"
                ] 
            }
        ]
    },
    {
        id: 18,
        name: "Ciro y los Persas",
        bio: "El Ritual continúa. Tras el parate de Los Piojos, Andrés Ciro Martínez formó Los Persas, demostrando que la mística seguía intacta. Llenando estadios como River y Vélez, Ciro mantuvo su lírica urbana y su rock con tintes de blues, funk y candombe.",
        image: "img/Ciro/ciroylospersas.jpg",
        topSongs: ["Mirenla", "Insisto", "Astros"],
        discography: [
            { 
                title: "Espejos", 
                cover: "img/Ciro/espejos.jpg", 
                year: 2010, 
                songs: [
                    "Antes y después", "Servidor", "Insisto", "Espejos", 
                    "Banda de garaje", "Vas a bailar", "Rockabilly para siempre", "Blues de la ventana", 
                    "Chucu - Chu", "Paso a paso", "Ruidos", "Noche de hoy", 
                    "Malambo para Luca", "Blues del gato"
                ] 
            },
            { 
                title: "27", 
                cover: "img/Ciro/27.jpg", 
                year: 2012, 
                songs: [
                    "Astros", "Caminando", "Me gusta", "Mírenla", 
                    "Barón Rojo", "Ciudad animal", "Curtite", "Héroes de Malvinas", 
                    "La corporación", "Tal vez", "Larga vida al rock and roll", 
                    "Fácil", "Murgueros", "Tango del 27"
                ] 
            },
            { 
                title: "Qué placer verte otra vez (En Vivo)", 
                cover: "img/Ciro/queplacer.jpg", 
                year: 2015, 
                songs: [
                    "Banda de garaje (En vivo)", "Arco (En vivo)", "Antes y después (En vivo)", 
                    "Tan solo (En vivo)", "Ciudad animal (En vivo)", "Mírenla (En vivo)", 
                    "Insisto (En vivo)", "Pacífico (En vivo)", "Astros (En vivo)", 
                    "El farolito (En vivo)", "Noche de hoy (En vivo)"
                ] 
            },
            { 
                title: "Naranja Persa", 
                cover: "img/Ciro/naranjapersa.jpg", 
                year: 2016, 
                songs: [
                    "Similar", "5 bestias", "Amor prohibido", "Luces de la ciudad", 
                    "Hoy te vas", "Luz", "Mulato", "Atún", "Juira!"
                ] 
            },
            { 
                title: "Naranja Persa 2", 
                cover: "img/Ciro/naranjapersa2.jpg", 
                year: 2018, 
                songs: [
                    "Prometeo", "Dice", "Dale Darling", "Me provocás", 
                    "Plan", "Estación", "Toaster (Give me)", "Más macanas", 
                    "Por cel", "Todos igual", "Simple", "Un hombre más"
                ] 
            },
            { 
                title: "Ciro y los Persas en el Estadio de River (En Vivo)", 
                cover: "img/Ciro/river.jpg", 
                year: 2019, 
                songs: [
                    "Banda de garaje (En vivo)", "Prometeo (En vivo)", "Amor prohibido (En vivo)", 
                    "Dientes de cordero (En vivo)", "Dale Darling (En vivo)", "Pistolas (En vivo)", 
                    "Me gusta (En vivo)", "Verano del 92 (En vivo)", "Astros (En vivo)"
                ] 
            },
            { 
                title: "Guerreras", 
                cover: "img/Ciro/guerreras.jpg", 
                year: 2020, 
                songs: [
                    "Morella (Acústico)", "Mírenla (Acústico)", "Me gusta (Acústico)", 
                    "Vas a bailar (Acústico)", "Tal vez (Acústico)", "Insisto (Acústico)", 
                    "Dice (Acústico)", "Ruidos (Acústico)", "Barón Rojo (Acústico)"
                ] 
            },
            { 
                title: "Sueños (Un viaje en el tiempo)", 
                cover: "img/Ciro/suenos.jpg", 
                year: 2022, 
                songs: [
                    "Antes y después (Sinfónico)", "Pacífico (Sinfónico)", "Ando ganas (Sinfónico)", 
                    "Agua (Sinfónico)", "Dientes de cordero (Sinfónico)", "Astros (Sinfónico)", 
                    "Verano del 92 (Sinfónico)", "Canción de cuna (Sinfónico)"
                ] 
            }
        ]
    },
    {
        id: 19,
        name: "Andrés Calamaro",
        bio: "El Salmón. Poeta, compositor y máquina de hacer canciones. Desde sus inicios en Los Abuelos de la Nada y Los Rodríguez hasta su monumental carrera solista, Calamaro escribió la banda sonora sentimental de varias generaciones. Su obra navega entre el rock, el pop, el tango y la crudeza emocional.",
        image: "img/Calamaro/calamaro.jpg",
        topSongs: ["Flaca", "Paloma", "Estadio Azteca"],
        discography: [
            { 
                title: "Hotel Calamaro", 
                cover: "img/Calamaro/hotel.jpg", 
                year: 1984, 
                songs: [
                    "Fabio Zerpa tiene razón", "La viudita de Tilcara", "Otro amor en Avellaneda", 
                    "Radio actividad radial", "No me pidas que no sea un inconsciente", 
                    "Detenida", "Miro por la ventana", "Amor en la biblioteca"
                ] 
            },
            { 
                title: "Vida cruel", 
                cover: "img/Calamaro/vidacruel.jpg", 
                year: 1985, 
                songs: [
                    "Acto simple", "Dice un proverbio chino", "Promesas sobre el bidet", 
                    "Satin", "No me empujes", "Que vida cruel", 
                    "Vi la raya", "Fotos de ídolos", "Príncipe de Hadersfield"
                ] 
            },
            { 
                title: "Por mirarte", 
                cover: "img/Calamaro/pormirarte.jpg", 
                year: 1988, 
                songs: [
                    "Cartas sin marcar", "Por mirarte", "Loco por ti", 
                    "Clausura", "Lamiendo un hueso", "Me pierdo", 
                    "En los ojos de mi perro", "Bailarín", "No te bancaste"
                ] 
            },
            { 
                title: "Nadie sale vivo de aquí", 
                cover: "img/Calamaro/nadiesale.jpg", 
                year: 1989, 
                songs: [
                    "Nadie sale vivo de aquí", "Pero sin sangre", "Vietnam", 
                    "Pasemos a otro tema", "Con la soga al cuello", "No se puede vivir del amor", 
                    "Señal que te he perdido", "Adiós amigos adiós", "Ni hablar"
                ] 
            },
            { 
                title: "Alta Suciedad", 
                cover: "img/Calamaro/altasuciedad.jpg", 
                year: 1997, 
                songs: [
                    "Alta suciedad", "Todo lo demás", "Donde manda marinero", "Loco", 
                    "Flaca", "¿Quién asó la manteca?", "Media verónica", "El tercio de los sueños", 
                    "Comida china", "Elvis está vivo", "Me arde", "Crímenes perfectos", 
                    "Nunca es igual", "El novio del olvido", "Catalina, Bahía"
                ] 
            },
            { 
                title: "Honestidad Brutal", 
                cover: "img/Calamaro/honestidad.jpg", 
                year: 1999, 
                songs: [
                    "El día de la mujer mundial", "Te quiero igual", "La parte de adelante", 
                    "Clonazepán y circo", "Los aviones", "Más duele", "Paloma", 
                    "Con Abuelo", "La novia", "Cuando te conocí", "Jugar con fuego", 
                    "Maradona", "Victoria y Soledad", "Mi propia trampa", "Ansia en Plaza Francia", 
                    "Aquellos besos", "No tan buenos aires", "Hacer el tonto"
                ] 
            },
            { 
                title: "El Salmón", 
                cover: "img/Calamaro/elsalmon.jpg", 
                year: 2000, 
                songs: [
                    "El salmón", "Días distintos", "Tuyo siempre", "Ok Perdón", 
                    "Para no olvidar", "Nos volveremos a ver", "Gaviotas", "Output-Input", 
                    "Revolución turra", "Vigilante medio argentino", "Lorena", "Los chicos", 
                    "Crucificame", "Tu pavada", "Horizontes"
                ] 
            },
            { 
                title: "El Cantante", 
                cover: "img/Calamaro/elcantante.jpg", 
                year: 2004, 
                songs: [
                    "Malena", "Volver", "La distancia", "Estadio Azteca", 
                    "Voy a perder la cabeza por tu amor", "Sus ojos se cerraron", 
                    "Algo contigo", "El cantante", "Las oportunidades", "La libertad"
                ] 
            },
            { 
                title: "El Regreso (En Vivo)", 
                cover: "img/Calamaro/elregreso.jpg", 
                year: 2005, 
                songs: [
                    "El cantante (En vivo)", "El salmón (En vivo)", "Te quiero igual (En vivo)", 
                    "Tuyo siempre (En vivo)", "La parte de adelante (En vivo)", "Clonazepán y circo (En vivo)", 
                    "Estadio Azteca (En vivo)", "Media verónica (En vivo)", "Flaca (En vivo)", 
                    "Paloma (En vivo)", "Crímenes perfectos (En vivo)"
                ] 
            },
            { 
                title: "La lengua popular", 
                cover: "img/Calamaro/lalengua.jpg", 
                year: 2007, 
                songs: [
                    "Los chicos", "Carnaval de Brasil", "5 minutos más (Minibar)", 
                    "Soy tuyo", "Mi gin tonic", "La mitad del amor", 
                    "Comedor piquetero", "Sexto sentido", "Cada una de tus cosas", "Mi mantra"
                ] 
            },
            { 
                title: "On the Rock", 
                cover: "img/Calamaro/ontherock.jpg", 
                year: 2010, 
                songs: [
                    "Barcos", "Te extraño", "El pasodoble de los amigos ausentes", 
                    "Todos se van", "Los divinos", "Flor de samurai", 
                    "Insoportablemente cruel", "Tres marías", "Vasos vacíos"
                ] 
            },
            { 
                title: "Bohemio", 
                cover: "img/Calamaro/bohemio.jpg", 
                year: 2013, 
                songs: [
                    "Belgrano", "Cuando no estás", "Tantas veces", "Rehenes", 
                    "Nacimos para correr", "Bohemio", "Plástico fino", 
                    "Inexplicable", "Dentro de una canción", "Doce pasos"
                ] 
            },
            { 
                title: "Cargar la suerte", 
                cover: "img/Calamaro/cargar.jpg", 
                year: 2018, 
                songs: [
                    "Verdades afiladas", "Tránsito lento", "Cuarteles de invierno", 
                    "Diego Armando Canciones", "Las rimas", "Siete vidas", 
                    "Mi ranchito", "Falso LV", "Adán rechaza", "Voy a volver"
                ] 
            }
        ]
    },
    {
        id: 20,
        name: "Fito Páez",
        bio: "El trovador del rock argentino. Nacido en Rosario, Rodolfo Páez transformó la tragedia en arte. Hizo el disco más vendido de la historia del rock nacional ('El amor después del amor') y su obra, marcada por el piano, la sangre y la melancolía, es la banda sonora de millones de vidas.",
        image: "img/Fito/fitopaez.jpg",
        topSongs: ["El amor despues del amor", "Mariposa Tecknicolor", "11 y 6"],
        discography: [
            { 
                title: "Del 63", 
                cover: "img/Fito/del63.jpg", 
                year: 1984, 
                songs: [
                    "Del 63", "Tres agujas", "Viejo mundo", "La rumba del piano", 
                    "Cuervos en casa", "Sable chino", "Rojo como el corazón", 
                    "Canción sobre canción", "Un rosarino en Budapest"
                ] 
            },
            { 
                title: "Giros", 
                cover: "img/Fito/giros.jpg", 
                year: 1985, 
                songs: [
                    "Giros", "Taquicardia", "Alguna vez voy a ser libre", "11 y 6", 
                    "Yo vengo a ofrecer mi corazón", "Narciso y Quasimodo", 
                    "Cable a tierra", "Decisiones apresuradas", "D.L.G."
                ] 
            },
            { 
                title: "Ciudad de pobres corazones", 
                cover: "img/Fito/ciudad.jpg", 
                year: 1987, 
                songs: [
                    "Pompa bye bye", "De 1920", "A las piedras de Belén", "Fuga en tabú", 
                    "Gente sin swing", "Nada más preciado", "Ciudad de pobres corazones", 
                    "Ámbar violeta", "Bailando hasta que se vaya la noche", 
                    "Dando vueltas en el aire", "Track Track"
                ] 
            },
            { 
                title: "Ey!", 
                cover: "img/Fito/ey.jpg", 
                year: 1988, 
                songs: [
                    "Lejos en Berlín", "Solo los chicos", "Tatuaje falso", 
                    "La ciudad de los pibes sin calma", "Polaroid de locura ordinaria", 
                    "Canción de amor mientras tanto", "Dame un talismán", 
                    "Alacrán (Resaca)", "Por siete vidas (Cacería)"
                ] 
            },
            { 
                title: "Tercer mundo", 
                cover: "img/Fito/tercermundo.jpg", 
                year: 1990, 
                songs: [
                    "El chico de la tapa", "Religion song", "Fue amor", "Yo te amé en Nicaragua", 
                    "Hazte fama", "Carabelas nada", "Los buenos tiempos", 
                    "Tercer mundo", "B. Ode y Evelyn", "Y dale alegría a mi corazón"
                ] 
            },
            { 
                title: "El amor después del amor", 
                cover: "img/Fito/elamor.jpg", 
                year: 1992, 
                songs: [
                    "El amor después del amor", "Dos días en la vida", "La verónica", 
                    "Tráfico por Katmandú", "Pétalo de sal", "Sasha, Sissí y el círculo de baba", 
                    "Un vestido y un amor", "Tumbas de la gloria", "La rueda mágica", 
                    "Creo", "Detrás del muro de los lamentos", "Brillante sobre el mic", 
                    "A rodar mi vida"
                ] 
            },
            { 
                title: "Circo Beat", 
                cover: "img/Fito/circobeat.jpg", 
                year: 1994, 
                songs: [
                    "Circo Beat", "Mariposa Tecknicolor", "Normal 1", 
                    "Las tardes del sol, las noches del agua", "Tema de Piluso", 
                    "She's Mine", "El jardín donde vuelan los mares", "Nadie detiene al amor en un lugar", 
                    "Si Disney despertase", "Soy un hippie", "Dejarlas partir", 
                    "Lo que el viento nunca se llevó", "Nada del mundo real"
                ] 
            },
            { 
                title: "Euforia (En Vivo)", 
                cover: "img/Fito/euforia.jpg", 
                year: 1996, 
                songs: [
                    "Y dale alegría a mi corazón", "Cadáver exquisito", "11 y 6", 
                    "El chico de la tapa", "Corazón clandestino", "Dar es dar", 
                    "Mariposa Tecknicolor", "Circo Beat", "Tus regalos deberían de llegar", 
                    "Por siete vidas", "Del 63", "Un vestido y un amor"
                ] 
            },
            { 
                title: "Abre", 
                cover: "img/Fito/abre.jpg", 
                year: 1999, 
                songs: [
                    "Abre", "Al lado del camino", "Dos en la ciudad", "Es solo una cuestión de actitud", 
                    "La casa desaparecida", "Tu sonrisa inolvidable", "Desierto", 
                    "Torre de cristal", "Habana", "Ahí voy", "La despedida", "Buena estrella"
                ] 
            },
            { 
                title: "Rey Sol", 
                cover: "img/Fito/reysol.jpg", 
                year: 2000, 
                songs: [
                    "El diablo de tu corazón", "Rey Sol", "Vale", "Dale loca", 
                    "Acerca del niño proletario", "Noche en downtown", "Hay algo en el mundo", 
                    "Paranoica santiagueña", "The shining song", "Molto lugar", 
                    "Regalo de bodas", "13"
                ] 
            },
            { 
                title: "Naturaleza sangre", 
                cover: "img/Fito/naturaleza.jpg", 
                year: 2003, 
                songs: [
                    "Nuevo", "Insoportable", "Volver a mí", "Ojos rojos", 
                    "Bello abril", "Urgente amar", "Naturaleza sangre", 
                    "El centro de tu corazón", "Absolut vacío", "Los restos de nuestro amor", 
                    "Oh nena", "Salir al sol", "Música para camaleones"
                ] 
            },
            { 
                title: "Rodolfo", 
                cover: "img/Fito/rodolfo.jpg", 
                year: 2007, 
                songs: [
                    "Si es amor", "Sofi fue una nena de papá", "Vas conmigo", 
                    "Nocturno en sol", "El cuarto de al lado", "Cae la noche en Okinawa", 
                    "Siempre te voy a amar", "Mágica hermosura", "El verdadero amar", 
                    "Waltz for Marguie", "Gracias", "Zamba del cielo"
                ] 
            },
            { 
                title: "No sé si es Baires o Madrid (En Vivo)", 
                cover: "img/Fito/baires.jpg", 
                year: 2008, 
                songs: [
                    "11 y 6 (con Sabina)", "Tumbas de la gloria", "El amor después del amor", 
                    "Dos días en la vida", "Brillante sobre el mic", "Pétalo de sal", 
                    "Un vestido y un amor", "Contigo (con Sabina)", "Yo vengo a ofrecer mi corazón", 
                    "Giros", "Al lado del camino", "Mariposa Tecknicolor"
                ] 
            },
            { 
                title: "La conquista del espacio", 
                cover: "img/Fito/laconquista.jpg", 
                year: 2020, 
                songs: [
                    "La conquista del espacio", "Resucitar", "Las cosas que me hacen bien", 
                    "La canción de las bestias", "Gente en la calle", "Ey, You!", 
                    "Nadie es de nadie", "Maelström", "Todo se olvida"
                ] 
            },
            { 
                title: "Los años salvajes", 
                cover: "img/Fito/anossalvajes.jpg", 
                year: 2021, 
                songs: [
                    "Vamos a lograrlo", "Lo mejor de nuestras vidas", "La música de los sueños de tu juventud", 
                    "Caballo de Troya", "Sin mí en vos", "Lili and Drake", 
                    "Encuentros cercanos", "Beer Blues", "Los años salvajes"
                ] 
            }
        ]
    },
    {
        id: 21,
        name: "La Vela Puerca",
        bio: "Desde Uruguay con corazón argentino. Sebastián Teysera y Sebastián Cebreiro lideran esta banda que fusiona rock, ska y reggae con una identidad rioplatense única. Sus recitales son verdaderas fiestas de 'agite' y sus letras himnos de resistencia y amistad.",
        image: "img/LaVela/lavelapuerca.jpg",
        topSongs: ["El viejo", "Zafar", "Va a escampar"],
        discography: [
            { 
                title: "Deskarado", 
                cover: "img/LaVela/deskarado.jpg", 
                year: 1998, 
                songs: [
                    "Alta magia", "El viejo", "El bandido", "Los insectos", 
                    "Común cangrejo", "Madre", "Potosí", "Gente", 
                    "Vuelan palos", "Mi semilla", "A su bola", "Vereda", "Deskarado"
                ] 
            },
            { 
                title: "De bichos y flores", 
                cover: "img/LaVela/debichos.jpg", 
                year: 2001, 
                songs: [
                    "Por la ciudad", "Por dentro", "El viejo", "El profeta", 
                    "La sin razón", "Burbujas", "José sabía", "Rebuscado", 
                    "Contradecir", "Huracán", "El ojo moro", "Mírenme", "Mañana"
                ] 
            },
            { 
                title: "A contraluz", 
                cover: "img/LaVela/acontraluz.jpg", 
                year: 2004, 
                songs: [
                    "Llenos de magia", "Sin palabras", "Dice", "De atar", 
                    "Va a escampar", "Escobas", "Zafar", "Caldo precoz", 
                    "Haciéndose pasar por luz", "En el limbo", "Un frasco", "Doble filo"
                ] 
            },
            { 
                title: "El impulso", 
                cover: "img/LaVela/elimpulso.jpg", 
                year: 2007, 
                songs: [
                    "Frágil", "El 'Señor'", "Su ración", "Neuronas", 
                    "Clones", "Colabore", "Para no verme más", "Con el destino", 
                    "Sanar", "Pino", "Me pierdo", "La sin razón"
                ] 
            },
            { 
                title: "Piel y hueso", 
                cover: "img/LaVela/pielyhueso.jpg", 
                year: 2011, 
                songs: [
                    "Sobre la sien", "...Y así vivir", "La teoría", "Tentación", 
                    "Sigo creyendo", "Cada palabra", "Se le va", "Solo un paredón", 
                    "Buitres", "Hoy", "Todo el karma", "Sé a dónde quiere ir", "3 minutos"
                ] 
            },
            { 
                title: "Uno para todos (En Vivo)", 
                cover: "img/LaVela/unoparatodos.jpg", 
                year: 2014, 
                songs: [
                    "Todo el karma (En vivo)", "Llenos de magia (En vivo)", "Escobas (En vivo)", 
                    "Va a escampar (En vivo)", "Zafar (En vivo)", "El viejo (En vivo)", 
                    "De atar (En vivo)", "Por la ciudad (En vivo)", "Haciéndose pasar por luz (En vivo)", 
                    "El profeta (En vivo)", "José sabía (En vivo)", "Vuelan palos (En vivo)"
                ] 
            },
            { 
                title: "Érase...", 
                cover: "img/LaVela/erase.jpg", 
                year: 2014, 
                songs: [
                    "La calle adicción", "El soldado de plomo", "El primero", "Buenas mascotas", 
                    "La madeja", "Canción para uno", "¿Ves?", "Habeus corpus", 
                    "La puerta", "Callejón", "Su propia voz", "IV"
                ] 
            },
            { 
                title: "Festejar para sobrevivir (En Vivo)", 
                cover: "img/LaVela/festejar.jpg", 
                year: 2017, 
                songs: [
                    "La sin razón (En vivo)", "La calle adicción (En vivo)", "El soldado de plomo (En vivo)", 
                    "Llenos de magia (En vivo)", "Colabore (En vivo)", "Todo el karma (En vivo)", 
                    "Polidoro (En vivo)", "Burbujas (En vivo)", "Mi semilla (En vivo)", 
                    "El viejo (En vivo)", "Zafar (En vivo)", "El profeta (En vivo)"
                ] 
            },
            { 
                title: "Destilar", 
                cover: "img/LaVela/destilar.jpg", 
                year: 2018, 
                songs: [
                    "Velamen", "Atala", "La nube de la duda", "Casi te vas", 
                    "Mi diablo", "Con el viento", "La revancha", "Piel y hueso", 
                    "Baco", "De más", "Aprendiz", "Luna de Neuquén"
                ] 
            },
            { 
                title: "Discopático", 
                cover: "img/LaVela/discopatico.jpg", 
                year: 2022, 
                songs: [
                    "Contra el viento", "Plan de fuga", "Tesoro", "La pastilla", 
                    "Jugando con fuego", "En tu suelo", "Tormenta", "El paraíso", 
                    "Para siempre", "No sé", "Lejos de los ojos"
                ] 
            }
        ]
    },
    {
        id: 22,
        name: "Los Abuelos de la Nada",
        bio: "Pop, alegría y poesía sofisticada. Liderados por el mítico Miguel Abuelo, reunieron un 'dream team' (Calamaro, Melingo, Cachorro López) que inyectó funk, new wave y ritmo bailable al rock argentino de la primavera democrática. Sus canciones son clásicos absolutos de nuestra música.",
        image: "img/Abuelos/losabuelosdelanada.jpg",
        topSongs: ["Mil horas", "Costumbres argentinas", "Lunes por la madrugada"],
        discography: [
            { 
                title: "Los Abuelos de la Nada", 
                cover: "img/Abuelos/losabuelos1.jpg", 
                year: 1982, 
                songs: [
                    "No te enamores nunca de aquel marinero bengalí", "Sin gamulán", "En la cama o en el suelo", 
                    "Como debemos...", "Ir a más", "Tristeza de la ciudad", 
                    "Creo que es un sueño más", "Levantando temperatura", "Guindilla ardiente", 
                    "Te vas a asustar", "Estación"
                ] 
            },
            { 
                title: "Vasos y besos", 
                cover: "img/Abuelos/vasosybesos.jpg", 
                year: 1983, 
                songs: [
                    "No se desesperen", "Así es el calor", "Yo soy tu bandera", 
                    "Sintonía americana", "Espía de Dios", "Cucarachón de tribunal", 
                    "Mil horas", "Hermana Teresa", "Chala-man", 
                    "Mundo de los dos", "Vamos al ruedo"
                ] 
            },
            { 
                title: "Himno de mi corazón", 
                cover: "img/Abuelos/himno.jpg", 
                year: 1984, 
                songs: [
                    "Himno de mi corazón", "Lunes por la madrugada", "Hombre lobo", 
                    "En línea", "No puedo decirte no", "Vasos y besos", 
                    "Menage a trois", "La fórmula del éxito", "Medita sol", 
                    "En aquel rincón"
                ] 
            },
            { 
                title: "Los Abuelos en el Ópera (En Vivo)", 
                cover: "img/Abuelos/opera.jpg", 
                year: 1985, 
                songs: [
                    "Zig-Zag", "No te enamores nunca de aquel marinero bengalí (En vivo)", "Tristeza de la ciudad (En vivo)", 
                    "Costumbres argentinas", "Guindilla ardiente (En vivo)", "Mil horas (En vivo)", 
                    "Lunes por la madrugada (En vivo)", "Himno de mi corazón (En vivo)", "Sin gamulán (En vivo)", 
                    "Chala-man (En vivo)", "Medita sol (En vivo)", "No se desesperen (En vivo)"
                ] 
            },
            { 
                title: "Cosas mías", 
                cover: "img/Abuelos/cosasmias.jpg", 
                year: 1986, 
                songs: [
                    "Cosas mías", "Cómo, quién, dónde", "Región dura", 
                    "Rock and Roll sobre la alfombra", "Policías y ladrones", "Padre", 
                    "Tu angelito", "Semental de Palermo", "Capitán Calavera", 
                    "Alma de diamante"
                ] 
            }
        ]
    },
    {
        id: 23,
        name: "Mancha de Rolando",
        bio: "Rock de ruta y canción. Nacidos en Avellaneda, supieron construir melodías simples pero contundentes que se metieron en el inconsciente colectivo argentino. Con 'Arde la ciudad' rompieron fronteras y se establecieron como una banda clásica de festivales y radios.",
        image: "img/Mancha/manchaderolando.jpg",
        topSongs: ["Arde la ciudad", "Calavera", "Donde vamos"],
        discography: [
            { 
                title: "Cabaña Diabólica", 
                cover: "img/Mancha/cabana.jpg", 
                year: 1998, 
                songs: [
                    "Vagabundear", "San Ernesto", "Cabaña diabólica", "El ritmo del blues", 
                    "La soledad", "Ojos de ciego", "Jugar con fuego", "Voy a dejarte", 
                    "Sobre la ruta", "Bailando", "A mi hogar"
                ] 
            },
            { 
                title: "Animal Humano", 
                cover: "img/Mancha/animalhumano.jpg", 
                year: 2000, 
                songs: [
                    "Animal humano", "La marca del collar", "La maceta", "Parata", 
                    "Siempre esperando", "Raíz", "Maldito tren", "El hongo", 
                    "No me dejes", "Vidas", "Semilla"
                ] 
            },
            { 
                title: "Juego de locos", 
                cover: "img/Mancha/juegodelocos.jpg", 
                year: 2002, 
                songs: [
                    "Calavera", "Juego de locos", "Donde vamos", "En la calle", 
                    "Mago de lluvia", "Melodía simple", "Mi ángel", "Aquel caracol", 
                    "Pueblo latino", "Buscando la salida", "Vente", "Chau"
                ] 
            },
            { 
                title: "Viaje", 
                cover: "img/Mancha/viaje.jpg", 
                year: 2004, 
                songs: [
                    "Arde la ciudad", "Viaje", "Buscar", "El tiempo", 
                    "A vivir", "Doce cincuenta", "No está todo perdido", "Sincera", 
                    "Ese tren", "Canto", "Tranquilo", "Y así será"
                ] 
            },
            { 
                title: "Espíritu", 
                cover: "img/Mancha/espiritu.jpg", 
                year: 2006, 
                songs: [
                    "Antes", "Chino", "La alegría", "Como un rayo", 
                    "Espíritu", "Regalo", "El chamán", "Sola", 
                    "Viernes", "Suerte", "Divina", "En la oscuridad"
                ] 
            },
            { 
                title: "A cielo abierto", 
                cover: "img/Mancha/acieloabierto.jpg", 
                year: 2009, 
                songs: [
                    "Llegará", "Cabrón", "Carolina", "La planta", 
                    "Por qué", "Me estás haciendo mal", "Hola", "Hacia el sur", 
                    "Santa María", "Sueltate", "Fantasmas", "Mis amigos"
                ] 
            },
            { 
                title: "Los Libres", 
                cover: "img/Mancha/loslibres.jpg", 
                year: 2012, 
                songs: [
                    "La primavera", "Los libres", "Olvidar", "Hacelo", 
                    "El hambre", "Tan solo", "La cuadra", "Ríe", 
                    "No me dejes", "A la vida", "Bla bla bla", "Corazón de papel"
                ] 
            },
            { 
                title: "Viviré Viajando (En Vivo/Acústico)", 
                cover: "img/Mancha/vivireviajando.jpg", 
                year: 2016, 
                songs: [
                    "Viviré viajando", "Calavera (En vivo)", "Mago de lluvia (En vivo)", 
                    "Arde la ciudad (En vivo)", "Donde vamos (En vivo)", "Chino (En vivo)", 
                    "Antes (En vivo)", "Siempre esperando (En vivo)", "Buscar (En vivo)", 
                    "Melodía simple (En vivo)", "Sola (En vivo)", "Cabrón (En vivo)"
                ] 
            },
            { 
                title: "La Revolución de la Alegría", 
                cover: "img/Mancha/revolucion.jpg", 
                year: 2020, 
                songs: [
                    "Te da", "El baile", "La pena", "Para siempre", 
                    "Cansado", "Piel de mi piel", "La revolución", "Las estrellas", 
                    "Juntos", "Satélite"
                ] 
            }
        ]
    },
    {
        id: 24,
        name: "La Renga",
        bio: "El banquete. Rock pesado, autogestión y la convocatoria más fiel del país. Chizzo, Tete y Tanque construyeron, sin publicidad y boca a boca, la banda de rock más grande de la actualidad. Sus recitales son peregrinaciones masivas de 'Los Mismos de Siempre'.",
        image: "img/LaRenga/larenga.jpg",
        topSongs: ["La balada del diablo y la muerte", "El final es en donde partí", "La razón que te demora"],
        discography: [
            { 
                title: "Esquivando charcos", 
                cover: "img/LaRenga/esquivando.jpg", 
                year: 1991, 
                songs: [
                    "Somos los mismos de siempre", "Moscas verdes para el charlatán", "Embrollos, fatos y paquetes", 
                    "Luciendo mi saquito blusero", "Voy a bailar a la nave del olvido", "Buseca y vino tinto", 
                    "El juicio del ganso", "Negra es mi alma, negro mi corazón", "Blues de Bolivia"
                ] 
            },
            { 
                title: "A donde me lleva la vida...", 
                cover: "img/LaRenga/adonde.jpg", 
                year: 1994, 
                songs: [
                    "El camino del deshielo", "Cortala y olvidala", "El rito de los corazones sangrando", 
                    "Blues cardíaco", "Pis y caca", "El sátiro de la mala leche", 
                    "El mambo de la botella", "Debbie el fantasma", "El circo romano", 
                    "2 + 2 = 3", "Triste canción de amor"
                ] 
            },
            { 
                title: "Despedazado por mil partes", 
                cover: "img/LaRenga/despedazado.jpg", 
                year: 1996, 
                songs: [
                    "Desnudo para siempre (o despedazado por mil partes)", "A la carga mi rocanrol", "El final es en donde partí", 
                    "Balada del diablo y la muerte", "Cuándo vendrán", "Psilocybe mexicana", 
                    "Paja brava", "Lo frágil de la locura", "Veneno", 
                    "El viento que todo empuja", "Hablando de la libertad"
                ] 
            },
            { 
                title: "La Renga (La Estrella)", 
                cover: "img/LaRenga/laestrella.jpg", 
                year: 1998, 
                songs: [
                    "El terco", "Tripa y corazón", "Bien alto", 
                    "El hombre de la estrella", "Vende patria clon", "El revelde", 
                    "Me hice canción", "El twist del pibe", "Reite", 
                    "Ser yo", "Hielasangre"
                ] 
            },
            { 
                title: "La esquina del infinito", 
                cover: "img/LaRenga/laesquina.jpg", 
                year: 2000, 
                songs: [
                    "La vida, las mismas calles", "Motoralmaisangre", "Al que he sangrado", 
                    "Panic show", "El cielo del desengaño", "Arte infernal", 
                    "En el baldío", "En pie", "El rey de la triste felicidad", 
                    "Estalla", "Hey hey, my my"
                ] 
            },
            { 
                title: "Insoportablemente vivo (En Vivo)", 
                cover: "img/LaRenga/insoportablemente.jpg", 
                year: 2001, 
                songs: [
                    "Panic show (En vivo)", "El terco (En vivo)", "La balada del diablo y la muerte (En vivo)", 
                    "El final es en donde partí (En vivo)", "La razón que te demora (En vivo)", "Estalla (En vivo)", 
                    "El rey de la triste felicidad (En vivo)", "Veneno (En vivo)", "El revelde (En vivo)", 
                    "Hablando de la libertad (En vivo)", "Oportunidad oportuna (En vivo)", "Un tiempo fuera de casa"
                ] 
            },
            { 
                title: "Detonador de sueños", 
                cover: "img/LaRenga/detonador.jpg", 
                year: 2003, 
                songs: [
                    "A tu lado", "Detonador de sueños", "El ojo del huracán", 
                    "La razón que te demora", "Dementes en el espacio", "Estado", 
                    "Las cosas que hace", "Noche vudú", "En los brazos del sol", 
                    "Miralos", "El rastro de la conciencia", "Hielasangre"
                ] 
            },
            { 
                title: "Truenotierra", 
                cover: "img/LaRenga/truenotierra.jpg", 
                year: 2006, 
                songs: [
                    "El monstruo que crece", "Almohada de piedra", "Ruta 40", 
                    "La boca del lobo", "Montaña roja", "Palabras estorbantes", 
                    "Cualquier historia", "Mujer del caleidoscopio", "Llenado de llorar", 
                    "Oscuro diamante", "Entre la niebla", "Cuadradrado makena"
                ] 
            },
            { 
                title: "Algún rayo", 
                cover: "img/LaRenga/algunrayo.jpg", 
                year: 2010, 
                songs: [
                    "Canibalismo galáctico", "Destino del mundo", "La furia de la bestia rock", 
                    "Poder", "Algún rayo", "Cristal de zirconio", 
                    "Dioses de terciopelo", "Inventa un mañana", "Disfrazao", 
                    "Lunáticos", "Desoriente blues", "Carne de cañón"
                ] 
            },
            { 
                title: "Pesados vestigios", 
                cover: "img/LaRenga/pesados.jpg", 
                year: 2014, 
                songs: [
                    "Corazón fugitivo", "Nómades", "Mirada de acantilado", 
                    "Día de sol", "Sabes que", "San Miguel", 
                    "Pole", "Muy indignado", "No para de aletear", 
                    "Motorock", "Masomenos blues"
                ] 
            },
            { 
                title: "Alejado de la red", 
                cover: "img/LaRenga/alejado.jpg", 
                year: 2022, 
                songs: [
                    "Parece un caso perdido", "Buena pipa", "Flecha en la clave", 
                    "Elefantes pogueando", "Llegó la hora", "El que me lleva", 
                    "Para que yo pueda ver", "Alejado de la red", "En bicicleta"
                ] 
            }
        ]
    },
    {
        id: 25,
        name: "Ratones Paranoicos",
        bio: "Los Stones argentinos. Juanse y compañía trajeron el rock and roll puro, sucio y vicioso a la escena nacional. Con una estética y sonido inconfundiblemente stoniano, crearon himnos de la noche porteña como 'Rock del Gato', 'Vicio' y 'Sigue Girando'.",
        image: "img/Ratones/ratonesparanoicos.jpg",
        topSongs: ["Rock del gato", "Sigue girando", "Para siempre"],
        discography: [
            { 
                title: "Ratones Paranoicos", 
                cover: "img/Ratones/ratones1.jpg", 
                year: 1986, 
                songs: [
                    "Sucia estrella", "Ahora no", "Ceremonia en el hall", "Primavera nacional", 
                    "El hada violada", "Movamos", "Descerebrado", "Autocine", 
                    "Una noche no hace mal", "Sucia estrella"
                ] 
            },
            { 
                title: "Los chicos quieren rock", 
                cover: "img/Ratones/loschicos.jpg", 
                year: 1988, 
                songs: [
                    "Carolina", "El hada violada", "Ceremonia en el hall", "Lluvia de héroes", 
                    "Enlace", "Ella está de mi lado", "Rainbow", "Sucia estrella"
                ] 
            },
            { 
                title: "Furtivos", 
                cover: "img/Ratones/furtivos.jpg", 
                year: 1989, 
                songs: [
                    "Caballo de noche", "Hasta que llegue el dolor", "Pesado burdel", 
                    "Líder algo", "Al fin nena", "La nave", "Hay que salir", "Pobre muchacha"
                ] 
            },
            { 
                title: "Tómalo o déjalo", 
                cover: "img/Ratones/tomalo.jpg", 
                year: 1990, 
                songs: [
                    "Juana de Arco", "Una noche no hace mal", "Cerca del sol", 
                    "Destruida roll", "En la alfombra", "La calificación", 
                    "El reflejo", "No te escudes", "Estrella"
                ] 
            },
            { 
                title: "Fieras lunáticas", 
                cover: "img/Ratones/fieras.jpg", 
                year: 1991, 
                songs: [
                    "La avispa", "Rock del pedazo (Rock del gato)", "Ya morí", 
                    "Sucio gas", "Cowboy", "La calavera", 
                    "Rock del pedazo (Versión)", "Wah Wah"
                ] 
            },
            { 
                title: "Hecho en Memphis", 
                cover: "img/Ratones/memphis.jpg", 
                year: 1993, 
                songs: [
                    "Vicio", "Isabel", "La guerra del ácido", "Decepcionado", 
                    "Cansado", "Grand Funk", "Cierro y me voy", "C.I.A.", 
                    "Monalisa", "Todo lo que siento", "Pazeando"
                ] 
            },
            { 
                title: "Planeta Paranoico", 
                cover: "img/Ratones/planeta.jpg", 
                year: 1996, 
                songs: [
                    "El vampiro", "Colocado voy", "Juana de Arco", "Manuela", 
                    "Amnesia", "Destruida roll", "Sucia estrella", 
                    "El centauro", "Líder", "Ayúdame"
                ] 
            },
            { 
                title: "MTV Unplugged (En Vivo)", 
                cover: "img/Ratones/unplugged.jpg", 
                year: 1998, 
                songs: [
                    "Vicio (Unplugged)", "Sucia estrella (Unplugged)", "El vampiro (Unplugged)", 
                    "Carol (Unplugged)", "Rock del pedazo (Unplugged)", "La nave (Unplugged)", 
                    "Juana de Arco (Unplugged)", "Cansado (Unplugged)", "Cowboy (Unplugged)", 
                    "Para siempre (Unplugged)", "Isabel (Unplugged)"
                ] 
            },
            { 
                title: "Vivo Paranoico (En Vivo)", 
                cover: "img/Ratones/vivoparanoico.jpg", 
                year: 2000, 
                songs: [
                    "Para siempre", "Líder (En vivo)", "Enlace (En vivo)", "Lo que doy (En vivo)", 
                    "Carol (En vivo)", "Monalisa (En vivo)", "Isabel (En vivo)", 
                    "Descerebrado (En vivo)", "Rock del pedazo (En vivo)", 
                    "Cowboy (En vivo)", "El vampiro (En vivo)"
                ] 
            },
            { 
                title: "Girando", 
                cover: "img/Ratones/girando.jpg", 
                year: 2004, 
                songs: [
                    "Sigue girando", "No llores", "La fuga", "Simpatía", 
                    "El balneario", "La banda de rock and roll", "Espero", 
                    "Triste", "Mística", "Cristal", "Solo se"
                ] 
            },
            { 
                title: "Ratones Paranoicos", 
                cover: "img/Ratones/homonimo2009.jpg", 
                year: 2009, 
                songs: [
                    "Sacrificio japonés", "No llores", "Te vas", "Poca vida", 
                    "Lluvia de héroes", "El hada violada", "Paren de correr", 
                    "Manuela", "Hotel de las nubes", "Babilonia"
                ] 
            }
        ]
    },
    {
        id: 26,
        name: "Estelares",
        bio: "La perfección de la canción pop melancólica. Manuel Moretti escribe himnos al desamor, a la soledad y a la esperanza con una pluma tanguera y melodías irresistibles. Estelares es la banda que mejor supo unir la canción popular con el rock sofisticado.",
        image: "img/Estelares/estelares.jpg",
        topSongs: ["Un día perfecto", "Ella dijo", "Aire"],
        discography: [
            { 
                title: "Extraño lugar", 
                cover: "img/Estelares/extranolugar.jpg", 
                year: 1996, 
                songs: [
                    "El último beso", "Patinar", "Camas separadas", "Superacción", 
                    "La granja", "Suena el timbre", "Esos días perfectos", "Fantasmas", 
                    "Sissi", "Aguas profundas", "Extraño lugar", "La ruta del perdedor"
                ] 
            },
            { 
                title: "Amantes suicidas", 
                cover: "img/Estelares/amantessuicidas.jpg", 
                year: 1998, 
                songs: [
                    "Amantes suicidas", "Esas nubes", "200 monos", "Peluquería", 
                    "Un viaje a Irlanda", "El bar", "Las luces del sueño", "Me muero", 
                    "Neumáticos", "Mascotas", "Imágenes", "Radio"
                ] 
            },
            { 
                title: "Ardimos", 
                cover: "img/Estelares/ardimos.jpg", 
                year: 2003, 
                songs: [
                    "Moneda corriente", "En la habitación", "Llegó el verano", "De la Hoya", 
                    "Mar del Plata", "Bienvenida", "Mis ideas", "Felicidad", 
                    "Patinar (Versión 2003)", "Estrella", "Sissi (Versión 2003)", "Iba hacia el norte", 
                    "Los 90", "Próxima estación"
                ] 
            },
            { 
                title: "Sistema nervioso central", 
                cover: "img/Estelares/sistema.jpg", 
                year: 2006, 
                songs: [
                    "Las vías del tren", "El eléctrico", "Un día perfecto", "Aire", 
                    "Ella dijo", "200 monos", "Jardines secos", "El corazón sobre todo", 
                    "La enfermera", "Un show", "Luxemburgo", "Qué será?", 
                    "Campanas de palo", "Ardimos"
                ] 
            },
            { 
                title: "Una temporada en el amor", 
                cover: "img/Estelares/temporada.jpg", 
                year: 2009, 
                songs: [
                    "Cristal", "Melancolía", "Las trémulas canciones", "Las luces del sueño", 
                    "Máscaras", "Superacción", "Tanta gente", "Los lagartos mueren en familia", 
                    "Autobuses", "Cuatro chicos", "Hoteles", "Maniobras de guerra", 
                    "Un viaje a Irlanda", "Mil abejas"
                ] 
            },
            { 
                title: "El costado izquierdo", 
                cover: "img/Estelares/costado.jpg", 
                year: 2012, 
                songs: [
                    "Doce chicharras", "Rimbaud", "Aleluya", "Necesito caña", 
                    "Solo por hoy (Chica oriental)", "Julia", "Casa por casa", "El último beso", 
                    "Dos o tres minutos", "Islas", "Internacional", "El playa", "Playa Unión"
                ] 
            },
            { 
                title: "Vivo Gran Rex (En Vivo)", 
                cover: "img/Estelares/granrex.jpg", 
                year: 2014, 
                songs: [
                    "De la Hoya (En vivo)", "El corazón sobre todo (En vivo)", "Doce chicharras (En vivo)", 
                    "Ella dijo (En vivo)", "Las vías del tren (En vivo)", "Luxemburgo (En vivo)", 
                    "Melancolía (En vivo)", "Aire (En vivo)", "Un día perfecto (En vivo)", 
                    "Moneda corriente (En vivo)", "El último beso (En vivo)", "Ardimos (En vivo)"
                ] 
            },
            { 
                title: "Las antenas", 
                cover: "img/Estelares/antenas.jpg", 
                year: 2016, 
                songs: [
                    "Las antenas", "A la cobertura de mi corazón", "Alas rotas", "Subió la marea", 
                    "Es el amor", "Completamente", "Los alerces", "Darling", 
                    "¿Quién no se ha besado en Mardel?", "Una noche en San Juan", "Soledad", 
                    "Mañana", "Pueblo fantasma", "Los lagartos mueren en familia (Versión)"
                ] 
            },
            { 
                title: "Las lunas", 
                cover: "img/Estelares/laslunas.jpg", 
                year: 2019, 
                songs: [
                    "Hecho un mono", "Ríos de lava", "Este misterio", "Las lunas", 
                    "Montaña de amor", "Tu partida", "Los cielos parlantes", "Se rompe el pasto", 
                    "Una guitarra", "Horizontes"
                ] 
            },
            { 
                title: "Un mar de soles rojos", 
                cover: "img/Estelares/unmar.jpg", 
                year: 2022, 
                songs: [
                    "Loco", "Encantan", "Tiempos dorados", "Miedo", 
                    "Padre", "Club de remo", "Hábito", "Olvídate de todo", 
                    "La historia de este mundo", "Nadie sabe", "Desierto"
                ] 
            }
        ]
    },
    {
        id: 27,
        name: "Árbol",
        bio: "Hardcore, folklore y violines. Una mezcla explosiva y divertida del oeste del Gran Buenos Aires. Árbol rompió estructuras en los 2000 con sus armonías vocales perfectas y su capacidad de pasar del pogo furioso a la balada emotiva en segundos.",
        image: "img/Arbol/arbol.jpg",
        topSongs: ["El Fantasma", "Pequeños sueños", "La vida"],
        discography: [
            { 
                title: "Árbol", 
                cover: "img/Arbol/homonimo1999.jpg", 
                year: 1999, 
                songs: [
                    "Siento", "Sexo", "Vomitando flores", "Rosita", 
                    "El baile", "Periferia", "Sensaciones", "Cruces", 
                    "X", "H.C.V.", "Jardín de infantes", "Cuatro cuervos", 
                    "La cosa", "Ensueños"
                ] 
            },
            { 
                title: "Chapusongs", 
                cover: "img/Arbol/chapusongs.jpg", 
                year: 2002, 
                songs: [
                    "De arriba, de abajo", "La vida", "Esperanza", "Enes", 
                    "Cosacuosa", "Ya lo sabemos", "Sonámbulos", "Chapusongs", 
                    "Dale", "Ya", "La nena", "Ea-a-a", 
                    "Suerte!", "I am a paraguayan"
                ] 
            },
            { 
                title: "Guau!", 
                cover: "img/Arbol/guau.jpg", 
                year: 2004, 
                songs: [
                    "Trenes, camiones y tractores", "Suerte", "El Fantasma", "Prejuicios", 
                    "Pequeños sueños", "Comida chatarra", "Lloro", "Mariposas", 
                    "Chikanorexika", "Soy vos", "Canción de cuna para vos", "Ji ji ji"
                ] 
            },
            { 
                title: "Miau! (En Vivo)", 
                cover: "img/Arbol/miau.jpg", 
                year: 2006, 
                songs: [
                    "Trenes, camiones y tractores (En vivo)", "Vomitando flores (En vivo)", "Rosita (En vivo)", 
                    "Suerte (En vivo)", "Enes (En vivo)", "El Fantasma (En vivo)", 
                    "Ya lo sabemos (En vivo)", "Chikanorexika (En vivo)", "La vida (En vivo)", 
                    "Pequeños sueños (En vivo)", "Ji ji ji (En vivo)", "El baile (En vivo)"
                ] 
            },
            { 
                title: "Hormigas", 
                cover: "img/Arbol/hormigas.jpg", 
                year: 2007, 
                songs: [
                    "Revoloteando", "Osvaldo", "Soy la zoorra", "Palabras", 
                    "Plata", "Campo de flores", "La mudanza", "Tetris", 
                    "Sobra", "Memoria", "Adentro del mar", "Tiquitiquitiqui", 
                    "No me conoces", "Ronca"
                ] 
            },
            { 
                title: "No me etiquetes", 
                cover: "img/Arbol/nomeetiquetes.jpg", 
                year: 2009, 
                songs: [
                    "El sábado en Ramos", "Puñal", "Corazón de naranja", "Etiqueta", 
                    "Volveré a mi barrio", "Es lo que hay", "Abuela", "Pae", 
                    "Señorita", "Ji-ji-ji (Versión estudio)", "Un verano en la capital"
                ] 
            },
            { 
                title: "Hongo", 
                cover: "img/Arbol/hongo.jpg", 
                year: 2022, 
                songs: [
                    "Lobo solitario", "Ninja", "La niebla", "Tierra", 
                    "Esa cosa", "Nunca más", "Escapar", "Almas de la noche"
                ] 
            }
        ]
    },
    {
        id: 28,
        name: "Los Fundamentalistas",
        bio: "La banda del Indio Solari. Tras el final de Los Redondos, Carlos 'El Indio' Solari formó esta orquesta de rock para dar vida a un sonido más complejo, oscuro y masivo. Lideran el fenómeno popular más grande de la música argentina, conocido como 'El pogo más grande del mundo'.",
        image: "img/Fundamentalistas/fundamentalistas.jpg",
        topSongs: ["Había una vez", "Flight 956", "El tesoro de los inocentes"],
        discography: [
            { 
                title: "El tesoro de los inocentes (Bingo Fuel)", 
                cover: "img/Fundamentalistas/eltesoro.jpg", 
                year: 2004, 
                songs: [
                    "Nike es la cultura", "Amnesia", "El tesoro de los inocentes", 
                    "La piba de Blockbuster", "Tomasito podés oírme? tomasito podés verme?", 
                    "Mi caramel machiato", "La muerte y yo", "Adieu! Bye Bye! Aufwiedersehen!", 
                    "Pabellón séptimo (relato de Horacio)", "El charro chino", 
                    "Canción para un goldfish", "Tsunami", "To beef or not to beef", "Ciudad Baigón"
                ] 
            },
            { 
                title: "Porco Rex", 
                cover: "img/Fundamentalistas/porcorex.jpg", 
                year: 2007, 
                songs: [
                    "Pedía siempre temas en la radio...", "Ramas desnudas", "Sopa de lágrimas (para el pibe delete)", 
                    "Te estás quedando sin balas de plata", "Tatuaje", "Porco Rex", 
                    "Veneno paciente", "Porque será que no me quiere Dios", "Vuelo a Sidney", 
                    "Martinis y tafiroles", "Y mientras tanto el sol se muere", 
                    "Flight 956", "Bebamos de las copas lindas"
                ] 
            },
            { 
                title: "El perfume de la tempestad", 
                cover: "img/Fundamentalistas/elperfume.jpg", 
                year: 2010, 
                songs: [
                    "Todos a los botes!", "No es Dios todo lo que reluce", "Ceremonia durante la tormenta", 
                    "Torito es muerto", "Satelital", "Chieutti", "El perfume de la tempestad", 
                    "Vino Mariani", "ZZZZZZZZZZZ...", "El tábano en la oreja", 
                    "Submarino soluble", "Black Russian", "Una rata muerta entre los geranios"
                ] 
            },
            { 
                title: "Pajaritos, bravos muchachitos", 
                cover: "img/Fundamentalistas/pajaritos.jpg", 
                year: 2013, 
                songs: [
                    "A los pájaros que cantan sobre las selvas de internet", "Beemedobleve", "A la luz de la luna", 
                    "Las supersticiones de arcana", "Amok! Amok!", "Chau mohicano", 
                    "Arca Monster", "Cada pequeña muerte", "Babas del diablo", 
                    "Había una vez", "Un par de fantasmas", "Pajaritos bravos muchachitos"
                ] 
            },
            { 
                title: "En Concierto (En Vivo)", 
                cover: "img/Fundamentalistas/enconcierto.jpg", 
                year: 2015, 
                songs: [
                    "Adieu! Bye Bye! Aufwiedersehen! (En vivo)", "Martinis y tafiroles (En vivo)", "El charro chino (En vivo)", 
                    "Pabellón séptimo (En vivo)", "Flight 956 (En vivo)", "El tesoro de los inocentes (En vivo)", 
                    "La piba de Blockbuster (En vivo)", "To beef or not to beef (En vivo)", 
                    "Jijiji (En vivo)", "Mi perro dinamita (En vivo)", "Bienaventurados (En vivo)"
                ] 
            },
            { 
                title: "El ruiseñor, el amor y la muerte", 
                cover: "img/Fundamentalistas/elruisenor.jpg", 
                year: 2018, 
                songs: [
                    "Pinturas de guerra", "La oscuridad", "El callejón de los milagros", 
                    "El ruiseñor, el amor y la muerte", "Strangerdanger", "El martillo de las brujas", 
                    "El tío Alberto en el día de la bicicleta", "Canción para un terrorista de mierda", 
                    "La pequeña mamba", "La moda no es vanguardia", "A bailar que no hay infierno", 
                    "La ciudad de los encandilados", "Ostende Hotel", "Panasonic y el mundo a sus pies", 
                    "El que la seca la llena"
                ] 
            }
        ]
    },
    {
        id: 29,
        name: "Turf",
        bio: "Joaquín Levinton y el rock de fiesta. Con una mezcla explosiva de britpop, rock clásico y humor, Turf creó verdaderos himnos de estadio. Sus estribillos pegadizos y su carisma inagotable los convirtieron en la banda sonora de la diversión y la noche porteña.",
        image: "img/Turf/turf.jpg",
        topSongs: ["Loco un poco", "Pasos al costado", "Magia blanca"],
        discography: [
            { 
                title: "Una pila de vida", 
                cover: "img/Turf/unapila.jpg", 
                year: 1997, 
                songs: [
                    "K.O.", "Beatle", "Panorama", "Viene llegando", 
                    "Casanova", "Tarjeta postal", "Desconocidos", "Tocando el cielo", 
                    "Espectáculo", "Cerca del sol", "Milagro en el mar", "Crónica Teve"
                ] 
            },
            { 
                title: "Siempre libre", 
                cover: "img/Turf/siemprelibre.jpg", 
                year: 1999, 
                songs: [
                    "Siempre libre", "Me hace sentir", "Valeria del Mar", "Piolín", 
                    "Avenida Alcorta", "Mala suerte", "Esa luz", "Tu magia", 
                    "El jugador", "Más allá", "Aterrizar", "Falsos"
                ] 
            },
            { 
                title: "Turfshow", 
                cover: "img/Turf/turfshow.jpg", 
                year: 2001, 
                songs: [
                    "La emoción", "Loco un poco", "Cuatro personalidades", "Mambo", 
                    "Vade retro", "Día especial", "El centro musical", "Delfines", 
                    "A mil", "Ranchera", "Chau", "La chispa de mi mente"
                ] 
            },
            { 
                title: "Para mí, para vos", 
                cover: "img/Turf/paramiparavos.jpg", 
                year: 2004, 
                songs: [
                    "Para mí, para vos", "No se llama amor", "Pasos al costado", "Oh Dios!", 
                    "Diario de amores", "Magia blanca", "El espectador", "Nos vamos a ir", 
                    "Sépalo", "Quiero seguir así", "Vil metal", 
                    "Amor electrodoméstico", "Acaso no se da cuenta usted?"
                ] 
            },
            { 
                title: "Odisea", 
                cover: "img/Turf/odisea.jpg", 
                year: 2017, 
                songs: [
                    "Disconocidos", "Hablo solo", "¿Cuál?", "No robles laureles", 
                    "Eclipse", "Contacto", "La noche en la ciudad", "Los amantes de Tic-Tac", 
                    "Desorden", "Sexto sentido", "Porque te quiero", "Cumbio"
                ] 
            },
            { 
                title: "En vivo en el Teatro Ópera (En Vivo)", 
                cover: "img/Turf/envivo.jpg", 
                year: 2020, 
                songs: [
                    "No se llama amor (En vivo)", "Disconocidos (En vivo)", "Loco un poco (En vivo)", 
                    "Magia blanca (En vivo)", "Cuatro personalidades (En vivo)", "Hablo solo (En vivo)", 
                    "Pasos al costado (En vivo)", "Vade retro (En vivo)", "Yo no me quiero casar, ¿y usted? (En vivo)", 
                    "Casanova (En vivo)", "Crónica Teve (En vivo)", "Lamento boliviano (En vivo)"
                ] 
            },
            { 
                title: "Renacimiento", 
                cover: "img/Turf/renacimiento.jpg", 
                year: 2023, 
                songs: [
                    "Todo por nada", "Gatitas y ratones", "Malas decisiones", "Cuál es el plan?", 
                    "Decímelo de una", "Sentimientos encontrados", "Ese ser", "Jueves", 
                    "Ahí voy", "Alto flash", "Voy dejando atrás"
                ] 
            }
        ]
    },
    {
        id: 30,
        name: "Skay Beilinson",
        bio: "El corazón de Patricio Rey. Eduardo 'Skay' Beilinson, la guitarra y el alma musical de los Redondos, construyó una carrera solista impecable junto a Los Fakires. Su sonido es inconfundible: místico, oriental y rockero, manteniendo la esencia ricotera pero viajando hacia nuevos horizontes.",
        image: "img/Skay/skaybeilinson.jpg",
        topSongs: ["Oda a la sin nombre", "El fantasma del 5to piso", "Flores secas"],
        discography: [
            { 
                title: "A través del mar de los sargazos", 
                cover: "img/Skay/sargazos.jpg", 
                year: 2002, 
                songs: [
                    "Gengis Khan", "Kermesse", "El pozo de la serpiente", "Alcolito", 
                    "Kazoo", "Oda a la sin nombre", "Memoria de un paria", "Con los ojos cerrados", 
                    "Síndrome del trapecista", "Astrolabio", "Entre el cielo y la tierra", 
                    "La grieta", "Lágrimas y cenizas"
                ] 
            },
            { 
                title: "Talismán", 
                cover: "img/Skay/talisman.jpg", 
                year: 2004, 
                songs: [
                    "El gourmet del infierno", "Flores secas", "¿Dónde estás?", "Dragones", 
                    "Abalorios", "Boggart Blues", "Pasaje a ninguna parte", "Presagio", 
                    "Paria", "El fantasma del 5to piso", "Bye Bye", "El golem de Paternal"
                ] 
            },
            { 
                title: "La marca de Caín", 
                cover: "img/Skay/lamarca.jpg", 
                year: 2007, 
                songs: [
                    "Ángeles caídos", "Canción de cuna", "Los caminos del viento", "Arcano XIV", 
                    "El viaje de las partículas", "Tal vez mañana", "El fantasma de la ópera", 
                    "Meroe y los sorceros", "Territorio caníbal", "Soldaditos de plomo"
                ] 
            },
            { 
                title: "¿Dónde vas?", 
                cover: "img/Skay/dondevas.jpg", 
                year: 2010, 
                songs: [
                    "La luna en Fez", "En el camino", "Aves migratorias", "Territorio caníbal", 
                    "La rueda de las vanidades", "Tarde de lluvia", "El redentor secreto", 
                    "Tu sombra y mi voz", "Palomas y escaleras", "La pared rojo lacre", 
                    "Suelo chamuyado", "Lejos de casa", "Aplausos en el cosmos"
                ] 
            },
            { 
                title: "La luna hueca", 
                cover: "img/Skay/lalunahueca.jpg", 
                year: 2013, 
                songs: [
                    "Sombra golondrina", "Ya lo sabés", "La fiesta del karma", "Las tretas de Zatanás", 
                    "Falenas en celo", "Arriba el telón", "La nube, el globo y el río", 
                    "El sueño del jinete", "Cicatrices", "La última primavera"
                ] 
            },
            { 
                title: "El engranaje de cristal", 
                cover: "img/Skay/engranaje.jpg", 
                year: 2016, 
                songs: [
                    "Cáscaras", "Quisiera llevarte", "El equilibrista", "En la fragua", 
                    "La procesión", "Chico bomba", "Egotrip", "El carguero del sur", 
                    "Plegaria", "Epílogo"
                ] 
            },
            { 
                title: "En el corazón del laberinto", 
                cover: "img/Skay/laberinto.jpg", 
                year: 2019, 
                songs: [
                    "El sueño de la calle Nueva York", "El ojo testigo", "Late", "El valor del encanto", 
                    "Tam-Tam", "Plumas de cóndor al viento", "En la cueva de San Andrés", 
                    "Las flores del tiempo", "Espejismos", "El abuelo"
                ] 
            },
            { 
                title: "Espejismos", 
                cover: "img/Skay/espejismos.jpg", 
                year: 2023, 
                songs: [
                    "La trama invisible", "Carrousel", "Un fugaz resplandor", "Palomas y escaleras", 
                    "Inventario", "Otras puertas otros mundos", "El candor de las bestias", 
                    "Corre corre corre", "¡Corre!", "Yo soy la máquina", "La estampa del buen pastor"
                ] 
            }
        ]
    },
    {
        id: 31,
        name: "Pescado Rabioso",
        bio: "La cumbre creativa de Spinetta. Tras la ruptura de Almendra, el 'Flaco' formó este cuarteto de hard rock, blues y psicodelia. Aunque duró poco, dejó una huella imborrable con su sonido visceral y poético. Su disco 'Artaud' es considerado unánimemente la obra maestra del rock argentino.",
        image: "img/Pescado/pescadorabioso.jpg",
        topSongs: ["Cementerio Club", "Me gusta ese tajo", "Post-crucifixión"],
        discography: [
            { 
                title: "Desatormentándonos", 
                cover: "img/Pescado/desatormentandonos.jpg", 
                year: 1972, 
                songs: [
                    "Blues de Cris", "El jardinero (temprano amaneció)", "Dulce 3 nocturno", 
                    "El monstruo de la laguna", "Serpiente (viaja por la sal)", 
                    "Me gusta ese tajo", "Despiértate nena", "Post-crucifixión"
                ] 
            },
            { 
                title: "Pescado 2", 
                cover: "img/Pescado/pescado2.jpg", 
                year: 1973, 
                songs: [
                    "Panadero ensoñado", "Iniciado del alba", "Poseído del alba", 
                    "Como el viento voy a ver", "Viajero naciendo", "Mañana o pasado", 
                    "Nena boba", "Madre-selva", "Peteribí", "16'' de Peteribí", 
                    "Señorita", "Credulidad", "Hola dulce viento", 
                    "Amame peteribí", "Cristálida", "Aguas claras de olimpos"
                ] 
            },
            { 
                title: "Artaud", 
                cover: "img/Pescado/artaud.jpg", 
                year: 1973, 
                songs: [
                    "Todas las hojas son del viento", "Cementerio Club", "Por", 
                    "Superchería", "La sed verdadera", "Cantata de puentes amarillos", 
                    "Bajan", "A Starosta el idiota", "Las habladurías del mundo"
                ] 
            }
        ]
    },
    {
        id: 32,
        name: "Sui Generis",
        bio: "El comienzo de todo. Charly García y Nito Mestre formaron el dúo folk que le puso voz y sentimiento a la adolescencia de un país entero. Sus letras, entre la ingenuidad y la crítica social, y sus melodías perfectas, son el ABC del rock nacional.",
        image: "img/SuiGeneris/suigeneris.jpg",
        topSongs: ["Canción para mi muerte", "Rasguña las piedras", "Confesiones de invierno"],
        discography: [
            { 
                title: "Vida", 
                cover: "img/SuiGeneris/vida.jpg", 
                year: 1972, 
                songs: [
                    "Canción para mi muerte", "Necesito", "Estación", "Toma dos blues", 
                    "Natalio Ruiz, el hombrecito del sombrero gris", "Mariel y el capitán", 
                    "Amigo, vuelve a casa pronto", "Quizás, porque", "Cuando comenzamos a nacer", 
                    "Posludio"
                ] 
            },
            { 
                title: "Confesiones de invierno", 
                cover: "img/SuiGeneris/confesiones.jpg", 
                year: 1973, 
                songs: [
                    "Cuando ya me empiece a quedar solo", "Bienvenidos al tren", "Un hada, un cisne", 
                    "Confesiones de invierno", "Rasguña las piedras", "Lunes otra vez", 
                    "Aprendizaje", "Mr. Jones, o pequeña semblanza de una familia tipo americana", 
                    "Tribulaciones, lamento y ocaso de un tonto rey imaginario, o no"
                ] 
            },
            { 
                title: "Pequeñas anécdotas sobre las instituciones", 
                cover: "img/SuiGeneris/instituciones.jpg", 
                year: 1974, 
                songs: [
                    "Instituciones", "Tango en segunda", "El show de los muertos", 
                    "Las increíbles aventuras del Sr. Tijeras", "Pequeñas delicias de la vida conyugal", 
                    "El tuerto y los ciegos", "Música de fondo para cualquier fiesta animada", 
                    "Tema de Natalio"
                ] 
            },
            { 
                title: "Adiós Sui Géneris (En Vivo)", 
                cover: "img/SuiGeneris/adios.jpg", 
                year: 1975, 
                songs: [
                    "Instituciones (En vivo)", "La niña juega en el gran jardín (En vivo)", 
                    "El fantasma de Canterville (En vivo)", "Para quién canto yo entonces (En vivo)", 
                    "Bubulina (En vivo)", "Nena (En vivo)", "Confesiones de invierno (En vivo)", 
                    "Aprendizaje (En vivo)", "Un hada, un cisne (En vivo)", "Rasguña las piedras (En vivo)", 
                    "Canción para mi muerte (En vivo)", "Blues del levante (En vivo)"
                ] 
            },
            { 
                title: "Sinfonías para adolescentes", 
                cover: "img/SuiGeneris/sinfonias.jpg", 
                year: 2000, 
                songs: [
                    "El día que apagaron la luz", "Úsame un poquito más", "Yo soy su papá", 
                    "Afuera de la ciudad", "Tu pueblo también", "Diganlé", 
                    "No es el fin", "Todos van al same place", "Ten pena", 
                    "Aquí sin tu amor", "Aguante la amistad", "El chico y yo", 
                    "Espejos", "Monoblock", "Me tiré por vos", "Noveno B"
                ] 
            },
            { 
                title: "Si - Detrás de las paredes (En Vivo)", 
                cover: "img/SuiGeneris/si.jpg", 
                year: 2001, 
                songs: [
                    "Cuando ya me empiece a quedar solo (En vivo)", "Rasguña las piedras (En vivo)", 
                    "Tribulaciones... (En vivo)", "Instituciones (En vivo)", 
                    "Canción para mi muerte (En vivo)", "El día que apagaron la luz (En vivo)", 
                    "Confesiones de invierno (En vivo)", "Telepáticamente (En vivo)"
                ] 
            }
        ]
    },
    {
        id: 33,
        name: "Pier",
        bio: "Rock y heroísmo. Los hermanos Ramiro y Agustín Cerezo lideran esta banda que tomó la posta de la mística ricotera en el nuevo milenio. Con letras épicas, guitarras distorsionadas y un público fiel ('Los pibes atentos'), se convirtieron en referentes ineludibles del rock barrial.",
        image: "img/Pier/pier.jpg",
        topSongs: ["Sacrificio y Rock'n Roll", "La ilusión que me condena", "Jaque mate"],
        discography: [
            { 
                title: "La Codiciada", 
                cover: "img/Pier/lacodiciada.jpg", 
                year: 1999, 
                songs: [
                    "La codiciada", "El ritual de los pibes atentos", "Chiquilín", "Sra. de los milagros", 
                    "Laberintos", "Ojos de niño", "El trago", "Caretas", 
                    "El tiempo", "El cazador"
                ] 
            },
            { 
                title: "El Fuego Sagrado", 
                cover: "img/Pier/elfuegosagrado.jpg", 
                year: 2000, 
                songs: [
                    "El fuego sagrado", "La reina del placer", "El narigón", "Princesa del norte", 
                    "El ángel de la soledad", "El rey de la vanidad", "Amanecer en la eternidad", 
                    "S.O.S.", "Cigarrillos", "El mago de la suerte"
                ] 
            },
            { 
                title: "Gladiadores del Rock", 
                cover: "img/Pier/gladiadores.jpg", 
                year: 2001, 
                songs: [
                    "Gladiadores del rock", "El favor", "El show de la mentira", "Quiero verte bailar", 
                    "Canción de libertad", "La cruz", "Maldito duende", "El rocanrol de la ilusión", 
                    "Risas del adiós", "Viento frío"
                ] 
            },
            { 
                title: "Seguir Latiendo", 
                cover: "img/Pier/seguirlatiendo.jpg", 
                year: 2004, 
                songs: [
                    "Sacrificio y Rock'n Roll", "La ilusión que me condena", "Al borde", 
                    "Luna de Avellaneda", "Ángeles del olvido", "El refugio", 
                    "Desvelado", "No me dejes caer", "Morir de pie", 
                    "Por tu nombre", "Dámaso", "La reina del placer (Versión 2004)"
                ] 
            },
            { 
                title: "Alucinados como la primera vez (En Vivo)", 
                cover: "img/Pier/alucinados.jpg", 
                year: 2006, 
                songs: [
                    "El ritual de los pibes atentos (En vivo)", "La codiciada (En vivo)", "Sacrificio y Rock'n Roll (En vivo)", 
                    "La ilusión que me condena (En vivo)", "Luna de Avellaneda (En vivo)", "Gladiadores del rock (En vivo)", 
                    "El fuego sagrado (En vivo)", "Jaque mate (En vivo)", "Al borde (En vivo)", 
                    "Ángeles del olvido (En vivo)", "Quiero verte bailar (En vivo)", "Sra. de los milagros (En vivo)"
                ] 
            },
            { 
                title: "Rock en Monsterland", 
                cover: "img/Pier/monsterland.jpg", 
                year: 2007, 
                songs: [
                    "Jaque mate", "Ruta de escape", "El comodín", "On the road", 
                    "Banquete pasional", "La gran comedia", "Todo es rock and roll", 
                    "El reino del placer", "Locura celestial", "Obsesión"
                ] 
            },
            { 
                title: "Popular Mística", 
                cover: "img/Pier/popularmistica.jpg", 
                year: 2009, 
                songs: [
                    "Herido y coleando", "Amor de descansar", "El barco", "Días de emoción", 
                    "Pregoneros", "Buscando un amor", "Tu vuelo", "Futuro problemático", 
                    "La bomba", "Un día más", "Lobo suelto"
                ] 
            },
            { 
                title: "Desde las sombras (En Vivo)", 
                cover: "img/Pier/desdelassombras.jpg", 
                year: 2011, 
                songs: [
                    "Jaque mate (En vivo)", "Banquete pasional (En vivo)", "Herido y coleando (En vivo)", 
                    "Ruta de escape (En vivo)", "El comodín (En vivo)", "Sacrificio y Rock'n Roll (En vivo)", 
                    "On the road (En vivo)", "Amor de descansar (En vivo)", "La ilusión que me condena (En vivo)"
                ] 
            },
            { 
                title: "Brindaremos", 
                cover: "img/Pier/brindaremos.jpg", 
                year: 2014, 
                songs: [
                    "Brindaremos", "Caminos", "Puerta de oro", "Beso amargo", 
                    "Los sueños de la nada", "Viejo kovalski", "Lentes negros", 
                    "La botella", "Esa foto", "Despierto"
                ] 
            },
            { 
                title: "La emoción de la oveja negra", 
                cover: "img/Pier/ovejanegra.jpg", 
                year: 2018, 
                songs: [
                    "Todo el tiempo", "Soldados de la gruesa", "Quiero", "Mundo real", 
                    "La emoción de la oveja negra", "En tu tumba", "Abran", 
                    "Fuego", "Max"
                ] 
            }
        ]
    },
    {
        id: 34,
        name: "Los Tipitos",
        bio: "Canciones que llegan al corazón. Del under de la peatonal a los grandes escenarios, Los Tipitos construyeron una carrera sólida basada en melodías beatle, armonías vocales y letras emotivas. Son los autores de algunos de los clásicos más grandes del pop-rock argentino de los 2000.",
        image: "img/Tipitos/tipitos.jpg",
        topSongs: ["Campanas en la noche", "Brujería", "Silencio"],
        discography: [
            { 
                title: "Los Tipitos (Primera Grabación)", 
                cover: "img/Tipitos/primeragrabacion.jpg", 
                year: 1996, 
                songs: [
                    "La gorda", "El poli", "Pintura", "Marcador", 
                    "Cuervos", "El ojo", "Mono", "Fumar", 
                    "No me tengan miedo", "La gorda II"
                ] 
            },
            { 
                title: "Cocrouchis", 
                cover: "img/Tipitos/cocrouchis.jpg", 
                year: 1999, 
                songs: [
                    "Cocrouchis", "Búsquela", "Quién va a saber", "Ex", 
                    "Mil años", "El poli", "Mesa 9", "Rock del bombero", 
                    "Sábados blancos", "El amor", "No me tengas miedo", "Mear en la leche"
                ] 
            },
            { 
                title: "Vintage", 
                cover: "img/Tipitos/vintage.jpg", 
                year: 2001, 
                songs: [
                    "Búsquela", "Como una hoguera", "Trip", "10.000 Kms", 
                    "Real", "Balada para un loco", "El ojo"
                ] 
            },
            { 
                title: "Contra los molinos", 
                cover: "img/Tipitos/contralosmolinos.jpg", 
                year: 2002, 
                songs: [
                    "Contra los molinos", "Jurame", "Corazón de perro", "Flasheadito", 
                    "Presente", "Canción de cuna para el niño astronauta", "Esa forma de viajar", 
                    "Agua", "Funeral", "Libertad", "El mudo", "Vivillo", "Solo se"
                ] 
            },
            { 
                title: "Armando Camaleón", 
                cover: "img/Tipitos/armandocamaleon.jpg", 
                year: 2004, 
                songs: [
                    "Brujería", "Silencio", "Campanas en la noche", "Algo", 
                    "Solo figuras", "Mil intentos", "Siguiendo la luna", "El apostador", 
                    "Tarde de sol", "Un mañana", "Para explicarte", "Hacia el sur"
                ] 
            },
            { 
                title: "Tiporex (En Vivo)", 
                cover: "img/Tipitos/tiporex.jpg", 
                year: 2006, 
                songs: [
                    "El poli (En vivo)", "Brujería (En vivo)", "Campanas en la noche (En vivo)", 
                    "Silencio (En vivo)", "Búsquela (En vivo)", "Mil años (En vivo)", 
                    "Sábados blancos (En vivo)", "Algo (En vivo)", "Solo figuras (En vivo)", 
                    "Corazón de perro (En vivo)", "Flasheadito (En vivo)", "Jurame (En vivo)"
                ] 
            },
            { 
                title: "Tan Real", 
                cover: "img/Tipitos/tanreal.jpg", 
                year: 2007, 
                songs: [
                    "Flor negra", "Vívelo", "Se te nota", "En la vía", 
                    "Más allá de los dos", "Tu carta", "Esa mujer", "Te vas", 
                    "Gatillo", "Miedo", "Tan real", "Loca", "Esa mañana", "Abismo"
                ] 
            },
            { 
                title: "El Club de los Martes", 
                cover: "img/Tipitos/elclub.jpg", 
                year: 2010, 
                songs: [
                    "Laberinto", "Reírnos del amor", "Para qué", "Una adiós", 
                    "Juntemonos", "Y la hizo boleta", "Ojos de loca", "Amor de enero", 
                    "La mitad", "Verano del 79", "El cambio", "Sábados blancos"
                ] 
            },
            { 
                title: "Push", 
                cover: "img/Tipitos/push.jpg", 
                year: 2013, 
                songs: [
                    "La ley de la ferocidad", "Viaje interminable", "Algo nuevo", "Mil años", 
                    "Apostar al amor", "Mejor", "Amor de verano", "Funeral", 
                    "Resplandor", "Pensando en ti", "Un dios", "Saludo al sol"
                ] 
            },
            { 
                title: "Ojos Tremendos", 
                cover: "img/Tipitos/ojostremendos.jpg", 
                year: 2016, 
                songs: [
                    "Que importa", "Gritando en la radio", "Un mito", "El origen de la tristeza", 
                    "Canto de sirenas", "Basura", "Promesas vacías", "Ojos tremendos", 
                    "Novia de los galaxias", "Mario", "Una maquina", "Cuando"
                ] 
            },
            { 
                title: "De mi flor", 
                cover: "img/Tipitos/demiflor.jpg", 
                year: 2019, 
                songs: [
                    "La sanatera", "Mujer, niña y amiga", "Río", "Las cruces", 
                    "Andando", "El encuentro", "Los domingos", "Abro las manos", 
                    "Canción pa mi dolor", "Prendido a una guitarra"
                ] 
            },
            { 
                title: "Días por venir", 
                cover: "img/Tipitos/diasporvenir.jpg", 
                year: 2022, 
                songs: [
                    "Labios mercenarios", "Ex (Versión 2022)", "Imposible", "El show", 
                    "Llévame", "Viaje", "Miedo", "Loca (Versión 2022)", 
                    "Silencio (Versión 2022)", "Campanas en la noche (Versión 2022)"
                ] 
            }
        ]
    },
    {
        id: 35,
        name: "Jóvenes Pordioseros",
        bio: "Descontrolado rock and roll. Liderados por el carismático Toti Iglesias, encarnan la esencia más fiestera y barrial del rock stone. Sus shows son un ritual de banderas, sudor y estribillos gancheros que celebran la noche, el barrio y el desamor.",
        image: "img/Pordioseros/pordioseros.jpg",
        topSongs: ["Descontrolado", "Nunca me enseñaste", "105 y 3"],
        discography: [
            { 
                title: "Probame", 
                cover: "img/Pordioseros/probame.jpg", 
                year: 2001, 
                songs: [
                    "Probame", "Vértigo", "Cuando me muera", "Quiero tocar", 
                    "Todo me chupa un huevo", "Veneno", "Bailando", "Dale", 
                    "Chica de rojo", "El tiempo", "Voy a morirme", "Rock del pedazo"
                ] 
            },
            { 
                title: "Vicio", 
                cover: "img/Pordioseros/vicio.jpg", 
                year: 2004, 
                songs: [
                    "Descontrolado", "105 y 3", "Nunca me enseñaste", "Vicio", 
                    "Maldito San Telmo", "Esto no se ve", "Veneno (Versión Vicio)", 
                    "Llevate mis penas", "Voy a enloquecer", "Dame", 
                    "Ruta 2", "Hija del mal", "Bailando (Versión Vicio)"
                ] 
            },
            { 
                title: "Sangre", 
                cover: "img/Pordioseros/sangre.jpg", 
                year: 2006, 
                songs: [
                    "Pegado", "Pánico", "Hijo del oeste", "Dame (Versión Sangre)", 
                    "La banda", "Estatua", "Tontos", "Desperté", 
                    "Funeral", "Rock para pendejos", "Cae", "Sangre"
                ] 
            },
            { 
                title: "Abstinencia", 
                cover: "img/Pordioseros/abstinencia.jpg", 
                year: 2011, 
                songs: [
                    "Asesina", "Desvelado", "Alta gata", "Nadie nos va a parar", 
                    "Hermanos", "Dale que va", "Excusas", "Sola", 
                    "Dos copas", "Estás ahí", "Cosas de la vida"
                ] 
            },
            { 
                title: "Pánico", 
                cover: "img/Pordioseros/panico.jpg", 
                year: 2014, 
                songs: [
                    "Pánico (2014)", "Lobo", "Culpable", "Eternamente", 
                    "Volar bajo", "Juan del oeste", "Condenado", "Gaby", 
                    "Muerte cerebral", "No la quiero dejar", "Dejame entrar", "Ruta 2 (Acústico)"
                ] 
            },
            { 
                title: "Late", 
                cover: "img/Pordioseros/late.jpg", 
                year: 2017, 
                songs: [
                    "Late", "Eterno", "Guapa", "Cuerdas", 
                    "Fuego", "Cazador", "Libertad", "Vuelan", 
                    "Alucinando", "Humo", "Pausa", "Te daré"
                ] 
            },
            { 
                title: "Viva el Rock and Roll (En Vivo)", 
                cover: "img/Pordioseros/vivaelrock.jpg", 
                year: 2019, 
                songs: [
                    "Pegado (En vivo)", "Vértigo (En vivo)", "Lobo (En vivo)", 
                    "Nunca me enseñaste (En vivo)", "105 y 3 (En vivo)", "Todavía no puedo (En vivo)", 
                    "Late (En vivo)", "Pánico (En vivo)", "Culpable (En vivo)", 
                    "Descontrolado (En vivo)", "Hijo del oeste (En vivo)"
                ] 
            }
        ]
    },
    {
        id: 36,
        name: "Attaque 77",
        bio: "Punk rock con sentimiento obrero. Nacidos a finales de los 80, pasaron del punk adolescente a convertirse en una de las bandas más grandes de Latinoamérica. Con himnos como 'Hacelo por mí' y 'Arrancacorazones', sus canciones atravesaron generaciones y clases sociales.",
        image: "img/Attaque/attaque77.jpg",
        topSongs: ["Hacelo por mi", "Arrancacorazones", "No me arrepiento de este amor"],
        discography: [
            { 
                title: "Dulce Navidad", 
                cover: "img/Attaque/dulcenavidad.jpg", 
                year: 1989, 
                songs: [
                    "Hay una bomba en el colegio", "Me volviste a engañar", "Gil", "Papa llegó borracho", 
                    "Caminando por el microcentro", "Sola en la cancha", "No te quiero más", "Pasión de multitudes"
                ] 
            },
            { 
                title: "El cielo puede esperar", 
                cover: "img/Attaque/elcielo.jpg", 
                year: 1990, 
                songs: [
                    "El cielo puede esperar", "Más de un millón", "Espadas y serpientes", 
                    "Un momento de meditación", "Hacelo por mí", "Vuelve a casa", 
                    "Donde las águilas se atreven", "B.A.D.", "Pagar o morir", 
                    "No te pudiste aguantar", "Tiempo para estar"
                ] 
            },
            { 
                title: "Ángeles caídos", 
                cover: "img/Attaque/angelescaidos.jpg", 
                year: 1992, 
                songs: [
                    "Ángeles caídos", "Cuanta cerveza", "Justicia", "Lo que quieras", 
                    "Chicos y perros", "Como Billy the Kid", "América", 
                    "Dificil de entender", "Días de escuela", "Porque te vas"
                ] 
            },
            { 
                title: "Todo está al revés", 
                cover: "img/Attaque/todoestaalreves.jpg", 
                year: 1994, 
                songs: [
                    "Todo está al revés", "Pagaría por no verte", "Flores robadas", 
                    "Alza tu voz", "15", "Gated", "Héroe de nadie", 
                    "Vida monótona", "Bajo las nubes", "El cuarto", "Luz"
                ] 
            },
            { 
                title: "Amén!", 
                cover: "img/Attaque/amen.jpg", 
                year: 1995, 
                songs: [
                    "El perro", "Degeorgia", "San Fermín", "Tres pájaros negros", 
                    "El gran chaparral", "Muerta", "2 de abril", "Redemption song", 
                    "Fábrica", "Héroes de nadie", "Santiago"
                ] 
            },
            { 
                title: "Un día perfecto (U.D.P)", 
                cover: "img/Attaque/undia.jpg", 
                year: 1997, 
                songs: [
                    "Cambios", "Crecer", "Perfección", "Áspero", "Onírico", 
                    "Ángel", "Qué vas a hacer?", "H.I.V.", "Mensaje", 
                    "Cinco estrellas", "Luz", "Numancia", "Jodie", "Héroe"
                ] 
            },
            { 
                title: "Otras Canciones", 
                cover: "img/Attaque/otrascanciones.jpg", 
                year: 1998, 
                songs: [
                    "No me arrepiento de este amor", "Amigo", "Beat on the brat", 
                    "Callejero", "Dame fuego", "El jorobadito", "Perfección", 
                    "Do you wanna dance?", "Escucha tu corazón", "Soy rebelde", "A mi manera"
                ] 
            },
            { 
                title: "Radio Insomnio", 
                cover: "img/Attaque/radioinsomnio.jpg", 
                year: 2000, 
                songs: [
                    "El pobre", "Beatle", "El ciruja", "Vacaciones permanentes", 
                    "Caballito de hierro", "Canción inútil", "Jodie", "Los tiburones", 
                    "Ojos de perro", "Nuestros años felices", "Resistiré"
                ] 
            },
            { 
                title: "Trapos (En Vivo)", 
                cover: "img/Attaque/trapos.jpg", 
                year: 2001, 
                songs: [
                    "Perfección (En vivo)", "Cambios (En vivo)", "El cielo puede esperar (En vivo)", 
                    "Soy rebelde (En vivo)", "Chicos y perros (En vivo)", "Cinco estrellas (En vivo)", 
                    "El jorobadito (En vivo)", "Hacelo por mí (En vivo)", "El perro (En vivo)", 
                    "No me arrepiento de este amor (En vivo)", "Dame fuego (En vivo)", "Espadas y serpientes (En vivo)"
                ] 
            },
            { 
                title: "Antihumano", 
                cover: "img/Attaque/antihumano.jpg", 
                year: 2003, 
                songs: [
                    "Echo fuego", "Western", "Ojos de perro", "Los tiburones", 
                    "Morbo", "Arrancacorazones", "Barreda's Way", "Setentistas", 
                    "Iemanja", "Surfeando en el soretero", "Antihumano", "Reality-Joe"
                ] 
            },
            { 
                title: "Karmagedon", 
                cover: "img/Attaque/karmagedon.jpg", 
                year: 2007, 
                songs: [
                    "Ejército de salvación", "Cartonero", "Buenos Aires en llamas", "Vórtice", 
                    "Fiebre de sábado", "Plaza de perros", "Matar dragones", "Chance", 
                    "Antorcha", "Sangre", "Juguete"
                ] 
            },
            { 
                title: "Estallar", 
                cover: "img/Attaque/estallar.jpg", 
                year: 2009, 
                songs: [
                    "Días de desempleo", "Tiempo perdido", "Desamor", "Memoria", 
                    "Dale poder", "Anormal", "Tucho", "Cruz", 
                    "Que nos pasó?", "Juran", "Desesperada", "Estallar"
                ] 
            },
            { 
                title: "Acústico en el Teatro Ópera (En Vivo)", 
                cover: "img/Attaque/acustico.jpg", 
                year: 2012, 
                songs: [
                    "El cielo puede esperar (Acústico)", "Espadas y serpientes (Acústico)", "Arrancacorazones (Acústico)", 
                    "Western (Acústico)", "Hacelo por mí (Acústico)", "Beatle (Acústico)", 
                    "Chance (Acústico)", "Setentistas (Acústico)", "No me arrepiento de este amor (Acústico)"
                ] 
            },
            { 
                title: "Triángulo de Fuerza", 
                cover: "img/Attaque/triangulo.jpg", 
                year: 2019, 
                songs: [
                    "Como salvajes", "María", "Canto eterno", "Lobotomizado", 
                    "Huérfanos", "Sin tierra", "Babel", "A cielo abierto", 
                    "Última generación", "Soldaditos"
                ] 
            }
        ]
    },
];
// ==========================================
//  RUTAS (API)
// ==========================================

// 1. Ruta de prueba (Home del servidor)
app.get('/', (req, res) => {
    res.send('<h1>¡Servidor de Rockify Funcionando! 🎸</h1><p>Entra a <a href="/api/artists">/api/artists</a> para ver los datos.</p>');
});

// 2. Obtener TODOS los artistas
app.get('/api/artists', (req, res) => {
    res.json(artistsData);
});

// 3. Obtener UN artista por ID
app.get('/api/artists/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const artist = artistsData.find(a => a.id === id);
    
    if (artist) {
        res.json(artist);
    } else {
        res.status(404).json({ message: "Artista no encontrado" });
    }
});

// ==========================================
//          ENCENDER SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor escuchando en: http://localhost:${PORT}`);
    console.log(`📡 API de Artistas: http://localhost:${PORT}/api/artists\n`);
});

app.get('/', (req, res) => {
   res.send('<h1>¡Servidor de Rockify Funcionando! 🎸</h1>...');
});