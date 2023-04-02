import {
  pseudoElements,
  attributes,
  classes,
  combinators,
  htmlTags,
  maxSelectorLength,
} from './selectorsCSS.constants'

const generatePseudoElement = () => `::${pseudoElements[Math.floor(Math.random() * pseudoElements.length)]}`
const generatePseudoclass = () => `:${pseudoClasses[Math.floor(Math.random() * pseudoClasses.length)]}`
const generateAttribute = () => `[${attributes[Math.floor(Math.random() * attributes.length)]}]`
const generateClassname = () => `.${classes[Math.floor(Math.random() * classes.length)]}`

function generateCombinator(selector) {
  let remainingLength = maxSelectorLength - selector.length
  while (Math.random() < 0.6 && remainingLength > 3) {
    let combinator = combinators[Math.floor(Math.random() * combinators.length)]
    if (selector.length > 0 && selector.length + combinator.length + 7 < maxSelectorLength) {
      selector += combinator
      selector += htmlTags[Math.floor(Math.random() * htmlTags.length)]
      remainingLength -= combinator.length + 7
    }
  }
  return selector
}

function getGenerators () {
  return [
    { name: 'classname', generator: generateClassname },
    { name: 'attribute', generator: generateAttribute },
    { name: 'pseudoclass', generator: generatePseudoclass },
    { name: 'pseudoElement', generator: generatePseudoElement },
  ]
}

export {
  generateCombinator,
  getGenerators,
}
