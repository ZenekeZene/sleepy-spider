import { classHelper as $class } from 'sleepy-spider-lib'
import { VISIBLE_CLASS, HIDDEN_CLASS } from '@/ui/constants'
import { getSelectors as $el } from './signIn.selectors'
import './errorWithSignIn.css'

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
  $class.add($el().userTitle, HIDDEN_CLASS)
}

const showTitle = () => {
  $class.remove($el().title, HIDDEN_CLASS)
  $class.remove($el().titleMobile, HIDDEN_CLASS)
}

const hideTitle = () => {
  $class.add($el().title, HIDDEN_CLASS)
  $class.add($el().titleMobile, HIDDEN_CLASS)
}

const showSignInButton = () => {
  $class.remove($el().signInButton, HIDDEN_CLASS)
  $class.remove($el().signInButton, HIDDEN_CLASS)
}

const hideSignInButton = () => {
  $class.add($el().signInButton, HIDDEN_CLASS)
}

const hideErrorWithSignIn = () => {
  $class.add($el().errorWithSignIn, HIDDEN_CLASS)
  $class.remove($el().errorWithSignIn, VISIBLE_CLASS)
}

const showErrorWithSignIn = () => {
  const { errorWithSignIn, errorWithSignInTriggers } = $el()

  errorWithSignInTriggers.forEach((trigger) => {
    trigger.addEventListener('click', hideErrorWithSignIn)
  })
  $class.add(errorWithSignIn, VISIBLE_CLASS)
}


const show = {
  title: showTitle,
  userTitle: showUserTitle,
  leaderboardButton: showLeaderboardButton,
  signInButton: showSignInButton,
  errorWithSignIn: showErrorWithSignIn,
}

const hide = {
  title: hideTitle,
  userTitle: removeUserTitle,
  leaderboardButton: hideLeaderboardButton,
  signInButton: hideSignInButton,
  errorWithSignIn: hideErrorWithSignIn,
}

export {
  show,
  hide,
}
