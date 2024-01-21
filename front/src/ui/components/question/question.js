import { toggleElement, removeCommas, dispatchEvent, listenEvent } from "sleepy-spider-lib"
import { QUESTION_TYPES } from "@/domain/question"
import { EVENTS } from "@/adapter"
import DoubleTapZoom from "@/ui/gui/doubleTapZoom/doubleTapZoom"
import { dispatchAnsweredCorrect } from "./question.event"
import { getQuestionSelectors as $el } from "./render/question.selectors"
import { showCorrectAnswerBonus } from "./render/question.bonus"
import { renderQuestion, closeQuestion } from "./render/question.render"
import { createQuestion } from "./question.factory"

const DELAY_TO_ENABLE_ANSWER_IN_MS = 1000
const eventsForcedClose = [
  EVENTS.END_TIMER,
  EVENTS.NO_INTERNET,
  EVENTS.INACTIVE_TAB,
]

function onAnswered(questionWithType, event) {
  const { type } = questionWithType
  const { answer } = questionWithType.question

  let value = event.target.textContent
  if (type === QUESTION_TYPES.SPECIFICITY) {
    value = removeCommas(value)
  }

  const isCorrect = answer === value
  renderQuestion().result(isCorrect, answer, event)

  if (!isCorrect) return
  showCorrectAnswerBonus()
  dispatchAnsweredCorrect()
}

function checkAnswer(question) {
  let isAnswered = false

  const listen = (isAdd = true) => {
    const listenerAction = isAdd ? 'addEventListener' : 'removeEventListener'
    $el().eachAnswer(answer => {
      answer[listenerAction]('click', handleAnswer)
    })
  }

  const unlisten = () => listen(false)

  const handleAnswer = (event) => {
    if (isAnswered) return
    onAnswered(question, event)
    isAnswered = true
    unlisten()
    DoubleTapZoom.enable()
    closeQuestion(event).then(() => {
      dispatchEvent(EVENTS.MODAL_CLOSE)
    })
  }
  setTimeout(() => {
    listen()
  }, DELAY_TO_ENABLE_ANSWER_IN_MS)
}

function drawQuestion(rawQuestion) {
  const question = createQuestion(rawQuestion)
  checkAnswer(question)
}

function launchQuestion(rawQuestion) {
  const { modal } = $el()
  if (!modal) return
  toggleElement(modal)
  dispatchEvent(EVENTS.MODAL_OPEN)
  drawQuestion(rawQuestion)
}

function onShowQuestion(questions) {
  if (!questions || questions.length === 0) throw new Error('No questions to show')
  const question = questions.pop()
  launchQuestion(question)
  DoubleTapZoom.disable()

  const { modal } = $el()
  eventsForcedClose.forEach(event => {
    listenEvent(event, () => {
      toggleElement(modal)
    })
  })
}

export {
  onShowQuestion,
}

