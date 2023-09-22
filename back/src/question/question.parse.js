let { encode } = require('sleepy-spider-lib')
const { MODEL } = require('./question.model')

const environment = process.env.NODE_ENV
const withEncoding = environment === 'production'

const e = (value) => withEncoding ? encode(value.toString()) : value.toString();

const parseQuestion = (question) => ({
  [e(MODEL.OPTION1)]: e(question[MODEL.OPTION1]),
  [e(MODEL.OPTION2)]: e(question[MODEL.OPTION2]),
  [e(MODEL.OPTION3)]: e(question[MODEL.OPTION3]),
  [e(MODEL.OPTION4)]: e(question[MODEL.OPTION4]),
  [e(MODEL.ANSWER)]: e(question[MODEL.ANSWER]),
  [e(MODEL.CORRECT)]: e(question[MODEL.CORRECT]),
})

const parseQuestions = (questions) => questions.map(parseQuestion)

module.exports = {
  parseQuestions,
}
