const TOGGLE_TYPES = Object.freeze({
  SHOW: 'add',
  HIDE: 'remove',
})

function add (element, className) {
  if (element instanceof Array) {
    addAll(element, className)
  } else {
    if (className instanceof Array) {
      element.classList.add(...className)
    } else {
      element.classList.add(className)
    }
  }
}

function remove (element, className) {
  if (element instanceof Array) {
    removeAll(element, className)
  } else {
    if (className instanceof Array) {
      element.classList.remove(...className)
    } else {
      element.classList.remove(className)
    }
  }
}

function addAll (elements, className) {
  if (!elements instanceof Array) {
    throw new Error('Invalid element')
  } else {
    elements.forEach((element) => {
      add(element, className)
    })
  }
}

function removeAll (elements, className) {
  if (!elements instanceof Array) {
    throw new Error('Invalid element')
  } else {
    elements.forEach((element) => {
      remove(element, className)
    })
  }
}

function toggle (element, className) {
  element.classList.toggle(className)
}

function forEach (elements, className, callback) {
  if (elements instanceof Element) {
    callback(elements, className)
  } else if (elements instanceof NodeList) {
    elements.forEach(element => {
      callback(element, className)
    })
  } else if (elements instanceof Object) {
    Object.values(elements).forEach(element => {
      callback(element, className)
    })
  } else {
    throw new Error('Invalid element')
  }
}

export {
  add,
  remove,
  addAll,
  removeAll,
  toggle,
  forEach,
  TOGGLE_TYPES,
}
