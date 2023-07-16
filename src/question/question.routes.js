const questionsJSON = require('./questions.database.json')
const { parseQuestions } = require('./question.parse')

async function getAll (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const result = parseQuestions(questionsJSON)
  res.json(result)
}

module.exports = {
  getAll,
}
