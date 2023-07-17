import { decode } from "sleepy-spider-lib"

const decodeQuestion = (question) => {
  const obj = {}
  for (const key in question) {
    obj[decode(key)] = decode(question[key])
  }
  return obj
}

const decodeQuestions = (questions) => questions.map(decodeQuestion)

export { decodeQuestions }
