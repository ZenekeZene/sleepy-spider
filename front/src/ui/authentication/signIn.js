import { listenEvent } from 'sleepy-spider-lib'
import { EVENTS, stores } from '@/adapter'
import { launchSignIn } from './handleSignIn'
import { show, hide } from './signIn.titles'

const handleUserLogged = async () => {
  const { user } = stores.auth
  hide.title()
}

const handleUserNotLogged = () => {
  show.title()
}

const handleErrorWithSignIn = () => {
  show.errorWithSignIn()
}

const prepareSignIn = () => {
  launchSignIn()
  listenEvent(EVENTS.ERROR_WITH_SIGN_IN, handleErrorWithSignIn)
  listenEvent(EVENTS.USER_LOGGED, handleUserLogged)
  listenEvent(EVENTS.USER_NOT_LOGGED, handleUserNotLogged)
}

export {
  prepareSignIn,
}
