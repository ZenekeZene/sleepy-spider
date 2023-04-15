import { findById, delay } from 'sleepy-spider-lib'
import { CORRECT_QUESTION_VALUE } from "@/domain/question/question.constants"

const BONUS_WRAPPER_ID = 'question-bonus'
const BONUS_TOGGLE_CLASS = 'visible'
const DELAY_TO_HIDE_IN_MS = 2000

function setMessage (element) {
  element.textContent = `+${CORRECT_QUESTION_VALUE}`
}

function toggleVisibility (element) {
  element.classList.toggle(BONUS_TOGGLE_CLASS)
}

async function showCorrectAnswerBonus () {
  const bonusWrapper = findById(BONUS_WRAPPER_ID)
  if (!bonusWrapper) return
  setMessage(bonusWrapper)
  toggleVisibility(bonusWrapper)
  await delay(DELAY_TO_HIDE_IN_MS)
  toggleVisibility(bonusWrapper)
}

export { showCorrectAnswerBonus }
