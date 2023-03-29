import * as $class from "@/lib/dom/class.helper"
import { getHighlightedCode } from "@/lib/prism"
import { delay } from "@/lib/time"
import { toggleElement } from "@/lib/dom/dom"
import { createQuestion } from "./question.factory"
import { questionSelectors as $el, CLASSNAMES } from "./question.selectors"
import './question.css'

const DELAY_TO_HIDE_IN_MS = 2000

async function closeQuestion ({ target }) {
  await delay(DELAY_TO_HIDE_IN_MS)
  $class.removeAll([target, $el.inner], CLASSNAMES.all)
  $class.forEach($el.examScore, CLASSNAMES.VISIBLE, $class.remove)
  toggleElement($el.modal)
}

const render = {
  answers: (options) => {
    const answers = options.map(({ label }) => `<li>${label}</li>`)
    return answers.join('')
  },
  question: ({ title, value, options }) => {
    $el.setContent('title', title)
    $el.setContent('value', getHighlightedCode(value))
    $el.setContent('options', render.answers(options))
  },
  result: (isCorrect, event) => {
    const className = CLASSNAMES.get(isCorrect)
    $class.forEach($el.examScore, CLASSNAMES.all, $class.remove)
    $class.forEach($el.getPossibleAnswers(), CLASSNAMES.DISABLED, $class.add)
    $class.addAll([event.target, $el.examScore[className]], [CLASSNAMES.VISIBLE, className])
    $class.toggle($el.inner, className)
  }
}

function onAnswered(question, event) {
  const value = event.target.innerHTML
  const isCorrect = question.answer === value
  render.result(isCorrect, event)
}

function checkAnswer(question) {
  let isAnswered = false

  const listen = (isAdd = true) => {
    const listenerAction = isAdd ? 'addEventListener': 'removeEventListener'
    $el.eachAnswer(answer => {
      answer[listenerAction]('click', handleAnswer)
    })
  }

  const unlisten = () => listen(false)

  const handleAnswer = (event) => {
    if (isAnswered) return
    onAnswered(question, event)
    isAnswered = true
    unlisten()
    closeQuestion(event)
  }
  listen()
}

function initQuestion() {
  const question = createQuestion()
  render.question(question)
  checkAnswer(question)
}

function launchQuestion() {
  if (!$el.modal) return
  toggleElement($el.modal)
  initQuestion()
}

export {
  launchQuestion,
}

