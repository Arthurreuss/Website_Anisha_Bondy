// Inhalte der Rechtsseiten (P16, Aufgabe 5): analog zu content/projects
// eine Datei mit { en, de } je Text, statt UI-Chrome (das bleibt in
// i18n/locales/*.json, Schlüssel `legal.*`). Entwurf – siehe UiTodo-Hinweis
// auf pages/privacy.vue und DECISIONS.md.
import type { L } from '~/types/project'

export interface ImprintField {
  key: string
  label: L<string>
}

/** Pflichtangaben nach § 5 DDG (DE) bzw. § 25 MedienG (AT) – Werte fehlen noch (Todo). */
export const imprintFields: ImprintField[] = [
  { key: 'name', label: { en: 'Name', de: 'Name' } },
  { key: 'address', label: { en: 'Address', de: 'Anschrift' } },
  { key: 'contact', label: { en: 'Contact (email, phone)', de: 'Kontakt (E-Mail, Telefon)' } },
  { key: 'vat', label: { en: 'VAT ID (if applicable)', de: 'USt-IdNr. (falls vorhanden)' } },
  { key: 'responsible', label: { en: 'Responsible for content (§ 55(2) RStV/MStV)', de: 'Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV/MStV)' } },
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
    // Kein body: Name/Anschrift fehlen noch, siehe UiTodo auf der Seite.
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
      en: 'The contact form is handled by the service Web3Forms. Data entered there (name, email, message and the other fields) is submitted to Web3Forms and forwarded by email so the request can be answered. It is used for no other purpose.',
      de: 'Das Kontaktformular wird über den Dienst Web3Forms abgewickelt. Die dort eingegebenen Daten (Name, E-Mail, Nachricht und die weiteren Felder) werden an Web3Forms übermittelt und per E-Mail weitergeleitet, damit die Anfrage beantwortet werden kann. Eine weitergehende Nutzung findet nicht statt.',
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
      en: 'You have the right to access, rectify, erase or restrict the processing of your personal data, and to data portability, under applicable data protection law.',
      de: 'Ihnen stehen nach geltendem Datenschutzrecht das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie auf Datenübertragbarkeit zu.',
    },
  },
]
