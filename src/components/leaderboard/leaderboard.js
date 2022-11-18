import { createElement } from "@/lib/dom/dom"
import { getUsersByLimit } from "@/infra/user/user.repository"
import './leaderboard.css'

const CLASSNAME__PREFIX = 'leaderboard__'
const imageFallbackSrc = new URL('/src/assets/images/spider-fallback.svg', import.meta.url).href

function createUser ({ listElement, user, isCurrent = fals }) {
  const { displayName, photoURL } = user
  const wrapper = createElement({
    tag: 'li',
    classNames: `${CLASSNAME__PREFIX}item`,
    target: listElement
  })
  if (isCurrent) {
    wrapper.classList.add('current')
  }
  const image = createElement({
    tag: 'img',
    classNames: `${CLASSNAME__PREFIX}image`,
    target: wrapper
  })
  image.src = photoURL
  image.onerror = () => {
    image.src = imageFallbackSrc
  }

  createElement({
    classNames: `${CLASSNAME__PREFIX}nickname`,
    target: wrapper,
  }).textContent = displayName

  createElement({
    classNames: [`${CLASSNAME__PREFIX}counter`],
    target: wrapper,
  }).textContent = user.value
}

async function drawUsers ({ currentUser, database }) {
  const listElement = document.getElementById('leaderboard')
  listElement.innerHTML = ''

  const users = await getUsersByLimit({ database, limitSize: 2 })
  users.forEach((user => {
    createUser({ listElement, user, isCurrent: user.id === currentUser.uid })
  }))
}

async function renderLeaderboard ({ currentUser, database }) {
  drawUsers({ currentUser, database })
  setInterval(async () => {
    drawUsers({ currentUser, database })
  }, 3000)
}

export {
  renderLeaderboard,
}
