import { classHelper as $class, createElement } from "sleepy-spider-lib"

const CLASSNAME_PREFIX = 'leaderboard-preview'
const CLASSNAME_CURRENT_USER = '--current'

const createRankingItem = ({ name, score, position, isUser, wrapper }) => {
  const listItem = createElement({
    tag: 'li',
    classNames: `${CLASSNAME_PREFIX}__item`,
    target: wrapper
  })
  createElement({
    tag: 'span',
    classNames: `${CLASSNAME_PREFIX}__position`,
    target: listItem,
    text: position
  })
  createElement({
    tag: 'span',
    classNames: `${CLASSNAME_PREFIX}__name`,
    target: listItem,
    text: name
  })
  createElement({
    tag: 'span',
    classNames: `${CLASSNAME_PREFIX}__score`,
    target: listItem,
    text: score
  })
  if (isUser) {
    $class.add(listItem, CLASSNAME_CURRENT_USER)
  }
}

const showRanking = ({ rankingWithUser, wrapper }) => {
  wrapper.innerHTML = ''
  rankingWithUser.map((player) => createRankingItem({ ...player, wrapper }))
}

export {
  showRanking
}
