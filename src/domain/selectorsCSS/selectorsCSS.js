function generateSelectors() {
  const selectors = [];
  const htmlTags = ['h1', 'h2', 'p', 'a', 'button', 'form', 'input', 'div', 'span', 'img', 'nav', 'section', 'header', 'footer'];
  const classes = ['header', 'button', 'form', 'my-element', 'app-class'];
  const attributes = ['active', 'disabled', 'hidden', 'checked', 'empty'];
  const pseudoClasses = ['hover', 'active', 'focus', 'visited'];
  const pseudoElements = ['before', 'after', 'first-letter', 'first-line'];
  const combinators = [' > ', ' + ', ' '];
  const maxSelectorLength = 27;

  for (let i = 0; i < 20; i++) {
    let selector = '';

    // First element
    selector += htmlTags[Math.floor(Math.random() * htmlTags.length)];

    // Optional class
    if (Math.random() < 0.5) {
      selector += `.${classes[Math.floor(Math.random() * classes.length)]}`;
    }

    // Optional attribute
    if (Math.random() < 0.3) {
      selector += `[${attributes[Math.floor(Math.random() * attributes.length)]}]`;
    }

    // Optional pseudo-class
    if (Math.random() < 0.4) {
      selector += `:${pseudoClasses[Math.floor(Math.random() * pseudoClasses.length)]}`;
    }

    // Optional pseudo-element
    if (Math.random() < 0.2) {
      selector += `::${pseudoElements[Math.floor(Math.random() * pseudoElements.length)]}`;
    }

    // Optional combinators and subsequent elements
    let remainingLength = maxSelectorLength - selector.length;
    while (Math.random() < 0.6 && remainingLength > 3) {
      let combinator = combinators[Math.floor(Math.random() * combinators.length)];
      if (selector.length > 0 && selector.length + combinator.length + 7 < maxSelectorLength) {
        selector += combinator;
        selector += htmlTags[Math.floor(Math.random() * htmlTags.length)];
        remainingLength -= combinator.length + 7;
      }
    }

    selectors.push(selector.trim());
  }

  return selectors;
}


export {
  generateSelectors
}
