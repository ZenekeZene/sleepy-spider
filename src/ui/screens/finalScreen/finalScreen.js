import { classHelper as $class, listenEvent, getBody } from 'sleepy-spider-lib'
import { EVENTS, stores } from '@/adapter'
import { HIDDEN_CLASS } from '@/ui/constants'
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

function showFinalScreen() {
  const awakeningStore = stores.awakening
  const { finalScreen, score, backdrop } = $el()
  show(finalScreen)
  show(backdrop)
  hideElements()
  score.textContent = awakeningStore.value
  toggleLeaderboardButton()
  listenPlayAgainButton()
}

const handleEndTimer = () => {
  showFinalScreen()
  $class.remove(getBody(), 'headShakeHard')
}

function prepareFinalScreen () {
  listenEvent(EVENTS.END_TIMER, handleEndTimer)
}

export { prepareFinalScreen }
