const findById = id => document.getElementById(id)
const findAllBySelector = selector => document.querySelectorAll(selector)
const findBySelector = selector => document.querySelector(selector)
const findAllByClassName = className => document.getElementsByClassName(className)
const findByClassName = className => document.getElementByClassName(className)

const getRoot = () => document.documentElement
const getBody = () => document.body

const applyClassNames = (element, classNames) => {
  if (Array.isArray(classNames)) {
    classNames.forEach((className) => {
      element.classList.add(className)
    })
  } else {
    element.classList.add(classNames)
  }
}

const createImage = ({ src, alt, classNames = [], target, insertMode = 'append' }) => {
  if (!target) throw new Error('You have to specify a target')
  const image = document.createElement('img')
  image.src = src
  image.alt = alt
  applyClassNames(image, classNames)
  target[insertMode](image)
  return image
}

const createElement = ({ tag = 'p', classNames = [], target, text = '', insertMode = 'append' }) => {
  if (!target) throw new Error('You have to specify a target')
  const element = document.createElement(tag)
  applyClassNames(element, classNames)
  element.textContent = text
  target[insertMode](element)
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
  createImage,
  toggleElement,
  findBySelector,
  findById,
  findAllBySelector,
  findAllByClassName,
  findByClassName,
  getRoot,
  getBody,
}
