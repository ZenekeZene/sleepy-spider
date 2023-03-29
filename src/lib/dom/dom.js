const findById = id => document.getElementById(id)

const createElement = ({ tag = 'p', classNames = [], target, text = '' }) => {
  if (!target) throw new Error('You have to specify a target')
  const element = document.createElement(tag)
  if (Array.isArray(classNames)) {
    classNames.forEach((className) => {
      element.classList.add(className)
    })
  } else {
    element.classList.add(classNames)
  }
  element.textContent = text
  target.append(element)
  return element
}

function toggleElement (element) {
  const VISIBLE_CLASSNAME = 'visible'
  const contains = element.classList.contains(VISIBLE_CLASSNAME)
  const toggle = contains ? 'remove' : 'add'
  element.classList[toggle](VISIBLE_CLASSNAME)
}

export {
  createElement,
  toggleElement,
  findById,
}
