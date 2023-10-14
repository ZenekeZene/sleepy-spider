import { classHelper as $class } from 'sleepy-spider-lib'
import { VISIBLE_CLASS, HIDDEN_CLASS } from '@/ui/constants'
import { getSelectors as $el } from './signIn.selectors'
import './errorWithSignIn.css'

const show = (element) => $class.add(element, HIDDEN_CLASS)
const hide = (element) => $class.remove(element, HIDDEN_CLASS)

const GREETING = 'Welcome, '

const showLeaderboardButton = () => {
  hide($el().goToLeaderboardButton)
}

const hideLeaderboardButton = () => {
  show($el().goToLeaderboardButton)
}

const showUserTitle = ({ displayName }) => {
  hide($el().userTitle)
  $el().userTitle.textContent = `${GREETING}${displayName}`
}

const removeUserTitle = () => {
  show($el().userTitle)
}

const showTitle = () => {
  hide($el().title)
  hide($el().titleMobile)
}

const hideTitle = () => {
  // $class.add($el().title, HIDDEN_CLASS)
  show($el().titleMobile)
}

const showSignInButton = () => {
  hide($el().signInButton)
}

const hideSignInButton = () => {
  show($el().signInButton)
}

const hideErrorWithSignIn = () => {
  show($el().errorWithSignIn)
  $class.remove($el().errorWithSignIn, VISIBLE_CLASS)
}

const showErrorWithSignIn = () => {
  const { errorWithSignIn, errorWithSignInTriggers } = $el()

  errorWithSignInTriggers.forEach((trigger) => {
    trigger.addEventListener('click', hideErrorWithSignIn)
  })
  $class.add(errorWithSignIn, VISIBLE_CLASS)
}


const toShow = {
  title: showTitle,
  userTitle: showUserTitle,
  leaderboardButton: showLeaderboardButton,
  signInButton: showSignInButton,
  errorWithSignIn: showErrorWithSignIn,
}

const toHide = {
  title: hideTitle,
  userTitle: removeUserTitle,
  leaderboardButton: hideLeaderboardButton,
  signInButton: hideSignInButton,
  errorWithSignIn: hideErrorWithSignIn,
}

export {
  toShow,
  toHide,
}
