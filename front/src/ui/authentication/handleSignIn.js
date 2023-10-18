import { classHelper as $class } from "sleepy-spider-lib"
import {
  signInWithPopup,
  onAuthenticationStateChanged
} from '@/infra/services/authentication/authentication'
import { updateAwakenings } from '@/infra/awakening/awakening.repository'
import { HIDDEN_CLASS } from '@/ui/constants'
import { createPreviewRanking } from '@/ui/leaderboard/preview/leaderboardPreview'
import { getSelectors as $el } from "./signIn.selectors"
import { toShow, toHide } from './signIn.titles'
import * as events from './signIn.events'

const handleSignIn = () => {
  signInWithPopup()
  .catch((error) => {
    error.mapErr((error) => {
      events.dispatchErrorWithSignIn(error)
    })
  })
}

const listenSignInButton = () => {
  const { signInButton } = $el()
  toShow.signInButton()
  signInButton.addEventListener('click', handleSignIn)
}

const isFinalScreen = () => {
  const { finalScreen } = $el()
  return !$class.contains(finalScreen, HIDDEN_CLASS)
}

const prepareScreensToReturningUser = async (user) => {
  if (isFinalScreen()) {
		await updateAwakenings()
    toShow.leaderboardButton()
    events.dispatchGoToLeaderboard(user)
    createPreviewRanking(user)
  }
}

// (1)
const handleUserLogged = async (user) => {
  toHide.signInButton()
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
    if (!user) return
    $class.remove(leaderboardScreen, HIDDEN_CLASS)
    events.dispatchGoToLeaderboard(user)
  })
}

function launchSignIn () {
  onAuthenticationStateChanged({
    onChange: handleChangeOnAuthentication,
  })
}

export {
  launchSignIn,
}

// (1) This can be a new user or a returning user.
