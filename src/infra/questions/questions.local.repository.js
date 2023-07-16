import { decode, shuffle } from "sleepy-spider-lib"
import { parseMultiChoiceQuestion } from "./question.mapper"

const QUESTIONS_SIZE_BY_DEFAULT = 40
const questionsSizeByDefault = { size: QUESTIONS_SIZE_BY_DEFAULT }
const API_URL = import.meta.env.VITE_API_URL

const decodeQuestion = (question) => {
  const obj = {}
  for (const key in question) {
    obj[decode(key)] = decode(question[key])
  }
  return obj
}

const decodeQuestions = (questions) => questions.map(decodeQuestion)

function parseQuestions (questionsCollection) {
  const questions = []
  questionsCollection.forEach((question) => {
    questions.push(parseMultiChoiceQuestion(question))
  })
  return questions
}

function getQuestions ({ size = QUESTIONS_SIZE_BY_DEFAULT } = questionsSizeByDefault) {
  return fetch(`${API_URL}/questions`)
    .then(response => response.json())
    .then(decodeQuestions)
    .then(parseQuestions)
    .then(data => shuffle(data).splice(0, size))
    .catch(error => {
      console.error('Error recovering the questions', error)
      Promise.reject(new Error('Error recovering the questions'))
    }
  )
}

export {
  getQuestions,
}
