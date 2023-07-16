import { shuffle } from "sleepy-spider-lib"
import { parseMultiChoiceQuestion } from "./question.mapper"

const QUESTIONS_SIZE_BY_DEFAULT = 40
const questionsSizeByDefault = { size: QUESTIONS_SIZE_BY_DEFAULT }

function retrieveQuestions (questionsCollection) {
  const questions = []
  questionsCollection.forEach((question) => {
    questions.push(parseMultiChoiceQuestion(question))
  })
  return questions
}

async function getQuestions ({ size = QUESTIONS_SIZE_BY_DEFAULT } = questionsSizeByDefault) {
  try {
    const questions = await import('@/questions.json')
    const parseQuestions = retrieveQuestions(questions.default)
    return shuffle(parseQuestions).splice(0, size)
  } catch (error) {
    console.error('Error recovering the questions', error)
    throw error
  }
}

export {
  getQuestions,
}
