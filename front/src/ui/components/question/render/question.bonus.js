import { classHelper as $class, findById, delay } from 'sleepy-spider-lib'
import { VISIBLE_CLASS } from '@/ui/constants'
import { CORRECT_QUESTION_VALUE } from "@/domain/question"

const BONUS_WRAPPER_ID = 'question-bonus'
const DELAY_TO_HIDE_IN_MS = 2000

function setMessage (element) {
  element.textContent = `+${CORRECT_QUESTION_VALUE}`
}

function toggleVisibility (element) {
  $class.toggle(element, VISIBLE_CLASS)
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
