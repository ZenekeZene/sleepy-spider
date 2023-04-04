import { LIMIT_TO_SHOW_QUESTION } from '@/domain/question/question.constants'

class UntilShowQuestionCounter {
  constructor () {
    this.value = 0
  }

  increment (value) {
    this.value += value
  }

  reset () {
    this.value = 0
  }

  isLimitReached () {
    const isLimitReached = this.value >= LIMIT_TO_SHOW_QUESTION
    if (isLimitReached) {
      this.reset()
    }
    return isLimitReached
  }

  isLimitReachedByValue = (value) => {
    this.increment(value)
    const isLimitReached = this.isLimitReached()
    if (isLimitReached) {
      this.reset()
    }
    return isLimitReached
  }
}

const untilShowQuestionCounter = new UntilShowQuestionCounter()

export {
  untilShowQuestionCounter,
}
