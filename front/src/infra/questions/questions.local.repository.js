import { shuffle } from "sleepy-spider-lib"
import { decodeQuestions } from "./question.decode"
import { parseQuestions } from "./question.mapper"

const QUESTIONS_SIZE_BY_DEFAULT = 40
const ERROR_MESSAGE = 'Error recovering the questions'

const API_URL = import.meta.env.VITE_API_URL
const SLUG = '/questions'

const log = (questions) => {
  if (import.meta.env.MODE === 'development') {
    console.log('Questions', questions)
  }
  return questions
}

const splice = (size) => (questions) => questions.splice(0, size)

function getQuestions(props) {
  const { size } = props || { size: QUESTIONS_SIZE_BY_DEFAULT }
  const endpoint = `${API_URL}${SLUG}`

  return fetch(endpoint)
    .then(response => response.json())
    .then(decodeQuestions)
    .then(log)
    .then(parseQuestions)
    .then(shuffle)
    .then(splice(size))
    .catch(error => {
      console.error(ERROR_MESSAGE, error)
      Promise.reject(new Error(ERROR_MESSAGE))
    }
    )
}

export {
  getQuestions,
}
