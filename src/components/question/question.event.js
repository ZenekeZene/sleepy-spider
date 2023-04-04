import { CORRECT_QUESTION_VALUE } from "@/domain/question/question.constants"

const EVENT_NAME = 'answeredCorrect'

const payload = {
  value: CORRECT_QUESTION_VALUE
}

function dispatchAnsweredCorrect () {
  const event = new CustomEvent(EVENT_NAME, { detail: { payload } })
  document.dispatchEvent(event)
}

export {
  dispatchAnsweredCorrect
}
