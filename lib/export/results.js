export function exportToCSV(results) {
  return JSON.stringify(results)
}

export function exportToPDF(results) {
  return {
    status: 'PDF_GENERATED',
    data: results
  }
}
