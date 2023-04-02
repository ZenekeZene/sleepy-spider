const maxSelectorLength = 27

const pseudoElements = ['before', 'after', 'first-letter', 'first-line']
const attributes = ['active', 'disabled', 'hidden', 'checked', 'empty']
const classes = ['header', 'button', 'form', 'my-element', 'app-class']

const combinators = [' > ', ' + ', ' '];
const htmlTags = ['h1', 'h2', 'p', 'a', 'button', 'form', 'input', 'div', 'span', 'img', 'nav', 'section', 'header', 'footer'];

const seed = {
  classname: 0.5,
  attribute: 0.3,
  pseudoclass: 0.4,
  pseudoElement: 0.2,
}

export {
  maxSelectorLength,
  pseudoElements,
  attributes,
  classes,
  combinators,
  htmlTags,
  seed,
}
