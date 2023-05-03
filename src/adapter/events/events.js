const EVENTS = Object.freeze({
  ANSWERED_CORRECT: 'answeredCorrect',
  FIRST_CLICK: 'firstClick',
  END_TIMER: 'endTimer',
  CHANGES_IN_SETTINGS: 'changesInSettings',
  USER_LOGGED: 'userLogged',
  USER_NOT_LOGGED: 'userNotLogged',
  GO_TO_LEADERBOARD: 'leaderboard',
})

const handler = {
  get(target, prop, receiver) {
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
