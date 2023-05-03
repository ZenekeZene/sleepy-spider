import { listenEvent } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter/events/events'
import { launchSignIn } from '@/ui/screens/leaderboard/preview/leaderboardPreview'
import { show, hide } from './signIn.titles'

const handleUserLogged = async ({ detail }) => {
  const { user, token } = detail

  hide.title()
  show.userTitle(user)
}

const handleUserNotLogged = () => {
  show.title()
  hide.userTitle()
}

const prepareSignIn = ({ authentication }) => {
  launchSignIn({ authentication })
  listenEvent(EVENTS.USER_LOGGED, handleUserLogged)
  listenEvent(EVENTS.USER_NOT_LOGGED, handleUserNotLogged)
}

export {
  prepareSignIn,
}
