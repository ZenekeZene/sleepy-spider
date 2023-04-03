const maxSelectorLength = 27

const ids = ['app', 'main', 'fix']
const pseudoElements = ['before', 'after']
const attributes = ['active', 'disabled', 'hidden', 'checked', 'empty']
const classes = ['header', 'button', 'form', 'my-element', 'app-class']

const combinators = [' > ', ' + ', ' '];
const htmlTags = ['h1', 'h2', 'p', 'a', 'button', 'form', 'input', 'div', 'span', 'img', 'nav', 'section', 'header', 'footer'];

const seed = {
  id: 0.1,
  classname: 0.5,
  attribute: 0.3,
  pseudoclass: 0.4,
  pseudoElement: 0.2,
}

export {
  maxSelectorLength,
  ids,
  pseudoElements,
  attributes,
  classes,
  combinators,
  htmlTags,
  seed,
}
