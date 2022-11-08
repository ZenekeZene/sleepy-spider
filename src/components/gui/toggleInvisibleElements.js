const INVISIBLE_CLASSNAME = 'invisible'
const TRANSPARENT_CLASSNAME = 'transparent'
const ENTRANCE_CLASSNAME = 'bounceInDown'

const toggleElements = (elements, classname, callback) => {
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
    toggleElements(invisibleElements, INVISIBLE_CLASSNAME)
    toggleElements(transparentElements, TRANSPARENT_CLASSNAME, ({ classList }) => {
      classList.add(ENTRANCE_CLASSNAME)
    })
    const loaderElement = document.getElementById('loader')
    loaderElement.classList.add(INVISIBLE_CLASSNAME)
  }, 1000)
}

export {
  toggleInvisibleElements,
}
