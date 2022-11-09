import { createElement } from "../../lib/dom/dom"

const CLASSNAME__PREFIX = 'leaderboard__'

function renderLeaderboard ({ currentUser }) {
  if (!currentUser?.displayName) return
  document.getElementById('user-icon').style.display = 'none'

  const { displayName, photoURL } = currentUser
  const wrapper = document.getElementById('leaderboard-user')
  createElement({
    tag: 'img',
    classNames: `${CLASSNAME__PREFIX}image`,
    target: wrapper
  }).src = photoURL

  createElement({
    classNames: `${CLASSNAME__PREFIX}nickname`,
    target: wrapper,
  }).textContent = displayName

  createElement({
    classNames: [`${CLASSNAME__PREFIX}counter`, 'counter'],
    target: wrapper,
  })
}

export {
  renderLeaderboard,
}
