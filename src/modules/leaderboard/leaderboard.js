import { findById, createElement } from "sleepy-spider-lib"
import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'
import { getUsersByLimit } from "@/infra/user/user.repository"
import { COUNTER_CLASSNAME } from "@/ui/components/awakeningCounter/drawAwakeningCount"
import './leaderboard.css'

const INTERVAL_REFRESH_IN_MS = 4000
const LEADERBOARD_ID = 'leaderboard'
const CLASSNAME__PREFIX = 'leaderboard__'
const USERS_LENGTH = 2
const imageFallbackSrc = new URL('/src/assets/images/spider-fallback.svg', import.meta.url).href

const cachedCounter = new CachedCounter()

function createUser ({ listElement, user, isCurrent = false }) {
  const { displayName, photoURL } = user
  const wrapper = createElement({
    tag: 'li',
    classNames: `${CLASSNAME__PREFIX}item`,
    target: listElement
  })
  isCurrent && wrapper.classList.add('current')
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

  const counter = createElement({
    classNames: [`${CLASSNAME__PREFIX}counter`],
    target: wrapper,
    text: cachedCounter.value > user.value ? cachedCounter.value : user.value,
  })
  isCurrent && counter.classList.add(COUNTER_CLASSNAME)
}

async function drawUsers ({ database, currentUser }) {
  const listElement = findById(LEADERBOARD_ID)
  if (!listElement) return
  const users = await getUsersByLimit({ database, limitSize: USERS_LENGTH })
  listElement.innerHTML = ''
  users.forEach((user => {
    createUser({ listElement, user, isCurrent: user.id === currentUser?.uid })
  }))
}

async function renderLeaderboardWithoutLoggedUser ({ database }) {
  drawUsers({ database })
  setInterval(async () => {
    drawUsers({ database })
  }, INTERVAL_REFRESH_IN_MS)
}

async function renderLeaderboardWithLoggedUser ({ currentUser, database }) {
  drawUsers({ database, currentUser })
  setInterval(async () => {
    drawUsers({ currentUser, database })
  }, INTERVAL_REFRESH_IN_MS)
}

export {
  renderLeaderboardWithoutLoggedUser,
  renderLeaderboardWithLoggedUser,
}
