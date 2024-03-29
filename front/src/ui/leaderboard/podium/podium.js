import { classHelper as $class, createElement } from "sleepy-spider-lib"
import { createAvatar } from "./podium.avatar"
import './podium.css'

const crownSVG = `
  <svg viewBox="0 0 140 140">
    <path fill="gold">
      <animate attributeName="d" dur="1440ms" repeatCount="indefinite"
        values="M 10,110 L 10,10 L 40,50 L 70,10 L 100,50 L 130,10 L 130,110 z;M 30,110 L 0,0 L 50,50 L 70,0 L 90,50 L 140,0 L 110,110 z;M 10,110 L 10,10 L 40,50 L 70,10 L 100,50 L 130,10 L 130,110 z;"
      ></animate>
    </path>
  </svg>
`

const CLASSNAME_PREFIX = 'podium'
const CLASSNAME_CURRENT_USER = '--current'

const createPodiumItem = ({ name, score, photoURL, position, isUser, wrapper, classname, insertMode }) => {
  const listItem = createElement({
    tag: 'li',
    classNames: `${classname}__item`,
    target: wrapper,
    insertMode,
  })
  if (isUser) {
    $class.add(listItem, CLASSNAME_CURRENT_USER)
    createElement({
      tag: 'span',
      classNames: `${classname}__you`,
      target: listItem,
      text: 'You',
    })
  }
  const positionElement = createElement({
    tag: 'span',
    classNames: `${classname}__position`,
    target: listItem,
    text: position,
  })
  const avatar = createAvatar(photoURL, name, classname, listItem)
  if (position === 1) {
    $class.add(avatar, '--first')
  }

  createElement({
    tag: 'span',
    classNames: `${classname}__score`,
    target: listItem,
    text: score,
  })

  createElement({
    tag: 'span',
    classNames: `${classname}__name`,
    target: listItem,
    text: name,
  })
}

const showPodium = ({ players, wrapper }) => {
  wrapper.innerHTML = ''
  players.map((player) => createPodiumItem({ ...player, wrapper, classname: CLASSNAME_PREFIX }))
}

export {
  showPodium,
}
