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

export {
  createElement,
  findById,
}
