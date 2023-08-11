import { AwakeningStore } from './awakening/awakening.store'
import { AuthStore } from './authentication.store'

const stores = {
  awakening: new AwakeningStore(),
  auth: new AuthStore(),
}

export { stores }
