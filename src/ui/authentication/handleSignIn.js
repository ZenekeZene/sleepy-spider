import { classHelper as $class } from "sleepy-spider-lib"
import {
  signInWithPopup,
  onAuthenticationStateChanged
} from '@/infra/services/authentication/authentication'
import { getInfraServices } from '@/infra/infra'
import { HIDDEN_CLASS } from '@/ui/constants'
import { createPreviewRanking } from '@/ui/leaderboard/preview/leaderboardPreview'
import { createSignUpRanking } from '@/ui/leaderboard/preview-signup/leaderboardPreview.signup'
import { getSelectors as $el } from "./signIn.selectors"
import { show, hide } from './signIn.titles'
import * as events from './signIn.events'

const handleSignIn = () => {
  const { authentication } = getInfraServices()
  signInWithPopup(authentication)
  .catch((error) => {
    error.mapErr((error) => {
      console.error(error)
    })
  })
}

const listenSignInButton = () => {
  const { signInButton } = $el()
  show.signInButton()
  signInButton.addEventListener('click', handleSignIn)
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

const handleUserNotLogged = () => {
  listenSignInButton()
  events.dispatchUserNotLogged()
}

const handleChangeOnAuthentication = async (result) => {
  const { user } = result
  !user ? handleUserNotLogged() : handleUserLogged(user)

  const { goToLeaderboardButton, leaderboardScreen } = $el()

  goToLeaderboardButton.addEventListener('click', () => {
    if (!user) { return }
    $class.remove(leaderboardScreen, HIDDEN_CLASS)
    events.dispatchGoToLeaderboard(user)
  })
}

function launchSignIn () {
  createSignUpRanking()
  onAuthenticationStateChanged({
    onChange: handleChangeOnAuthentication,
  })
}

export {
  launchSignIn,
}

// (1) This can be a new user or a returning user.
