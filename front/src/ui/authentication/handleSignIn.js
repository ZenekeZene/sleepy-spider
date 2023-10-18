import { classHelper as $class, dispatchEvent } from "sleepy-spider-lib"
import {
  signInWithPopup,
  onAuthenticationStateChanged
} from '@/infra/services/authentication/authentication'
import { updateAwakenings } from '@/infra/awakening/awakening.repository'
import { HIDDEN_CLASS } from '@/ui/constants'
import { EVENTS } from "@/adapter"
import { createPreviewRanking } from '@/ui/leaderboard/preview/leaderboardPreview'
import { getSelectors as $el } from "./signIn.selectors"
import { toShow, toHide } from './signIn.titles'

const handleSignIn = () => {
  signInWithPopup()
  .catch((error) => {
    error.mapErr((error) => {
      dispatchEvent(EVENTS.MODAL_OPEN)
  		dispatchEvent(EVENTS.ERROR_WITH_SIGN_IN, { error })
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
	alert('prepareScreensToReturningUser')
	alert(isFinalScreen())
  if (isFinalScreen()) {
		await updateAwakenings()
    toShow.leaderboardButton()
		setTimeout(() => {
			// dispatchEvent(EVENTS.GO_TO_LEADERBOARD, { user })
			createPreviewRanking(user)
		}, 2000)
  }
}

// (1)
const handleUserLogged = async (user) => {
  toHide.signInButton()
  dispatchEvent(EVENTS.USER_LOGGED, { user })
  prepareScreensToReturningUser(user)
}

const handleUserNotLogged = () => {
  listenSignInButton()
  dispatchEvent(EVENTS.USER_NOT_LOGGED)
}

const handleChangeOnAuthentication = async (result) => {
	alert('handleChangeOnAuthentication')
  const { user } = result
  !user ? handleUserNotLogged() : handleUserLogged(user)

  const { goToLeaderboardButton, leaderboardScreen } = $el()

  goToLeaderboardButton.addEventListener('click', () => {
    if (!user) return
    $class.remove(leaderboardScreen, HIDDEN_CLASS)
    dispatchEvent(EVENTS.GO_TO_LEADERBOARD, { user })
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
