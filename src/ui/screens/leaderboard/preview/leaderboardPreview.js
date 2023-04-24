import { classHelper as $class, dispatchEvent, findById } from "sleepy-spider-lib"
import { EVENTS } from "@/adapter/events/events"
import { HIDDEN_CLASS } from '@/ui/constants'
import { signInWithRedirect, onAuthenticationStateChanged } from '@/infra/services/authentication/authentication'

const SIGNIN_BUTTON_ID = 'leaderboard-preview-signup'

const dispatchSignIn = (user, token) => {
  dispatchEvent(EVENTS.SIGN_IN, { user, token })
}

const dispatchLogout = () => {
  dispatchEvent(EVENTS.LOGOUT)
}

const signIn = ({ authentication }) => signInWithRedirect({ authentication })

function launchSignIn ({ authentication }) {
  const signupButton = findById(SIGNIN_BUTTON_ID)

  const onSignup = () => { signIn({ authentication }) }

  onAuthenticationStateChanged({
    authentication,
    onChange: async ({ user }) => {
      if (!user) {
        $class.remove(signupButton, HIDDEN_CLASS)
        signupButton.addEventListener('click', onSignup)
        dispatchLogout()
        return
      }
      // if the final screen is shown, go to leaderboard.
      // if the final screen is not shown, modify the leaderboard preview.
      dispatchSignIn(user, user.accessToken)
      $class.add(signupButton, HIDDEN_CLASS)
      signupButton.removeEventListener('click', onSignup)
    }
  })
}

export {
  launchSignIn,
}
