const TOGGLE_DELAY_IN_MS = 1000
const INVISIBLE_CLASSNAME = 'invisible'
const TRANSPARENT_CLASSNAME = 'transparent'
const ENTRANCE_CLASSNAME = 'bounceInDown'

const toggleElements = ({ elements, classname, callback }) => {
  if (!elements || elements?.length === 0) return
  const collection = Array.from(elements)
  collection.forEach(element => {
    element.classList.toggle(classname)
    callback && callback(element)
  })
}

const toggleInvisibleElements = () => {
  setTimeout(() => {
    const invisibleElements = document.getElementsByClassName(INVISIBLE_CLASSNAME)
    const transparentElements = document.getElementsByClassName(TRANSPARENT_CLASSNAME)
    toggleElements({ elements: invisibleElements, classname: INVISIBLE_CLASSNAME })
    toggleElements({ elements: transparentElements, classname: TRANSPARENT_CLASSNAME,
      callback: ({ classList }) => {
        classList.add(ENTRANCE_CLASSNAME)
      }
    })
    const loaderElement = document.getElementById('loader')
    if (!loaderElement) throw new Error('Loader component is not found')
    loaderElement.classList.add(INVISIBLE_CLASSNAME)
  }, TOGGLE_DELAY_IN_MS)
}

export {
  toggleInvisibleElements,
}
