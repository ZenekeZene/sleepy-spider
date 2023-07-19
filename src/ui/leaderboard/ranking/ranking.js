import { classHelper as $class, createElement, createImage } from "sleepy-spider-lib"
import './ranking.css'

const CLASSNAME_PREFIX = 'ranking'
const CLASSNAME_CURRENT_USER = '--current'

const createRankingItem = ({ name, score, photoURL, position, isUser, wrapper, insertMode }) => {
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
  createImage({
    src: photoURL,
    alt: name,
    classNames: `${CLASSNAME_PREFIX}__image`,
    target: listItem,
  })
  createElement({
    tag: 'span',
    classNames: `${CLASSNAME_PREFIX}__name`,
    target: listItem,
    text: name,
  })
  createElement({
    tag: 'span',
    classNames: `${CLASSNAME_PREFIX}__score`,
    target: listItem,
    text: score,
  })
  if (isUser) {
    $class.add(listItem, CLASSNAME_CURRENT_USER)
  }
}

const showRanking = ({ players, wrapper }) => {
  wrapper.innerHTML = ''
  players.map((player) => createRankingItem({ ...player, wrapper }))
}

const prependRanking = ({ players, wrapper }) => {
  const playersReversed = [...players].reverse()
  playersReversed.map((player) => createRankingItem({ ...player, wrapper, insertMode: 'prepend' }))
}

export {
  showRanking,
  prependRanking,
}
