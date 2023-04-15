import { dispatchEvent } from "sleepy-spider-lib"
import { CORRECT_QUESTION_VALUE } from "@/domain/question/question.constants"

const EVENT_NAME = 'answeredCorrect'

const payload = {
  value: CORRECT_QUESTION_VALUE
}

function dispatchAnsweredCorrect () {
  dispatchEvent(EVENT_NAME, { ...payload })
}

export {
  dispatchAnsweredCorrect
}
