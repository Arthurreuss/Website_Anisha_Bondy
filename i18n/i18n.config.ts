// vue-i18n Optionen (D-018). UI-Texte liegen in i18n/locales/*.json;
// Inhalte (Projekte, Seitentexte) in content/ mit { en, de }.
export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
}))
