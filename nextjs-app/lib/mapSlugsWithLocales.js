function mapSlugsWithLocales(translations, { currentLocalization }) {
  return translations.reduce((acc, translation) => {
    acc[translation.language] = translation.slug.current; // Map locale to its slug
    return acc;
  }, currentLocalization);
}

export default mapSlugsWithLocales;
