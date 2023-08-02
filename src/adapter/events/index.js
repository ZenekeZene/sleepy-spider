const EVENTS = Object.freeze({
  ANSWERED_CORRECT: 'answeredCorrect',
  FIRST_CLICK: 'firstClick',
  END_TIMER: 'endTimer',
  INACTIVE_TAB: 'inactiveTab',
  CHANGES_IN_SETTINGS: 'changesInSettings',
  USER_LOGGED: 'userLogged',
  USER_NOT_LOGGED: 'userNotLogged',
  GO_TO_LEADERBOARD: 'leaderboard',
  NEW_RECORD: 'newRecord',
  NO_INTERNET: 'noInternet',
  ERROR_WITH_SIGN_IN: 'errorWithSignIn',
})

const handler = {
  get(target, prop) {
    if (!EVENTS.hasOwnProperty(prop)) {
      throw new Error(`Event ${prop} does not exist.`)
    }
    return Reflect.get(...arguments)
  },
};

const proxy = new Proxy(EVENTS, handler)

export {
  proxy as EVENTS,
}
