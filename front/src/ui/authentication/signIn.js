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

const signInHandlers = {
  [EVENTS.ERROR_WITH_SIGN_IN]: handleErrorWithSignIn,
  [EVENTS.USER_LOGGED]: handleUserLogged,
  [EVENTS.USER_NOT_LOGGED]: handleUserNotLogged,
};

const prepareSignIn = () => {
  launchSignIn();
  Object.entries(signInHandlers).forEach(([event, handler]) => {
    listenEvent(event, handler);
  });
};


export {
  prepareSignIn,
}
