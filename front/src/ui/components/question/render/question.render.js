import {
  toggleElement,
  delay,
  getHighlightedCode,
  classHelper as $class,
  addCommas, removeCommas,
} from "sleepy-spider-lib"
import { getQuestionSelectors, setContent } from "./question.selectors"
import { CLASSNAMES } from "./question.classnames"
import './question.css'

const DELAY_TO_HIDE_IN_MS = 1000
const VERTICAL_CLASSNAME = '--vertical'
const SPECIFICITY_CLASSNAME = '--specificity'

const answersSpecificity = (options) => {
  const answers = options.map((value) => `<li>${addCommas(value)}</li>`)
  return answers.join('')
}

const answers = (options) => {
  const answers = options.map((value) => `<li>${value}</li>`)
  return answers.join('')
}

const shake = async (isCorrect) => {
  const shake = CLASSNAMES.getShake(isCorrect)
  $class.add($el.shake, shake)
  await delay(DELAY_TO_HIDE_IN_MS)
  $class.remove($el.shake, shake)
}


const renderQuestion = () => {
  const $el = getQuestionSelectors()
  const { code, modal, examScore, inner, options: answersList } = $el

  const showCorrect = (answer) => {
    const correctAnswer = $el.getCorrectAnswer(answer)
    if (!correctAnswer) return
    correctAnswer.classList.add(CLASSNAMES.CORRECT)
  }

  return {
    answersSpecificity,
    answers,
    shake,
    specificityQuestion: ({ question }) => {
      const { title, value, options } = question
      $class.remove(modal, VERTICAL_CLASSNAME)
      $class.add(answersList, SPECIFICITY_CLASSNAME)
      setContent('title', title)
      code.style.display = 'block'
      setContent('value', getHighlightedCode(value))
      setContent('options', answersSpecificity(options))
    },
    multiChoiceQuestion: ({ question }) => {
      const { title, options } = question
      $class.add(modal, VERTICAL_CLASSNAME)
      $class.remove(answersList, SPECIFICITY_CLASSNAME)
      setContent('title', title)
      code.style.display = 'none'
      setContent('options', answers(options))
    },
    result: async (isCorrect, answer, event) => {
      const className = CLASSNAMES.get(isCorrect)
      $class.forEach(examScore, CLASSNAMES.all, $class.remove)
      $class.forEach($el.getPossibleAnswers(), CLASSNAMES.DISABLED, $class.add)
      $class.addAll([event.target, examScore[className]], [CLASSNAMES.VISIBLE, className])
      $class.toggle(inner, className)
      if (!isCorrect) showCorrect(answer)
      // await renderQuestion.shake(isCorrect)
    },
  }
}

async function closeQuestion({ target }) {
  const { inner, examScore, modal } = getQuestionSelectors()
  await delay(DELAY_TO_HIDE_IN_MS)
  $class.removeAll([target, inner], CLASSNAMES.all)
  $class.forEach(examScore, CLASSNAMES.VISIBLE, $class.remove)
  toggleElement(modal)
}

export {
  renderQuestion,
  closeQuestion,
  removeCommas,
}
