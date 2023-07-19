import { listenEvent } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'

const AuthStore = (function() {
  let instance

  function AuthStore() {
    if (instance) {
      return instance
    }
    instance = this
    this.auth = {
      isLogged: false,
      user: null,
    }

    this.setUser = function(user) {
      this.auth.user = user
      this.auth.isLogged = Boolean(user)
    }

    listenEvent(EVENTS.USER_LOGGED, ({ detail }) => {
      this.setUser(detail.user)
    })
    listenEvent(EVENTS.USER_NOT_LOGGED, () => {
      this.setUser(null)
    })

  }

  return AuthStore
})()

export { AuthStore }
