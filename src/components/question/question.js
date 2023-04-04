import { toggleElement } from "@/lib/dom/dom"
import { delay } from "@/lib/time"
import { QUESTION_TYPES } from "@/domain/question/question.types"
import { CORRECT_QUESTION_VALUE } from "@/domain/question/question.constants"
import { questionSelectors as $el } from "./render/question.selectors"
import { renderQuestion, closeQuestion, removeCommas } from "./render/question.render"
import { createQuestion } from "./question.factory"

const DELAY_TO_ENABLE_ANSWER_IN_MS = 2000

function dispatchAnsweredCorrect () {
  const event = new CustomEvent('answeredCorrect', { detail: { value: CORRECT_QUESTION_VALUE } })
  document.dispatchEvent(event)
}

async function showCorrectAnswerBonus () {
  const bonusWrapper = document.getElementById('question-bonus')
  if (!bonusWrapper) return
  bonusWrapper.textContent = `+${CORRECT_QUESTION_VALUE}`
  bonusWrapper.classList.add('visible')
  await delay(2000)
  bonusWrapper.classList.remove('visible')
}

function onAnswered(questionWithType, event) {
  const { type } = questionWithType
  const { answer } = questionWithType.question
  let value = event.target.textContent
  if (type === QUESTION_TYPES.SPECIFICITY) {
    value = removeCommas(value)
  }
  const isCorrect = answer === value
  renderQuestion.result(isCorrect, event)

  if (isCorrect) {
    showCorrectAnswerBonus()
    dispatchAnsweredCorrect()
  }
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

