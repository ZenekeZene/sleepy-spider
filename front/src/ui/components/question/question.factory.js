import { renderQuestion } from "./render/question.render"
import { parseSpecificityQuestion } from "@/infra/questions/question.mapper"
import { QUESTION_TYPES, SPECIFICITY_PROBABILITY_PERCENTAGE, generateQuestion } from "@/domain/question"

const title =  'Calculate the CSS specificity!'

function createSpecificityQuestion () {
  const question = generateQuestion()
  const finalQuestion = {
    title,
    ...question,
  }
  return finalQuestion
}

function randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function decideQuestionType (question) {
  const randomPercentage = randomInteger(0, 100)
  const isSpecificity = randomPercentage < Number(SPECIFICITY_PROBABILITY_PERCENTAGE)
  if (isSpecificity) {
    const specifictyQuestion = createSpecificityQuestion()
    return parseSpecificityQuestion(specifictyQuestion)
  }
  return question
}

function renderQuestionByType (question) {
  const { type } = question
  const { specificityQuestion, multiChoiceQuestion } = renderQuestion()
  if (type === QUESTION_TYPES.SPECIFICITY) {
    specificityQuestion(question)
  } else if (type === QUESTION_TYPES.MULTICHOICE) {
    multiChoiceQuestion(question)
  }
}

function createQuestion (question) {
  const questionWithType = decideQuestionType(question)
  renderQuestionByType(questionWithType)
  return questionWithType
}

export {
  createQuestion,
}
