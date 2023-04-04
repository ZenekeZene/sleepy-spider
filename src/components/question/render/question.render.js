import { toggleElement } from "@/lib/dom/dom"
import * as $class from "@/lib/dom/class.helper"
import { delay } from "@/lib/time"
import { getHighlightedCode } from "@/lib/prism"
import { questionSelectors as $el, CLASSNAMES } from "./question.selectors"
import './question.css'

const DELAY_TO_HIDE_IN_MS = 1000

const renderWithCommas = (text) => text.split('').join(',')
const removeCommas = (text) => text.split(',').join('')

const renderQuestion = {
  answers: (options) => {
    const answers = options.map((value) => `<li>${value}</li>`)
    return answers.join('')
  },
  answersSpecificity: (options) => {
    const answers = options.map((value) => `<li>${renderWithCommas(value)}</li>`)
    return answers.join('')
  },
  specificityQuestion: ({ question }) => {
    const { title, value, options } = question
    $el.modal.classList.remove('--vertical')
    $el.setContent('title', title)
    $el.code.style.display = 'block'
    $el.setContent('value', getHighlightedCode(value))
    $el.setContent('options', renderQuestion.answersSpecificity(options))
  },
  multiChoiceQuestion: ({ question }) => {
    const { title, options } = question
    $el.modal.classList.add('--vertical')
    $el.setContent('title', title)
    $el.code.style.display = 'none'
    $el.setContent('options', renderQuestion.answers(options))
  },
  result: (isCorrect, event) => {
    const className = CLASSNAMES.get(isCorrect)
    $class.forEach($el.examScore, CLASSNAMES.all, $class.remove)
    $class.forEach($el.getPossibleAnswers(), CLASSNAMES.DISABLED, $class.add)
    $class.addAll([event.target, $el.examScore[className]], [CLASSNAMES.VISIBLE, className])
    $class.toggle($el.inner, className)
  }
}

async function closeQuestion ({ target }) {
  await delay(DELAY_TO_HIDE_IN_MS)
  $class.removeAll([target, $el.inner], CLASSNAMES.all)
  $class.forEach($el.examScore, CLASSNAMES.VISIBLE, $class.remove)
  toggleElement($el.modal)
}

export {
  renderQuestion,
  closeQuestion,
  removeCommas,
}
