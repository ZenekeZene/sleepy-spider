import { decode } from "sleepy-spider-lib"

const environment = process.env.NODE_ENV
const withEncoding = environment === 'production'

const d = (value) => withEncoding ? decode(value.toString()) : value.toString();

const decodeQuestion = (question) => {
  const obj = {}
  for (const key in question) {
    obj[d(key)] = d(question[key])
  }
  return obj
}

const decodeQuestions = (questions) => questions.map(decodeQuestion)

export { decodeQuestions }
