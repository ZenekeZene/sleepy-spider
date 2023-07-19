import { listenEvent } from 'sleepy-spider-lib'
import { EVENTS, stores } from '@/adapter'
import { launchSignIn } from './handleSignIn'
import { show, hide } from './signIn.titles'


const handleUserLogged = async () => {
  const { user } = stores.auth
  hide.title()
  show.userTitle(user)
}

const handleUserNotLogged = () => {
  show.title()
  hide.userTitle()
}

const prepareSignIn = () => {
  launchSignIn()
  listenEvent(EVENTS.USER_LOGGED, handleUserLogged)
  listenEvent(EVENTS.USER_NOT_LOGGED, handleUserNotLogged)
}

export {
  prepareSignIn,
}
