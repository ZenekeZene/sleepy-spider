window.Prism = window.Prism || {}
window.Prism.manual = true

function getHighlightedCode(code, lang = 'css') {
  if (!code) {
    throw new Error('Invalid code')
  }
  if (!Prism.languages[lang]) {
    throw new Error(`Invalid language: ${lang}`)
  }
  const highlightedCode = Prism.highlight(code, Prism.languages[lang], lang)
  return highlightedCode
}

export default getHighlightedCode
