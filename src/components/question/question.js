import { toggleElement } from "@/lib/dom/dom"
import { QUESTION_TYPES } from "@/domain/question/question.types"
import { SPECIFICITY_PROBABILITY } from "@/domain/question/question.constants"
import { parseSpecificityQuestion } from "@/infra/questions/question.mapper"
import { createSpecificityQuestion } from "./question.factory"
import { questionSelectors as $el } from "./render/question.selectors"
import { renderQuestion, closeQuestion } from "./render/question.render"

const DELAY_TO_ENABLE_ANSWER_IN_MS = 2000

function onAnswered({ question }, event) {
  const value = event.target.innerHTML
  const isCorrect = question.answer === value
  renderQuestion.result(isCorrect, event)
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

function decideQuestionType (question) {
  const isSpecificity = Math.random() > SPECIFICITY_PROBABILITY
  if (isSpecificity) {
    const specifictyQuestion = createSpecificityQuestion()
    return parseSpecificityQuestion(specifictyQuestion)
  }
  return question
}

function renderQuestionByType (question) {
  const { type } = question
  if (type === QUESTION_TYPES.SPECIFICITY) {
    renderQuestion.specificityQuestion(question)
  } else if (type === QUESTION_TYPES.MULTICHOICE) {
    renderQuestion.multiChoiceQuestion(question)
  }
}

function drawQuestion(rawQuestion) {
  const question = decideQuestionType(rawQuestion)
  renderQuestionByType(question)
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

