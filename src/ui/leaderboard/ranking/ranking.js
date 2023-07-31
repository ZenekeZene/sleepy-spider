import { classHelper as $class, createElement, createImage } from "sleepy-spider-lib"
import './ranking.css'

const CLASSNAME_PREFIX = 'ranking'
const CLASSNAME_CURRENT_USER = '--current'

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
  const image = createImage({
    src: photoURL,
    alt: name,
    classNames: `${classname}__image`,
    target: listItem,
  })
  image.onerror = () => {
    image.src = 'https://i.pravatar.cc/150'
  }
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

const prependRanking = ({ players, wrapper }) => {
  const playersReversed = [...players].reverse()
  playersReversed.map((player) => createRankingItem({ ...player, wrapper, insertMode: 'prepend' }))
}

export {
  showRanking,
  prependRanking,
  createRankingItem,
}
