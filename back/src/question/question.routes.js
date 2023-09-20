const databaseUrl = process.env.DATABASE_FILE
const questionsJSON = require('../databases/' + databaseUrl + '.json')
const { parseQuestions } = require('./question.parse')

async function getAll (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const result = parseQuestions(questionsJSON)
  res.json(result)
}

module.exports = {
  getAll,
}
