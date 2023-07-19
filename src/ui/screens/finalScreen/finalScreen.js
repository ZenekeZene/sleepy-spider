import { classHelper as $class, listenEvent, getBody } from 'sleepy-spider-lib'
import { EVENTS, stores } from '@/adapter'
import { changeAllShareLinks } from '@/ui/components/share/share'
import { HIDDEN_CLASS } from '@/ui/constants'
import { getSelectors as $el } from './finalScreen.selectors'
import './finalScreen.css'

function hideElements () {
  const { elementsToHide } = $el()
  elementsToHide.forEach(element => {
    $class.add(element, HIDDEN_CLASS)
  })
}

function toggleLeaderboardButton () {
  const { isLogged } = stores.auth
  const { goToLeaderboardButton} = $el()
  const toggle = isLogged ? $class.remove : $class.add
  toggle(goToLeaderboardButton, HIDDEN_CLASS)
}

function listenPlayAgainButton () {
  const { playAgainButton } = $el()
  playAgainButton.addEventListener('click', () => {
    window.location.reload()
  })
}

function showFinalScreen() {
  const awakeningStore = stores.awakening
  const { finalScreen, score } = $el()
  $class.remove(finalScreen, HIDDEN_CLASS)
  hideElements()
  score.textContent = awakeningStore.value

  changeAllShareLinks(awakeningStore.value)
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
