import { classHelper as $class } from "sleepy-spider-lib"
import {
  signInWithPopup,
  onAuthenticationStateChanged
} from '@/infra/services/authentication/authentication'
import { HIDDEN_CLASS } from '@/ui/constants'
import { createPreviewRanking } from '@/ui/leaderboard/preview/leaderboardPreview'
import { createSignUpRanking } from '@/ui/leaderboard/preview-signup/leaderboardPreview.signup'
import { getSelectors as $el } from "./signIn.selectors"
import { show, hide } from './signIn.titles'
import * as events from './signIn.events'

const handleSignIn = (authentication) => {
  signInWithPopup(authentication)
  .catch((error) => {
    error.mapErr((error) => {
      console.error(error)
    })
  })
}

const listenSignInButton = (authentication) => {
  const { signInButton } = $el()
  show.signInButton()
  signInButton.addEventListener('click', () => handleSignIn(authentication))
}

const isFinalScreen = () => {
  const { finalScreen } = $el()
  return !$class.contains(finalScreen, HIDDEN_CLASS)
}

const prepareScreensToReturningUser = (user) => {
  if (isFinalScreen()) {
    show.leaderboardButton()
    events.dispatchGoToLeaderboard(user)
  }
  createPreviewRanking(user)
}

// (1)
const handleUserLogged = async (user) => {
  hide.signInButton()
  events.dispatchUserLogged(user)
  prepareScreensToReturningUser(user)
}

const handleUserNotLogged = (authentication) => {
  listenSignInButton(authentication)
  events.dispatchUserNotLogged()
}

const handleChangeOnAuthentication = (authentication) => async (result) => {
  const { user } = result
  !user ? handleUserNotLogged(authentication) : handleUserLogged(user)

  const { goToLeaderboardButton, leaderboardScreen } = $el()

  goToLeaderboardButton.addEventListener('click', () => {
    if (!user) { return }
    $class.remove(leaderboardScreen, HIDDEN_CLASS)
    events.dispatchGoToLeaderboard(user)
  })
}

function launchSignIn ({ authentication }) {
  createSignUpRanking()
  onAuthenticationStateChanged({
    authentication,
    onChange: handleChangeOnAuthentication(authentication),
  })
}

export {
  launchSignIn,
}

// (1) This can be a new user or a returning user.
