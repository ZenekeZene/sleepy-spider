import { toggleElement } from "@/lib/dom/dom"
import { QUESTION_TYPES } from "@/domain/question/question.types"
import { dispatchAnsweredCorrect } from "./question.event"
import { questionSelectors as $el } from "./render/question.selectors"
import { showCorrectAnswerBonus } from "./render/question.bonus"
import { renderQuestion, closeQuestion, removeCommas } from "./render/question.render"
import { createQuestion } from "./question.factory"

const DELAY_TO_ENABLE_ANSWER_IN_MS = 1000

function onAnswered(questionWithType, event) {
  const { type } = questionWithType
  const { answer } = questionWithType.question

  let value = event.target.textContent
  if (type === QUESTION_TYPES.SPECIFICITY) {
    value = removeCommas(value)
  }

  const isCorrect = answer === value
  renderQuestion.result(isCorrect, event)

  if (!isCorrect) return
  showCorrectAnswerBonus()
  dispatchAnsweredCorrect()
}

function checkAnswer(question) {
  let isAnswered = false

  const listen = (isAdd = true) => {
    const listenerAction = isAdd ? 'addEventListener': 'removeEventListener'
    $el.eachAnswer(answer => {
      answer[listenerAction]('click', handleAnswer)
    })
  }

  const unlisten = () => listen(false)

  const handleAnswer = (event) => {
    if (isAnswered) return
    onAnswered(question, event)
    isAnswered = true
    unlisten()
    closeQuestion(event)
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
  if (!$el.modal) return
  toggleElement($el.modal)
  drawQuestion(rawQuestion)
}

export {
  launchQuestion,
}

