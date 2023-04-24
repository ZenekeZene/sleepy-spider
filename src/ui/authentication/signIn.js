import { classHelper as $class, findById, listenEvent } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter/events/events'
import { HIDDEN_CLASS } from '@/ui/constants'
import { launchSignIn } from '@/ui/screens/leaderboard/preview/leaderboardPreview'

const TITLE_ID = 'title'
const USER_TITLE_ID = 'user-title'
const GREETING = 'Welcome, '

const showUserTitle = ({ displayName }) => {
  const userTitle = findById(USER_TITLE_ID)
  if (!userTitle) return
  $class.remove(userTitle, HIDDEN_CLASS)
  userTitle.textContent = `${GREETING}${displayName}`
}

const hideUserTitle = () => {
  const userTitle = findById(USER_TITLE_ID)
  if (!userTitle) return
  $class.add(userTitle, HIDDEN_CLASS)
}

const showTitle = () => {
  const title = findById(TITLE_ID)
  $class.remove(title, HIDDEN_CLASS)
}

const hideTitle = () => {
  const title = findById(TITLE_ID)
  $class.add(title, HIDDEN_CLASS)
}

const handleSignIn = ({ detail }) => {
  const { user, token } = detail
  hideTitle()
  showUserTitle(user)
}

const handleLogout = () => {
  hideUserTitle()
  showTitle()
}

const prepareSignIn = ({ authentication }) => {
  launchSignIn({ authentication })
  listenEvent(EVENTS.SIGN_IN, handleSignIn)
  listenEvent(EVENTS.LOGOUT, handleLogout)
}

export {
  prepareSignIn,
}
