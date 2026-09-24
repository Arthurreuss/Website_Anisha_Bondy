// Seitentexte für /about und /archive (P15). Quelle: docs/INHALTE.md §2
// (Mockup-Texte, gelten wörtlich) und §3/§4 (Fakten für die Bio). Nichts
// Unbekanntes wird erfunden – offene Punkte stehen in `todos` und werden auf
// der Seite über <UiTodo> sichtbar gemacht (D-018).
import type { L, Pillar } from '~/types/project'

export interface PillarContent {
  key: Pillar
  /** Untertitel kommt aus i18n (`pillarSub.*`), hier nur der Fließtext. */
  text: L
}

export interface PressLink {
  source: string
  title: L
  url?: string
}

export interface SiteContent {
  statement: { title: L; body: L }
  pillars: PillarContent[]
  approach: { title: L; body: L }
  quote: L
  /** Bio in dritter Person, 2–3 Absätze. */
  bio: L<string[]>
  workedWith: string[]
  partners: string[]
  /** Presse, die sich nicht einem einzelnen Projekt zuordnen lässt. */
  pressGeneral: PressLink[]
  todos: L<string[]>
}

export const siteContent: SiteContent = {
  statement: {
    title: {
      en: 'Music theatre beyond the stage.',
      de: 'Musiktheater jenseits der Bühne.',
    },
    body: {
      en: 'I create participatory music theatre where people meet – in the opera house, in the city, and far beyond.',
      de: 'Ich entwickle partizipatives Musiktheater, das Menschen zusammenbringt – im Opernhaus, in der Stadt und weit darüber hinaus.',
    },
  },

  pillars: [
    {
      key: 'direct',
      text: {
        en: 'From classic repertoire to contemporary music theatre. On stage and in concert.',
        de: 'Vom klassischen Repertoire bis zum zeitgenössischen Musiktheater. Auf der Bühne und im Konzert.',
      },
    },
    {
      key: 'create',
      text: {
        en: 'I develop new forms between music, space and story. Concerts that become theatre.',
        de: 'Ich entwickle neue Formen zwischen Musik, Raum und Erzählung. Konzerte, die zu Theater werden.',
      },
    },
    {
      key: 'participate',
      text: {
        en: 'Participation as part of the art. Not education after the art. People become part of the work.',
        de: 'Teilhabe als Teil der Kunst. Nicht Vermittlung nach der Kunst. Menschen werden Teil des Werks.',
      },
    },
  ],

  approach: {
    title: {
      en: 'Not education after the art. Participation as part of the art.',
      de: 'Nicht Vermittlung nach der Kunst. Teilhabe als Teil der Kunst.',
    },
    body: {
      en: 'I work at the intersection of opera, staged concerts and community projects. Whatever the format, the question stays the same: how music theatre can become a place where people genuinely meet – not just watch, but take part.',
      de: 'Ich arbeite an der Schnittstelle von Oper, szenischen Konzerten und Community-Projekten. Wie unterschiedlich das Format auch ist – die Frage bleibt dieselbe: Wie wird Musiktheater zu einem Ort, an dem Menschen einander wirklich begegnen – nicht nur zuschauen, sondern teilhaben.',
    },
  },

  quote: {
    en: 'I believe in encounters. In music theatre that opens doors – in both directions.',
    de: 'Ich glaube an Begegnungen. An Musiktheater, das Türen öffnet – in beide Richtungen.',
  },

  bio: {
    en: [
      'Anisha Bondy was born in London in 1981, with roots in London, Vienna, Mallorca and Berlin. She studied music theatre directing at the mdw – University of Music and Performing Arts Vienna, graduating in 2005 with a production of Carl Orff’s “Die Kluge”. Her early practice took her to Theater Basel and Oper Köln, where she worked alongside Katharina Thalbach, and from 2011 to 2014 she was assistant director at the Bayreuth Festival, on Sebastian Baumgarten’s “Tannhäuser”.',
      'For many years she worked as a Spielleiterin (revival director) at the Komische Oper Berlin, supported by a scholarship from the Akademie Musiktheater heute (Deutsche Bank Stiftung). From 2015 she spent seven years as artistic director of Selam Opera!, together with Mustafa Akça, developing the formats Pop-Up-Opera and Operndolmuş, and staged concert formats with conductor Vladimir Jurowski.',
      'Since 2023 she has worked for the Philharmonie Luxembourg and collaborates with the Fondation EME. She has also begun writing herself: her own text for “Der Zauberer von Oz” premieres in 2026. Based in Vienna, she works internationally.',
    ],
    de: [
      'Anisha Bondy wurde 1981 in London geboren, mit Wurzeln in London, Wien, Mallorca und Berlin. Sie studierte Musiktheaterregie an der mdw – Universität für Musik und darstellende Kunst Wien und schloss 2005 mit einer Inszenierung von Carl Orffs „Die Kluge“ ab. Erste Praxis sammelte sie am Theater Basel und an der Oper Köln, dort auch mit Katharina Thalbach, und von 2011 bis 2014 war sie Regieassistentin bei den Bayreuther Festspielen, bei Sebastian Baumgartens „Tannhäuser“.',
      'Langjährig arbeitete sie als Spielleiterin an der Komischen Oper Berlin, gefördert mit einem Stipendium der Akademie Musiktheater heute (Deutsche Bank Stiftung). Ab 2015 war sie sieben Jahre lang szenische Leiterin von Selam Opera!, gemeinsam mit Mustafa Akça, und entwickelte die Formate Pop-Up-Opera und Operndolmuş sowie szenische Konzertformate mit dem Dirigenten Vladimir Jurowski.',
      'Seit 2023 arbeitet sie für die Philharmonie Luxembourg und in Zusammenarbeit mit der Fondation EME. Inzwischen beginnt sie auch selbst zu schreiben: Ihr eigener Text zu „Der Zauberer von Oz“ hat 2026 Premiere. Sie lebt in Wien und arbeitet international.',
    ],
  },

  workedWith: [
    'Barrie Kosky',
    'Andreas Homoki',
    'Hans Neuenfels',
    'Vladimir Jurowski',
    'Katharina Thalbach',
    'Claus Guth',
    'Peter Konwitschny',
    'Sebastian Baumgarten',
    'Michael Thalheimer',
    'Benedict Andrews',
  ],

  partners: [
    'Komische Oper Berlin',
    'Philharmonie Luxembourg',
    'Musikverein Wien',
    'Fondation EME',
    'Rundfunk-Sinfonieorchester Berlin',
    'ensemble unitedberlin',
    "Zaltimbanq' Zirkus",
  ],

  pressGeneral: [
    {
      source: 'Ö1 / ORF',
      title: {
        en: 'Portrait: “Anisha Bondy, music theatre direction”',
        de: 'Porträt: „Anisha Bondy, Musiktheater-Regie“',
      },
      url: 'https://oe1.orf.at/artikel/207033',
    },
    {
      source: 'Leitmotifs (Common Ground Berlin)',
      title: {
        en: 'Podcast episode',
        de: 'Podcast-Folge',
      },
    },
  ],

  todos: {
    en: [
      'Showreel',
      'Nomination “Schauspielbühne” (prize and year?)',
      'Photo credit for the portrait',
      'Approval to name partners',
    ],
    de: [
      'Showreel',
      'Nominierung „Schauspielbühne“ (Preis und Jahr?)',
      'Bildnachweis Porträt',
      'Freigabe der Partnernennung',
    ],
  },
}
