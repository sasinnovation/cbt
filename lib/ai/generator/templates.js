const templates = []

export function saveTemplate(template) {
  templates.push(template)
  return template
}

export function getTemplates() {
  return templates
}
