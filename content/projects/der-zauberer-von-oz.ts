// Quelle: docs/INHALTE.md §3 (Der Zauberer von Oz), §6/§7 Punkt 10 (Text als erstes eigenes Stück).
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'der-zauberer-von-oz',
  title: 'Der Zauberer von Oz',
  subtitle: { en: 'Music theatre with puppetry (in German)', de: 'Musiktheater mit Puppenspiel' },
  venue: {
    en: 'Musikverein Vienna & Philharmonie Luxembourg (Brucknerhaus Linz, 03/2027)',
    de: 'Musikverein Wien & Philharmonie Luxembourg (Brucknerhaus Linz, 03/2027)',
  },
  year: 2026,
  premiere: '2026-01-17',
  pillar: 'create',
  role: { en: 'Text & Stage Director', de: 'Text & Regie' },
  dates: {
    en: ['World premiere 17 January 2026, Musikverein Vienna (Brahms-Saal)', '25 January 2026, Philharmonie Luxembourg', '20–27 March 2027, Brucknerhaus Linz'],
    de: ['Uraufführung 17. Januar 2026, Musikverein Wien (Brahms-Saal)', '25. Januar 2026, Philharmonie Luxembourg', '20.–27. März 2027, Brucknerhaus Linz'],
  },
  tags: { en: ['Puppetry', 'Family opera', 'First own text'], de: ['Puppenspiel', 'Familienoper', 'Erster eigener Text'] },
  cover: {
    type: 'video',
    src: '/media/der-zauberer-von-oz/cover.mp4',
    poster: '/media/der-zauberer-von-oz/cover-poster.jpg',
    alt: {
      en: 'Photo trailer: a fairy in a white feathered dress, a clarinettist beside a pumpkin-headed puppet, the lion and Dorothy with a tuba.',
      de: 'Fototrailer: eine Fee im weißen Federkleid, ein Klarinettist neben einer Puppe mit Kürbiskopf, der Löwe und Dorothy mit Tuba.',
    },
    width: 800,
    height: 1000,
    credit: 'Julia Wesely',
  },
  intro: {
    en: [
      'A music theatre production for the whole family, combining live music with puppetry: Dorothy’s journey through Oz unfolds through song, sound and puppet figures built and performed by Suse Wächter – with Lenya Gramß as Dorothy.',
      'Anisha Bondy wrote the text together with Suse Wächter – her first own libretto, developed alongside the staging. Matthias Werner, co-founder of Federspiel, created this heart-warming piece for clarinet, low brass and piano. The piece was commissioned by the Musikverein Vienna and the Philharmonie Luxembourg; a further run at the Brucknerhaus Linz is planned for March 2027. More performances of this eminently tourable piece are in the works!',
    ],
    de: [
      'Ein Musiktheaterstück für die ganze Familie, das live gespielte Musik mit Puppenspiel verbindet: Dorothys Reise durch Oz entsteht aus Gesang, Klang und Puppenfiguren, gebaut und gespielt von Suse Wächter – mit Lenya Gramß als Dorothy.',
      'Den Text schrieb Anisha Bondy gemeinsam mit Suse Wächter – ihr erstes eigenes Libretto, entstanden zusammen mit der Inszenierung. Matthias Werner, Mitbegründer von Federspiel, hat dieses herzerwärmende Stück für Klarinette, tiefes Blech und Klavier kreiert. Das Stück ist ein Auftragswerk des Musikvereins Wien und der Philharmonie Luxembourg; eine weitere Vorstellungsserie am Brucknerhaus Linz ist für März 2027 geplant. Weitere Auftritte für dieses extrem gastspielfreundliche Stück sind in Planung!',
    ],
  },
  gallery: [
    {
      type: 'single',
      label: { en: 'Figures', de: 'Figuren' },
      media: {
        type: 'image',
        src: '/media/der-zauberer-von-oz/01.jpg',
        alt: {
          en: 'A performer in a white feathered costume spreads her arms, beside her a striped puppet figure.',
          de: 'Eine Darstellerin im weißen Federkostüm breitet die Arme aus, neben ihr eine gestreifte Puppenfigur.',
        },
        width: 1772,
        height: 1108,
        credit: 'Julia Wesely',
      },
    },
    {
      type: 'group-3',
      label: { en: 'Performance', de: 'Aufführung' },
      media: [
        {
          type: 'image',
          src: '/media/der-zauberer-von-oz/02a.jpg',
          alt: {
            en: 'A hot-air balloon hovers above the stage in the Musikverein, the audience in the foreground.',
            de: 'Ein Heißluftballon schwebt über der Bühne im Musikverein, im Vordergrund das Publikum.',
          },
          width: 1182,
          height: 1478,
          credit: 'Julia Wesely',
        },
        {
          type: 'image',
          src: '/media/der-zauberer-von-oz/02b.jpg',
          alt: {
            en: 'A young woman laughs with delight.',
            de: 'Eine junge Frau lacht begeistert.',
          },
          width: 1182,
          height: 1478,
          credit: 'Julia Wesely',
        },
        {
          type: 'image',
          src: '/media/der-zauberer-von-oz/02c.jpg',
          alt: {
            en: 'A puppet figure appears in green light in a doorway.',
            de: 'Eine Puppenfigur erscheint in grünem Licht in einer Tür.',
          },
          width: 1182,
          height: 1478,
          credit: 'Julia Wesely',
        },
      ],
    },
    {
      type: 'group-3',
      label: { en: 'Audience & ensemble', de: 'Publikum & Ensemble' },
      media: [
        {
          type: 'image',
          src: '/media/der-zauberer-von-oz/03a.jpg',
          alt: {
            en: 'Children’s hands clapping in pink light.',
            de: 'Klatschende Kinderhände in pinkem Licht.',
          },
          width: 1182,
          height: 1478,
          credit: 'Julia Wesely',
        },
        {
          type: 'image',
          src: '/media/der-zauberer-von-oz/03b.jpg',
          alt: {
            en: 'Curtain call on the stage of the Musikverein.',
            de: 'Schlussapplaus auf der Bühne des Musikvereins.',
          },
          width: 1182,
          height: 1478,
          credit: 'Julia Wesely',
        },
        {
          type: 'image',
          src: '/media/der-zauberer-von-oz/03c.jpg',
          alt: {
            en: 'The ensemble with green neckerchiefs poses cheerfully for a group photo.',
            de: 'Das Ensemble mit grünen Halstüchern posiert fröhlich für ein Gruppenfoto.',
          },
          width: 1182,
          height: 1478,
          credit: 'Julia Wesely',
        },
      ],
    },
    {
      type: 'single',
      label: { en: 'Backstage', de: 'Hinter der Bühne' },
      media: {
        type: 'image',
        src: '/media/der-zauberer-von-oz/04.jpg',
        alt: {
          en: 'Black-and-white: a costumed figure crouches on the floor between two open doors.',
          de: 'Schwarzweiß: eine kostümierte Figur kauert zwischen zwei offenen Türen auf dem Boden.',
        },
        width: 1772,
        height: 1108,
        credit: 'Julia Wesely',
      },
    },
  ],
  videos: [
    { provider: 'youtube', id: 'WvE5Xzjf6kU', title: 'Der Zauberer von Oz – Trailer', aspect: '9:16' },
    { provider: 'youtube', id: 'XFyY4etJ63Y', title: { en: 'The Wizard of Oz', de: 'Der Zauberer von Oz' } },
  ],
  credits: [
    { role: { en: 'Music', de: 'Musik' }, name: 'Matthias Werner' },
    { role: { en: 'Text & Stage Director', de: 'Text & Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Text, puppets, puppetry, acting & concept', de: 'Text, Puppen, Puppenspiel, Schauspiel & Konzept' }, name: 'Suse Wächter' },
    { role: { en: 'Costume & set', de: 'Kostüm & Bühne' }, name: 'Renate Vogg, Verena Geier' },
    { role: { en: 'Actor', de: 'Schauspiel' }, name: 'Lenya Gramß' },
    { role: { en: 'Piano', de: 'Klavier' }, name: 'Mitra Kotte' },
    { role: { en: 'Clarinet', de: 'Klarinette' }, name: 'Frédéric Alvarado-Dupuy' },
    { role: { en: 'Low brass (trombone / bass trumpet)', de: 'Tiefes Blech (Posaune / Bassstrompete)' }, name: 'Thomas Winalek' },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 4,
})
