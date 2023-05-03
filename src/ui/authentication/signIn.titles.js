import { classHelper as $class } from 'sleepy-spider-lib'
import { HIDDEN_CLASS } from '@/ui/constants'
import { getSignInSelectors as $el } from './signIn.selectors'

const GREETING = 'Welcome, '

const showLeaderboardButton = () => {
  $class.remove($el().leaderboardButton, HIDDEN_CLASS)
}

const hideLeaderboardButton = () => {
  $class.add($el().leaderboardButton, HIDDEN_CLASS)
}

const showUserTitle = ({ displayName }) => {
  $class.remove($el().userTitle, HIDDEN_CLASS)
  userTitle.textContent = `${GREETING}${displayName}`
}

const removeUserTitle = () => {
  $class.remove($el().userTitle, HIDDEN_CLASS)
}

const showTitle = () => {
  $class.remove($el().title, HIDDEN_CLASS)
}

const hideTitle = () => {
  $class.add($el().title, HIDDEN_CLASS)
}

const show = {
  title: () => showTitle,
  userTitle: () => showUserTitle,
  leaderboardButton: () => showLeaderboardButton,
}

const hide = {
  title: () => hideTitle,
  userTitle: () => removeUserTitle,
  leaderboardButton: () => hideLeaderboardButton,
}

export {
  show,
  hide,
}
