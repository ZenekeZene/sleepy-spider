import { shuffle } from "sleepy-spider-lib"
import { decodeQuestions } from "./question.decode"
import { parseQuestions } from "./question.mapper"

const QUESTIONS_SIZE_BY_DEFAULT = 40
const ERROR_MESSAGE = 'Error recovering the questions'

const API_URL = import.meta.env.VITE_API_URL
const SLUG = '/questions'

const splice = (questions, size) => questions.splice(0, size)

function getQuestions (props) {
  const { size } = props || { size: QUESTIONS_SIZE_BY_DEFAULT }
  const endpoint = `${API_URL}${SLUG}`

  return fetch(endpoint)
    .then(response => response.json())
    .then(decodeQuestions)
    .then(parseQuestions)
    .then(shuffle)
    .then(questions => splice(questions, size))
    .catch(error => {
      console.error(ERROR_MESSAGE, error)
      Promise.reject(new Error(ERROR_MESSAGE))
    }
  )
}

export {
  getQuestions,
}
