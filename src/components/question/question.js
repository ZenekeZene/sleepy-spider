import * as $class from "@/lib/dom/class.helper"
import getHighlightedCode from "@/lib/prism/getHighlightedCode"
import { toggleElement } from "@/components/modal/modal"
import { createQuestion } from "./question.factory"
import { questionSelectors as $el, CLASSNAMES } from "./question.selectors"
import './question.css'

const DELAY_TO_HIDE_IN_MS = 2000

const reset = {
  question(event) {
    $class.removeAll([event.target, $el.inner], CLASSNAMES.ALL())
    $class.forEach($el.examScore, CLASSNAMES.VISIBLE, $class.remove)
  },
  hide(event) {
    setTimeout(() => {
      reset.question(event)
      toggleElement($el.modal)
    }, DELAY_TO_HIDE_IN_MS)
  }
}

const render = {
  question: (question) => {
    $el.setContent('title', question.title)
    $el.setContent('value', getHighlightedCode(question.value))
    $el.setContent('options', question.options.map(option => `<li>${option.label}</li>`).join(''))
  },
  result: (isCorrect, event) => {
    const className = CLASSNAMES.get(isCorrect)
    $class.forEach($el.examScore, CLASSNAMES.ALL(), $class.remove)
    $class.forEach($el.options.querySelectorAll('li'), 'disabled', $class.add)
    $class.addAll([event.target, $el.examScore[className]], [CLASSNAMES.VISIBLE, className])
    $el.inner.classList.toggle(className)
  }
}

function checkAnswer(question) {
  let isAnswered = false
  const options = $el.options.querySelectorAll('li')
  options.forEach(option => {
    option.addEventListener('click', (event) => {
      if (isAnswered) return
      const value = event.target.innerHTML
      const isCorrect = question.answer === value
      render.result(isCorrect, event)
      reset.hide(event)
      isAnswered = true
    })
  })
}

function initQuestion() {
  const question = createQuestion()
  render.question(question)
  checkAnswer(question)
}

function launchQuestion() {
  if (!$el.modal) return
  initQuestion()
}

export {
  launchQuestion,
}

