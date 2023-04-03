import { findById } from '@/lib/dom/dom'

const CLASSNAMES = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  VISIBLE: 'visible',
  DISABLED: 'disabled',
  get all () {
    return [
      this.CORRECT,
      this.INCORRECT,
      this.VISIBLE
    ]
  },
  get (value) {
    return value ? this.CORRECT : this.INCORRECT
  }
}

function setContent (key, content) {
  if (!questionSelectors[key]) {
    throw new Error(`Invalid key: ${key}`)
  } else if (!questionSelectors[key] instanceof Element) {
    throw new Error(`Invalid element: ${questionSelectors[key]}`)
  }
  questionSelectors[key].innerHTML = content
}

const questionSelectors = {
  modal: findById('question-modal'),
  inner: findById('question-modal__inner'),
  title: findById('question-title'),
  value: findById('question-value'),
  code: findById('question-pre'),
  options: findById('question-options'),
  getPossibleAnswers: () => questionSelectors.options.querySelectorAll('li'),
  eachAnswer: (callback) => {
    const answers = questionSelectors.getPossibleAnswers()
    answers.forEach(callback)
  },
  examScore: {
    correct: findById('question-exam-score-correct'),
    incorrect: findById('question-exam-score-incorrect'),
  },
  setContent
}

export {
  questionSelectors,
  CLASSNAMES,
}
