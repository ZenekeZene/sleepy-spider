import { listenEvent } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter/events/events'
import { launchSignIn } from '@/ui/screens/leaderboard/preview/leaderboardPreview'
import { show, hide } from './signIn.titles'

const handleSignIn = ({ detail }) => {
  const { user, token } = detail
  hide.title()
  show.userTitle(user)
  show.leaderboardButton()
}

const handleLogout = () => {
  show.title()
  hide.userTitle()
  hide.leaderboardButton()
}

const prepareSignIn = ({ authentication }) => {
  launchSignIn({ authentication })
  listenEvent(EVENTS.SIGN_IN, handleSignIn)
  listenEvent(EVENTS.LOGOUT, handleLogout)
}

export {
  prepareSignIn,
}
