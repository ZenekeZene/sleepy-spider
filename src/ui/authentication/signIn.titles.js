import { classHelper as $class } from 'sleepy-spider-lib'
import { HIDDEN_CLASS } from '@/ui/constants'
import { getSelectors as $el } from './signIn.selectors'

const GREETING = 'Welcome, '

const showLeaderboardButton = () => {
  $class.remove($el().goToLeaderboardButton, HIDDEN_CLASS)
}

const hideLeaderboardButton = () => {
  $class.add($el().goToLeaderboardButton, HIDDEN_CLASS)
}

const showUserTitle = ({ displayName }) => {
  $class.remove($el().userTitle, HIDDEN_CLASS)
  $el().userTitle.textContent = `${GREETING}${displayName}`
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

const showSignInButton = () => {
  $class.remove($el().signInButton, HIDDEN_CLASS)
}

const hideSignInButton = () => {
  $class.add($el().signInButton, HIDDEN_CLASS)
}

const show = {
  title: showTitle,
  userTitle: showUserTitle,
  leaderboardButton: showLeaderboardButton,
  signInButton: showSignInButton,
}

const hide = {
  title: hideTitle,
  userTitle: removeUserTitle,
  leaderboardButton: hideLeaderboardButton,
  signInButton: hideSignInButton,
}

export {
  show,
  hide,
}
