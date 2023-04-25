import { classHelper as $class, dispatchEvent } from "sleepy-spider-lib"
import { EVENTS } from "@/adapter/events/events"
import {
  signInWithRedirect,
  onAuthenticationStateChanged
} from '@/infra/services/authentication/authentication'
import { HIDDEN_CLASS } from '@/ui/constants'
import { getLeaderboardPreview } from '@/infra/leaderboard/leaderboard.repository'
import { showPreviewRanking } from './render/leaderboardPreview.render'
import { getLeaderboardPreviewSelectors as $el } from "./render/leaderboardPreview.selectors"

const dispatchSignIn = (user, token) => {
  dispatchEvent(EVENTS.SIGN_IN, { user, token })
}

const dispatchLogout = () => {
  dispatchEvent(EVENTS.LOGOUT)
}

const createPreviewRanking = async ({ user }) => {
  const rankingWithUser = await getLeaderboardPreview({ user })
  showPreviewRanking({ rankingWithUser })
}

const handleSignIn = ({ authentication }) => signInWithRedirect({ authentication })

const hideSignInButton = () => {
  const { signInButton } = $el()
  $class.add(signInButton, HIDDEN_CLASS)
}

const showSignInButton = ({ authentication }) => {
  const { signInButton } = $el()
  $class.remove(signInButton, HIDDEN_CLASS)
  signInButton.addEventListener('click', () => handleSignIn({ authentication }))
}

function launchSignIn ({ authentication }) {
  onAuthenticationStateChanged({
    authentication,
    onChange: async ({ user }) => {
      if (!user) {
        showSignInButton()
        dispatchLogout()
        return
      }
      // if the final screen is shown, go to leaderboard.
      // if the final screen is not shown, modify the leaderboard preview {
        createPreviewRanking({ user })
      // }
      hideSignInButton()
      dispatchSignIn(user, user.accessToken)
    }
  })
}

export {
  launchSignIn,
}
