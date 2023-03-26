const CLASSNAMES = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  VISIBLE: 'visible',
  ALL() {
    return [this.CORRECT, this.INCORRECT, this.VISIBLE]
  },
  get (value) {
    return value ? this.CORRECT : this.INCORRECT
  }
}

const findById = id => document.getElementById(id)

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
  options: findById('question-options'),
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
