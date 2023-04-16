import { findById, findAllByClassName } from 'sleepy-spider-lib'

const INVISIBLE_CLASSNAME = 'invisible'
const TRANSPARENT_CLASSNAME = 'transparent'
const ENTRANCE_CLASSNAME = 'bounceInDown'

const toggleElements = ({ elements, classname, onToggle }) => {
  if (!elements || elements?.length === 0) throw new Error('Zero elements to be toggled')
  const collection = Array.from(elements)
  collection.forEach(element => {
    element.classList.toggle(classname)
    onToggle?.(element)
  })
}

const hideLoader = () => {
  const loaderElement = findById('loader')
  if (!loaderElement) throw new Error('Loader component is not found')
  loaderElement.classList.add(INVISIBLE_CLASSNAME)
}

const toggleInvisibleElements = () => {
  function toggle () {
    const invisibleElements = findAllByClassName(INVISIBLE_CLASSNAME)
    const transparentElements = findAllByClassName(TRANSPARENT_CLASSNAME)
    toggleElements({ elements: invisibleElements, classname: INVISIBLE_CLASSNAME })
    toggleElements({ elements: transparentElements, classname: TRANSPARENT_CLASSNAME,
      onToggle: ({ classList }) => {
        classList.add(ENTRANCE_CLASSNAME)
      }
    })
  }

  toggle()
  hideLoader()
}

export {
  toggleInvisibleElements,
}
