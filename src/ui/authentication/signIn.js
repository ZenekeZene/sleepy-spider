import { listenEvent } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter/events/events'
import { launchSignIn } from './handleSignIn'
import { show, hide } from './signIn.titles'
import { AuthStore } from '@/adapter/stores/authentication.store'

const { auth } = new AuthStore()

const handleUserLogged = async () => {
  hide.title()
  show.userTitle(auth.user)
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
