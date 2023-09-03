import { classHelper as $class, createElement } from "sleepy-spider-lib"
import { createAvatar } from "../podium/podium.avatar"

const CLASSNAME_CURRENT_USER = '--current'
const CLASSNAME_PREFIX = 'ranking'

const createLoading = ({ wrapper }) => {
  createElement({
    tag: 'div',
    classNames: `${CLASSNAME_PREFIX}__loading`,
    target: wrapper,
    text: 'Loading the best players...',
  })
}

const createSkeleton = ({ wrapper, insertMode }) => {
  const listItem = createElement({
    tag: 'li',
    classNames: `${CLASSNAME_PREFIX}__item`,
    target: wrapper,
    insertMode,
  })
  $class.add(listItem, `${CLASSNAME_PREFIX}--skeleton`)
}

const createItem = ({ wrapper, insertMode, ...user }) => {
  const { name, photoURL, score, position, isUser } = user
  const listItem = createElement({
    tag: 'li',
    classNames: `${CLASSNAME_PREFIX}__item`,
    target: wrapper,
    insertMode,
  })
  createElement({
    tag: 'span',
    classNames: `${CLASSNAME_PREFIX}__position`,
    target: listItem,
    text: position,
  })
  createAvatar(photoURL, name, CLASSNAME_PREFIX, listItem)
  createElement({
    tag: 'span',
    classNames: `${CLASSNAME_PREFIX}__name`,
    target: listItem,
    text: name,
  })

  if (isUser) {
    $class.add(listItem, CLASSNAME_CURRENT_USER)
    createElement({
      tag: 'span',
      classNames: `${CLASSNAME_PREFIX}__your-best`,
      target: listItem,
      text: 'Your best: ',
    })
  }

  createElement({
    tag: 'span',
    classNames: `${CLASSNAME_PREFIX}__score`,
    target: listItem,
    text: score,
  })
}

const removeSkeletons = ({ wrapper }) => {
  const skeletonItems = wrapper.querySelectorAll(`.${CLASSNAME_PREFIX}--skeleton`)
  skeletonItems.forEach((item) => item.remove())
}

export {
  createItem,
  createLoading,
  createSkeleton,
  removeSkeletons,
}
