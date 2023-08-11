import { findById, getCacheByKey } from 'sleepy-spider-lib'

function setContent (key, content) {
  const $el = getQuestionSelectors()
  if (!$el[key]) {
    throw new Error(`Invalid key: ${key}`)
  } else if (!$el[key] instanceof Element) {
    throw new Error(`Invalid element: ${$el[key]}`)
  }
  $el[key].innerHTML = content
}

const findByIdCached = getCacheByKey(findById, false)
const getQuestionSelectors = () => {
  const options = findByIdCached('question-options')
  const getPossibleAnswers = () => options.querySelectorAll('li')

  return ({
    options,
    getPossibleAnswers,
    modal: findByIdCached('question-modal'),
    inner: findByIdCached('question-modal__inner'),
    shake: findByIdCached('question-modal__shake'),
    title: findByIdCached('question-title'),
    value: findByIdCached('question-value'),
    code: findByIdCached('question-pre'),
    eachAnswer: (callback) => {
      const answers = getPossibleAnswers()
      answers.forEach(callback)
    },
    examScore: {
      correct: findByIdCached('question-exam-score-correct'),
      incorrect: findByIdCached('question-exam-score-incorrect'),
    },
  })
}

export {
  setContent,
  getQuestionSelectors,
}
