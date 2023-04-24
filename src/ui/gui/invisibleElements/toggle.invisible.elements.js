import { classHelper as $class, findById, findAllByClassName } from 'sleepy-spider-lib'
import { INVISIBLE_CLASS, TRANSPARENT_CLASS } from '@/ui/constants'

const ENTRANCE_CLASSNAME = 'bounceInDown'

const toggleElements = ({ elements, classname, onToggle }) => {
  if (!elements || elements?.length === 0) throw new Error('Zero elements to be toggled')
  const collection = Array.from(elements)
  collection.forEach(element => {
    $class.toggle(element, classname)
    onToggle?.(element)
  })
}

const hideLoader = () => {
  const loaderElement = findById('loader')
  if (!loaderElement) throw new Error('Loader component is not found')
  $class.add(loaderElement, INVISIBLE_CLASS)
}

const toggleInvisibleElements = () => {
  function toggle () {
    const invisibleElements = findAllByClassName(INVISIBLE_CLASS)
    const transparentElements = findAllByClassName(TRANSPARENT_CLASS)
    toggleElements({ elements: invisibleElements, classname: INVISIBLE_CLASS })
    toggleElements({ elements: transparentElements, classname: TRANSPARENT_CLASS,
      onToggle: (element) => {
        $class.add(element, ENTRANCE_CLASSNAME)
      }
    })
  }

  toggle()
  hideLoader()
}

export {
  toggleInvisibleElements,
}
