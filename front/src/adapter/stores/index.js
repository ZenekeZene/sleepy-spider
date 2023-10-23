import { AwakeningStore } from './awakening/awakening.store'
import { AuthStore } from './authentication.store'
import { UntilShowQuestionCounter } from './questionCounter/untilShowQuestionCounter'

const stores = {
  awakening: new AwakeningStore(),
  auth: new AuthStore(),
	questionCounter: new UntilShowQuestionCounter(),
}

export { stores }
