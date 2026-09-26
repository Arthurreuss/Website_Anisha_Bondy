// Inhalte der Rechtsseiten (P16, Aufgabe 5): analog zu content/projects
// eine Datei mit { en, de } je Text, statt UI-Chrome (das bleibt in
// i18n/locales/*.json, Schlüssel `legal.*`). Entwurf – siehe UiTodo-Hinweis
// auf pages/privacy.vue und DECISIONS.md. Angaben seit D-039 (Österreich).
import type { L } from '~/types/project'

/** Kontakt-E-Mail (D-039) – auch im Kontakt-Overlay verwendet. */
export const contactEmail = 'anishabondy@gmail.com'

/** Profile (D-049) – Kontakt-Overlay und JSON-LD `sameAs`. Agentur gibt es noch nicht. */
export const socialLinks = {
  instagram: { label: '@anishabondy', url: 'https://www.instagram.com/anishabondy/' },
  linkedin: { label: 'Anisha Bondy', url: 'https://www.linkedin.com/in/anisha-bondy-20830364/' },
}

export interface ImprintField {
  key: string
  label: L<string>
  /** Wert; mehrzeilig mit \n */
  value: L<string>
}

/** Pflichtangaben nach österreichischem Recht: § 5 ECG + § 25 MedienG (D-039). */
export const imprintFields: ImprintField[] = [
  {
    key: 'name',
    label: { en: 'Media owner and service provider', de: 'Medieninhaberin und Diensteanbieterin' },
    value: { en: 'Anisha Bondy', de: 'Anisha Bondy' },
  },
  {
    key: 'profession',
    label: { en: 'Profession', de: 'Tätigkeit' },
    value: { en: 'Director, opera & music theatre', de: 'Regisseurin, Oper & Musiktheater' },
  },
  {
    key: 'address',
    label: { en: 'Address', de: 'Anschrift' },
    value: {
      en: 'Riemergasse 6/Top 11\n1010 Vienna\nAustria',
      de: 'Riemergasse 6/Top 11\n1010 Wien\nÖsterreich',
    },
  },
  {
    key: 'contact',
    label: { en: 'Contact', de: 'Kontakt' },
    value: {
      en: `${contactEmail}\nor via the contact form on this site`,
      de: `${contactEmail}\noder über das Kontaktformular dieser Website`,
    },
  },
  {
    key: 'vat',
    label: { en: 'VAT ID', de: 'UID-Nummer' },
    value: {
      en: 'none – small business under Austrian VAT law (§ 6 (1) no. 27 UStG)',
      de: 'keine – Kleinunternehmerin gemäß § 6 Abs. 1 Z 27 UStG',
    },
  },
  {
    key: 'direction',
    label: { en: 'Purpose of this website (§ 25 MedienG)', de: 'Grundlegende Richtung (§ 25 MedienG)' },
    value: {
      en: 'Presentation of the artistic work of Anisha Bondy.',
      de: 'Darstellung der künstlerischen Arbeit von Anisha Bondy.',
    },
  },
]

/** Weitere Hinweise unter den Pflichtangaben (nach Vorlage arpadbondy.com, D-039). */
export const imprintNotes: { key: string; heading: L<string>; body: L<string> }[] = [
  {
    key: 'copyright',
    heading: { en: 'Copyright', de: 'Urheberrecht' },
    body: {
      en: 'All texts, images, videos and other content on this website are protected by copyright. Unless stated otherwise, they belong to Anisha Bondy or to the photographers and institutions named. Any reproduction or use in other electronic or printed publications requires prior permission.',
      de: 'Alle Texte, Bilder, Videos und sonstigen Inhalte dieser Website sind urheberrechtlich geschützt. Soweit nicht anders angegeben, liegen die Rechte bei Anisha Bondy bzw. bei den genannten Fotograf:innen und Häusern. Eine Vervielfältigung oder Verwendung in anderen elektronischen oder gedruckten Publikationen ist nur mit vorheriger Zustimmung gestattet.',
    },
  },
  {
    key: 'credits',
    heading: { en: 'Photo credits', de: 'Bildnachweise' },
    body: {
      en: 'Portraits: Claudia Greco. Production photos: credited on the respective project page.',
      de: 'Porträts: Claudia Greco. Produktionsfotos: jeweils auf der Projektseite angegeben.',
    },
  },
  {
    key: 'links',
    heading: { en: 'External links', de: 'Externe Links' },
    body: {
      en: 'Despite careful checking, no liability is accepted for the content of external links. The operators of linked pages are solely responsible for their content.',
      de: 'Trotz sorgfältiger inhaltlicher Kontrolle wird keine Haftung für die Inhalte externer Links übernommen. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.',
    },
  },
]

export interface PrivacySection {
  key: string
  heading: L<string>
  /** Fließtext; fehlt er, zeigt die Seite an dieser Stelle einen UiTodo. */
  body?: L<string>
}

export const privacySections: PrivacySection[] = [
  {
    key: 'controller',
    heading: { en: 'Data controller', de: 'Verantwortliche' },
    body: {
      en: `Anisha Bondy, Riemergasse 6/Top 11, 1010 Vienna, Austria · ${contactEmail}`,
      de: `Anisha Bondy, Riemergasse 6/Top 11, 1010 Wien, Österreich · ${contactEmail}`,
    },
  },
  {
    key: 'hosting',
    heading: { en: 'Hosting', de: 'Hosting' },
    body: {
      en: 'This site is hosted on Cloudflare Pages by Cloudflare, Inc. Cloudflare processes the technical data (e.g. IP address) needed to deliver the site. See Cloudflare’s own privacy policy for details.',
      de: 'Diese Website wird über Cloudflare Pages von Cloudflare, Inc. gehostet. Cloudflare verarbeitet dabei technisch notwendige Daten (z. B. IP-Adresse), um die Seite auszuliefern. Details dazu in Cloudflares eigener Datenschutzerklärung.',
    },
  },
  {
    key: 'logs',
    heading: { en: 'Server log files', de: 'Server-Logfiles' },
    body: {
      en: 'Like most web hosts, Cloudflare automatically collects information in server log files that your browser transmits, such as browser type/version, operating system, referrer URL, hostname of the accessing device and the time of the request. This data is not merged with other data sources.',
      de: 'Wie die meisten Webhoster erfasst Cloudflare automatisch Informationen in Server-Logfiles, die der Browser übermittelt, etwa Browsertyp/-version, Betriebssystem, Referrer-URL, Hostname des zugreifenden Geräts und Zeitpunkt der Anfrage. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.',
    },
  },
  {
    key: 'contactForm',
    heading: { en: 'Contact form', de: 'Kontaktformular' },
    body: {
      en: 'The contact form is handled by the service Web3Forms. Data entered there (name, email, message and the other fields) is submitted to Web3Forms and forwarded by email so the request can be answered. It is used for no other purpose. The request is kept only in the recipient’s email inbox and deleted once it is no longer needed.',
      de: 'Das Kontaktformular wird über den Dienst Web3Forms abgewickelt. Die dort eingegebenen Daten (Name, E-Mail, Nachricht und die weiteren Felder) werden an Web3Forms übermittelt und per E-Mail weitergeleitet, damit die Anfrage beantwortet werden kann. Eine weitergehende Nutzung findet nicht statt. Die Anfrage wird nur im E-Mail-Postfach der Empfängerin aufbewahrt und gelöscht, sobald sie nicht mehr benötigt wird.',
    },
  },
  {
    key: 'videos',
    heading: { en: 'Embedded videos', de: 'Eingebettete Videos' },
    body: {
      en: 'Videos from YouTube and Vimeo are embedded as a click-to-load preview: no connection to the provider is made and no cookies are set until you actively click play. YouTube videos then load via the privacy-enhanced youtube-nocookie.com domain.',
      de: 'Videos von YouTube und Vimeo werden als Klick-zum-Laden-Vorschau eingebunden: Erst nach aktivem Klick auf Abspielen wird eine Verbindung zum jeweiligen Anbieter aufgebaut, vorher werden keine Cookies gesetzt. YouTube-Videos laden dann über die datenschutzfreundliche Domain youtube-nocookie.com.',
    },
  },
  {
    key: 'cookies',
    heading: { en: 'Cookies & tracking', de: 'Cookies & Tracking' },
    body: {
      en: 'This site does not use cookies and runs no analytics or tracking tools.',
      de: 'Diese Website verwendet keine Cookies und setzt keine Analyse- oder Tracking-Tools ein.',
    },
  },
  {
    key: 'fonts',
    heading: { en: 'Fonts', de: 'Schriftarten' },
    body: {
      en: 'Web fonts are self-hosted on this server. No connection to external font providers (e.g. Google Fonts) is made, and no data is transmitted to them.',
      de: 'Webschriften werden lokal auf diesem Server gehostet. Es besteht keine Verbindung zu externen Schriftanbietern (z. B. Google Fonts), es werden keine Daten an solche Anbieter übertragen.',
    },
  },
  {
    key: 'rights',
    heading: { en: 'Your rights', de: 'Rechte der Betroffenen' },
    body: {
      en: 'You have the right to access, rectify, erase or restrict the processing of your personal data, and to data portability, under the GDPR. You also have the right to lodge a complaint with a supervisory authority; in Austria this is the Data Protection Authority (Datenschutzbehörde, dsb.gv.at).',
      de: 'Ihnen stehen nach geltendem Datenschutzrecht das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie auf Datenübertragbarkeit zu. Außerdem können Sie sich bei einer Aufsichtsbehörde beschweren, in Österreich bei der Datenschutzbehörde (dsb.gv.at).',
    },
  },
]
