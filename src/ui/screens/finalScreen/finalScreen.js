import { classHelper as $class, listenEvent, getBody, delay } from 'sleepy-spider-lib'
import { EVENTS, stores } from '@/adapter'
import { HIDDEN_CLASS } from '@/ui/constants'
import { launchConfetti } from '@/ui/components/confetti/confetti'
import { createPreviewRanking } from '@/ui/leaderboard/preview/leaderboardPreview'
import { createSignUpRanking } from '@/ui/leaderboard/preview-signup/leaderboardPreview.signup'
import { getSelectors as $el } from './finalScreen.selectors'
import './finalScreen.css'

function hide (element) {
  $class.add(element, HIDDEN_CLASS)
}

function show (element) {
  $class.remove(element, HIDDEN_CLASS)
}

function hideElements () {
  const { elementsToHide } = $el()
  elementsToHide.forEach(element => {
    hide(element)
  })
}

function toggleLeaderboardButton () {
  const { isLogged } = stores.auth
  const { goToLeaderboardButton, recordMessage } = $el()
  const toggle = isLogged ? show : hide
  toggle(goToLeaderboardButton)
  if (isLogged) return
  hide(recordMessage)
}

function reload () {
  window.location.reload()
}

function listenPlayAgainButton () {
  const { playAgainButton } = $el()
  playAgainButton.addEventListener('click', reload)
}

function disablePointerEvents () {
  $class.add(getBody(), 'no-pointer')
}

function enablePointerEvents () {
  $class.remove(getBody(), 'no-pointer')
}

function showFinalScreen() {
  const awakeningStore = stores.awakening
  const { finalScreen, score, backdrop } = $el()
  show(finalScreen)

  disablePointerEvents()

  hideElements()
  score.textContent = awakeningStore.value
  toggleLeaderboardButton()
  listenPlayAgainButton()

  delay(2000).then(() => {
    enablePointerEvents()
  })
}

const handleNewRecord = () => {
  const { newRecordMessage, recordMessage } = $el()
  show(newRecordMessage)
  hide(recordMessage)
  launchConfetti()
}

const handleEndTimer = () => {
  showFinalScreen()
  $class.remove(getBody(), 'headShakeHard')
  if (!stores.auth.isLogged) {
    createSignUpRanking()
    return
  } else {
    createPreviewRanking(stores.auth.user)
  }
}

function prepareFinalScreen () {
  listenEvent(EVENTS.END_TIMER, handleEndTimer)
  listenEvent(EVENTS.NEW_RECORD, handleNewRecord)
}

export { prepareFinalScreen }
