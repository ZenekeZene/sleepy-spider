import { classHelper as $class } from "sleepy-spider-lib"
import {
  signInWithPopup,
  onAuthenticationStateChanged
} from '@/infra/services/authentication/authentication'
import { HIDDEN_CLASS } from '@/ui/constants'
import { getLeaderboardPreview } from '@/infra/leaderboard/leaderboard.repository'
import { showPreviewRanking } from './render/leaderboardPreview.render'
import { getLeaderboardPreviewSelectors as $el } from "./render/leaderboardPreview.selectors"
import * as events from './leaderboardPreview.events'

const createPreviewRanking = async (user) => {
  const rankingWithUser = await getLeaderboardPreview(user)
  showPreviewRanking({ rankingWithUser })
}

const handleSignIn = (authentication) => {
  signInWithPopup(authentication)
  .catch((error) => {
    error.mapErr((error) => {
      console.log(error)
    })
  })
}

const hideSignInButton = () => {
  const { signInButton } = $el()
  $class.add(signInButton, HIDDEN_CLASS)
}

const showSignInButton = (authentication) => {
  const { signInButton } = $el()
  $class.remove(signInButton, HIDDEN_CLASS)
  signInButton.addEventListener('click', () => handleSignIn(authentication))
}

const isFinalScreen = () => {
  const { finalScreen } = $el()
  return !$class.contains(finalScreen, HIDDEN_CLASS)
}

const prepareScreensToReturningUser = (user) => {
  if (isFinalScreen()) {
    events.dispatchGoToLeaderboard()
  } else {
    createPreviewRanking(user)
  }
}

const handleUserLogged = async (user) => {
  // This can be a new user or a returning user.
  hideSignInButton()
  events.dispatchUserLogged(user)
  prepareScreensToReturningUser(user)
}

const handleUserNotLogged = (authentication) => {
  showSignInButton(authentication)
  events.dispatchUserNotLogged()
}

const handleChangeOnAuthentication = (authentication) => async (result) => {
  const { user } = result
  !user ? handleUserNotLogged(authentication) : handleUserLogged(user)
}

function launchSignIn ({ authentication }) {
  onAuthenticationStateChanged({
    authentication,
    onChange: handleChangeOnAuthentication(authentication),
  })
}

export {
  launchSignIn,
}
