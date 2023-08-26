import { classHelper as $class, createElement } from "sleepy-spider-lib"
import { createAvatar } from "../podium/podium.avatar"
import './ranking.css'

const CLASSNAME_PREFIX = 'ranking'
const CLASSNAME_CURRENT_USER = '--current'

const createLoadingRanking = ({ wrapper }) => {
  createElement({
    tag: 'div',
    classNames: `${CLASSNAME_PREFIX}__loading`,
    target: wrapper,
    text: 'Loading the best players...',
  })
}

const createSkeletonRankingItem = ({ wrapper, classname, insertMode }) => {
  const listItem = createElement({
    tag: 'li',
    classNames: `${classname}__item`,
    target: wrapper,
    insertMode,
  })
  $class.add(listItem, `${classname}--skeleton`)
}

const createRankingItem = ({ name, score, photoURL, position, isUser, wrapper, classname, insertMode }) => {
  const listItem = createElement({
    tag: 'li',
    classNames: `${classname}__item`,
    target: wrapper,
    insertMode,
  })
  createElement({
    tag: 'span',
    classNames: `${classname}__position`,
    target: listItem,
    text: position,
  })
  createAvatar(photoURL, name, classname, listItem)
  createElement({
    tag: 'span',
    classNames: `${classname}__name`,
    target: listItem,
    text: name,
  })

  if (isUser) {
    $class.add(listItem, CLASSNAME_CURRENT_USER)
    createElement({
      tag: 'span',
      classNames: `${classname}__your-best`,
      target: listItem,
      text: 'Your best: ',
    })
  }

  createElement({
    tag: 'span',
    classNames: `${classname}__score`,
    target: listItem,
    text: score,
  })
}

const showRanking = ({ players, wrapper }) => {
  wrapper.innerHTML = ''
  players.map((player) => createRankingItem({ ...player, wrapper, classname: CLASSNAME_PREFIX }))
}

const showSkeletonRanking = ({ numPlayers, wrapper }) => {
  // wrapper.innerHTML = ''
  for (let i = 0; i < numPlayers; i++) {
    createSkeletonRankingItem({ wrapper, classname: CLASSNAME_PREFIX, insertMode: 'prepend' })
  }
}

const removeSkeletonRanking = ({ wrapper }) => {
  const skeletonItems = wrapper.querySelectorAll(`.${CLASSNAME_PREFIX}--skeleton`)
  skeletonItems.forEach((item) => item.remove())
}

const prependRanking = ({ players, wrapper }) => {
  const playersReversed = [...players].reverse()
  playersReversed.map((player) => createRankingItem({ ...player, wrapper, classname: CLASSNAME_PREFIX, insertMode: 'prepend' }))
}

export {
  showRanking,
  showSkeletonRanking,
  removeSkeletonRanking,
  prependRanking,
  createRankingItem,
  createLoadingRanking,
}
