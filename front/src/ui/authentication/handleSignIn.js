import { classHelper as $class, dispatchEvent, listenEvent } from "sleepy-spider-lib"
import {
  signInWithPopup,
  onAuthenticationStateChanged
} from '@/infra/services/authentication/authentication'
import { HIDDEN_CLASS } from '@/ui/constants'
import { EVENTS } from "@/adapter"
import { createPreviewRanking } from '@/ui/leaderboard/preview/leaderboardPreview'
import { getSelectors as $el } from "./signIn.selectors"
import { toShow, toHide } from './signIn.titles'
import { signIn } from '@/application/signin/signin'

const handleSignIn = () => {
	signIn(signInWithPopup)
  .catch((error) => {
		dispatchEvent(EVENTS.MODAL_OPEN)
		dispatchEvent(EVENTS.ERROR_WITH_SIGN_IN, { error })
  })
}

const listenSignInButton = () => {
  const { signInButton } = $el()
  toShow.signInButton()
  signInButton.addEventListener('click', handleSignIn)
}

const prepareScreensToReturningUser = (score) => {
		createPreviewRanking(score)
    toShow.leaderboardButton()
}

// (1)
const handleUserLogged = async (user) => {
  toHide.signInButton()
  dispatchEvent(EVENTS.USER_LOGGED, { user })
}

const handleUserNotLogged = () => {
  listenSignInButton()
  dispatchEvent(EVENTS.USER_NOT_LOGGED)
}

const handleChangeOnAuthentication = async (result) => {
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
	listenEvent(EVENTS.UPDATE_BEST_SCORE_OF_USER, ({ detail }) => {
		const score = detail.score
		prepareScreensToReturningUser(score)
	})
  onAuthenticationStateChanged({
    onChange: handleChangeOnAuthentication,
  })
}

export {
  launchSignIn,
}

// (1) This can be a new user or a returning user.
