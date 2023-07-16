const express = require('express')
const questions = require('./question/question.routes')

const router = express.Router()

router.get(`/status`, (req, res) => {
  console.log('Running')
  res.status(200).send({
    status: 'running'
  })
})

router.get(`/questions`, questions.getAll)

module.exports = router
