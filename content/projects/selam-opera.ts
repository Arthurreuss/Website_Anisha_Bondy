// Quellen: docs/INHALTE.md §3 (Selam Opera!, Pop-Up-Clips) und §4 (Presse/Preis).
// Pop-Up-Opera und Operndolmuş werden laut D-017 als ein Projekt geführt.
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'selam-opera',
  title: 'Selam Opera!',
  subtitle: { en: 'Pop-up opera & Operndolmuş · Participatory format', de: 'Pop-Up-Opera & Operndolmuş · Partizipatives Format' },
  venue: 'Komische Oper Berlin',
  year: 2015,
  yearLabel: '2015–2022',
  pillar: 'participate',
  role: { en: 'Creative Director & Stage Director', de: 'Creative Director & Regie' },
  tags: { en: ['Pop-up opera', 'Intercultural', 'Public space'], de: ['Pop-Up-Opera', 'Interkulturell', 'Öffentlicher Raum'] },
  cover: {
    // Operndolmuş-Abfahrt aus dem Dokumentarfilm „Eine Opernreise“ (D-053)
    type: 'video',
    src: '/media/selam-opera/cover.mp4',
    poster: '/media/selam-opera/cover-poster.jpg',
    alt: {
      en: 'The Operndolmuş minibus with the lettering “Selam Opera!” sets off; a singer waves from the window, water is poured after it.',
      de: 'Der Operndolmuş mit der Aufschrift „Selam Opera!“ fährt los, eine Sängerin winkt aus dem Fenster, hinterher wird Wasser gegossen.',
    },
    width: 576,
    height: 720,
    credit: 'Film: Komische Oper Berlin',
  },
  intro: {
    en: [
      'Selam Opera! took opera out of the house and into the city: singers and musicians of the Komische Oper Berlin performed short pop-up scenes on markets, in a boxing club, a nightclub and other everyday places. Artistic director: Mustafa Akça; creative director and stage director: Anisha Bondy.',
      'Its best-known chapter, the Operndolmuş, retraced the historical route of the Turkish “guest worker” generation from Berlin to Istanbul by minibus, with performances and shared stories along the way – awarded the BKM Prize for Cultural Education in 2017. The project ran from 2015 to 2022.',
      'The Operndolmuş toured several times: “Gastarbeiterroute” (2016), “In zwei Heimaten zu Hause” (At Home in Two Homelands, 2016–2019) and “Kesin Dönüş” (Final Return, 2019–2020). In 2018 it also premiered “Ben und Henry – ein Operndolmuş für Kinder”, an Operndolmuş for children, with music by Attila Kadri Şendil and libretto by Susanne Wolf.',
    ],
    de: [
      'Selam Opera! holte die Oper aus dem Haus und in die Stadt: Sänger:innen und Musiker:innen der Komischen Oper Berlin bespielten mit kurzen Pop-Up-Szenen Märkte, einen Boxclub, einen Nachtclub und andere Alltagsorte. Künstlerische Leitung: Mustafa Akça; Creative Director und Regie: Anisha Bondy.',
      'Das bekannteste Kapitel, der Operndolmuş, folgte mit einem Kleinbus der historischen Route der türkischen „Gastarbeiter“-Generation von Berlin nach Istanbul, mit Auftritten und geteilten Geschichten unterwegs – ausgezeichnet mit dem BKM-Preis Kulturelle Bildung 2017. Das Projekt lief von 2015 bis 2022.',
      'Der Operndolmuş fuhr mehrfach: „Gastarbeiterroute“ (2016), „In zwei Heimaten zu Hause“ (2016–2019) und „Kesin Dönüş“ (2019–2020). 2018 feierte außerdem „Ben und Henry – ein Operndolmuş für Kinder“ Uraufführung, mit Musik von Attila Kadri Şendil und Libretto von Susanne Wolf.',
    ],
  },
  gallery: [
    {
      type: 'single',
      label: { en: 'Departure', de: 'Abfahrt' },
      media: {
        type: 'image',
        src: '/media/selam-opera/01.jpg',
        alt: {
          en: 'The silver minibus with the turquoise lettering “Selam Opera!” leaves Berlin on 29 May 2016.',
          de: 'Der silberne Kleinbus mit der türkisen Aufschrift „Selam Opera!“ fährt am 29. Mai 2016 in Berlin los.',
        },
        width: 1152,
        height: 720,
        credit: 'Film: Komische Oper Berlin',
      },
    },
    {
      type: 'group-3',
      label: { en: 'The show', de: 'Die Vorstellung' },
      media: [
        {
          type: 'image',
          src: '/media/selam-opera/02a.jpg',
          alt: {
            en: 'A singer in a floral dress lifts a suitcase above her head; her partner in a leather jacket sits in front of her.',
            de: 'Eine Sängerin im Blumenkleid stemmt einen Koffer über den Kopf, vor ihr sitzt ihr Partner in Lederjacke.',
          },
          width: 576,
          height: 720,
          credit: 'Film: Komische Oper Berlin',
        },
        {
          type: 'image',
          src: '/media/selam-opera/02b.jpg',
          alt: {
            en: 'The singer with the suitcase behind her partner, a large map flying behind them.',
            de: 'Die Sängerin mit Koffer hinter ihrem Partner, hinter beiden fliegt eine große Landkarte.',
          },
          width: 576,
          height: 720,
          credit: 'Film: Komische Oper Berlin',
        },
        {
          type: 'image',
          src: '/media/selam-opera/02c.jpg',
          alt: {
            en: 'Both singers at the front of the stage, he with clenched fists as if steering.',
            de: 'Beide Sänger:innen vorn auf der Bühne, er mit geballten Fäusten wie am Steuer.',
          },
          width: 576,
          height: 720,
          credit: 'Film: Komische Oper Berlin',
        },
      ],
    },
    {
      type: 'single',
      label: { en: 'The music', de: 'Die Musik' },
      media: {
        type: 'image',
        src: '/media/selam-opera/03.jpg',
        alt: {
          en: 'Double bass and accordion beside the two singers, the audience in front of the stage.',
          de: 'Kontrabass und Akkordeon neben den beiden Sänger:innen, davor das Publikum.',
        },
        width: 1152,
        height: 720,
        credit: 'Film: Komische Oper Berlin',
      },
    },
    {
      type: 'single',
      label: { en: 'Farewell', de: 'Der Abschied' },
      media: {
        type: 'image',
        src: '/media/selam-opera/04.jpg',
        alt: {
          en: 'Children and adults pour water after the departing bus – a Turkish custom for a safe journey.',
          de: 'Kinder und Erwachsene gießen dem abfahrenden Bus Wasser hinterher – ein türkischer Brauch für eine gute Reise.',
        },
        width: 1152,
        height: 720,
        credit: 'Film: Komische Oper Berlin',
      },
    },
    {
      type: 'group-3',
      label: { en: 'Encounters', de: 'Begegnungen' },
      media: [
        {
          type: 'image',
          src: '/media/selam-opera/05a.jpg',
          alt: {
            en: 'A singer waves, laughing, from the bus window.',
            de: 'Eine Sängerin winkt lachend aus dem Busfenster.',
          },
          width: 576,
          height: 720,
          credit: 'Film: Komische Oper Berlin',
        },
        {
          type: 'image',
          src: '/media/selam-opera/05b.jpg',
          alt: {
            en: 'Schoolchildren with paper cups see the bus off.',
            de: 'Schulkinder mit Pappbechern verabschieden den Bus.',
          },
          width: 576,
          height: 720,
          credit: 'Film: Komische Oper Berlin',
        },
        {
          type: 'image',
          src: '/media/selam-opera/05c.jpg',
          alt: {
            en: 'A singer in a beret and leather jacket sings with outstretched arms among the audience of a pop-up opera.',
            de: 'Eine Sängerin mit Baskenmütze und Lederjacke singt mit ausgebreiteten Armen mitten im Publikum einer Pop-Up-Oper.',
          },
          width: 576,
          height: 720,
          credit: 'Clip: Komische Oper Berlin',
        },
      ],
    },
    {
      type: 'single',
      label: { en: 'Towards Istanbul', de: 'Richtung Istanbul' },
      media: {
        type: 'image',
        src: '/media/selam-opera/06.jpg',
        alt: {
          en: 'The bus drives off down a wide street between old buildings.',
          de: 'Der Bus fährt eine breite Straße zwischen Altbauten hinunter.',
        },
        width: 1152,
        height: 720,
        credit: 'Film: Komische Oper Berlin',
      },
    },
    {
      // Selfie des Teams bei der Preisverleihung (D-064; Fotograf:in unbekannt, daher ohne Nachweis)
      type: 'single',
      label: { en: 'BKM Prize 2017', de: 'BKM-Preis 2017' },
      media: {
        type: 'image',
        src: '/media/selam-opera/07.jpg',
        alt: {
          en: 'Selfie of the laughing Selam Opera! team outdoors at the BKM Prize for Cultural Education 2017; a large silver balloon sculpture behind them.',
          de: 'Selfie des lachenden Selam-Opera!-Teams im Freien bei der Verleihung des BKM-Preises Kulturelle Bildung 2017, dahinter eine große silberne Ballonskulptur.',
        },
        width: 1280,
        height: 800,
      },
    },
  ],
  // Pop-Up-Clips unter Anishas Regie (D-049; ohne Waschsalon und Planetarium)
  videos: [
    { provider: 'youtube', id: 'ne6MrSY6MhM', title: { en: 'Operndolmuş – Eine Opernreise (documentary)', de: 'Operndolmuş – Eine Opernreise (Dokumentarfilm)' } },
    { provider: 'youtube', id: 'AriBiymQ0og', title: 'Carmen in Kreuzberg' },
    { provider: 'youtube', id: 'SR1GJEFUYUc', title: 'Ring frei für Helena!' },
    { provider: 'youtube', id: 'lB0Du1RbrOI', title: 'Super-Sexy-Operetten-Bingo!' },
    { provider: 'youtube', id: 'uSaaIqZlElE', title: 'Wieder auf dem Markt – Don Giovanni' },
    { provider: 'youtube', id: '9Lr_72Xr2IQ', title: 'Il barbiere di Berlino' },
    { provider: 'youtube', id: '0SAoUPD4ndA', title: 'Jahrmarktstimmung' },
    { provider: 'youtube', id: 'hjzsxtkf3L0', title: 'Bahn im Savoy' },
    { provider: 'youtube', id: 'NxJCkLNKnXg', title: 'Oh my goddess!' },
  ],
  credits: [
    { role: { en: 'Artistic Director', de: 'Artistic Director' }, name: 'Mustafa Akça' },
    { role: { en: 'Creative Director & Stage Director', de: 'Creative Director & Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Music (Ben und Henry)', de: 'Musik (Ben und Henry)' }, name: 'Attila Kadri Şendil' },
    { role: { en: 'Libretto (Ben und Henry)', de: 'Libretto (Ben und Henry)' }, name: 'Susanne Wolf' },
  ],
  awards: [
    {
      label: { en: 'BKM Prize for Cultural Education – Operndolmuş “Auf den Spuren der Gastarbeiterroute”', de: 'BKM-Preis Kulturelle Bildung – Operndolmuş „Auf den Spuren der Gastarbeiterroute“' },
      year: 2017,
      status: 'won',
    },
  ],
  press: [
    {
      source: 'nachtkritik',
      author: 'Eva Biringer',
      date: '2016-06-13',
      quote: {
        en: 'The moments in which the audience is drawn in work especially well.',
        de: 'Besonders gut funktionieren die Momente, in denen diese eingebunden werden.',
      },
      url: 'https://nachtkritik.de/index.php?Itemid=83&catid=53&id=12702%3Aoperndolmus-der-komischen-oper-berlin&option=com_content&view=article',
    },
  ],
  featured: true,
  order: 3,
})
