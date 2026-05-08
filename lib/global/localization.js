export function localizeExam(exam, locale) {
  return {
    ...exam,
    language: locale.language,
    adapted: true
  }
}
