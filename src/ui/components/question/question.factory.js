import { renderQuestion } from "./render/question.render"
import { parseSpecificityQuestion } from "@/infra/questions/question.mapper"
import { QUESTION_TYPES, SPECIFICITY_PROBABILITY, generateQuestion } from "@/domain/question"

const title =  'Calculate the CSS specificity!'

function createSpecificityQuestion () {
  const question = generateQuestion()
  const finalQuestion = {
    title,
    ...question,
  }
  return finalQuestion
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

function createQuestion (question) {
  const questionWithType = decideQuestionType(question)
  renderQuestionByType(questionWithType)
  return questionWithType
}

export {
  createQuestion,
}
