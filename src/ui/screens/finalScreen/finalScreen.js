import { classHelper as $class, listenEvent, getBody } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'
import { changeAllShareLinks } from '@/ui/components/share/share'
import { HIDDEN_CLASS } from '@/ui/constants'
import { handlePersonalLocalRecord } from './record/record'
import { getFinalSelectors } from './finalScreen.selectors'
import './finalScreen.css'

// TODO: This is a workaround. We need to find a better way to handle this.
// Vanilla Store.
let isUserLogged = false

function hideElements () {
  const $el = getFinalSelectors()
  $el.elementsToHide.forEach(element => {
    $class.add(element, HIDDEN_CLASS)
  })
}

function showFinalScreen(finalScore) {
  const $el = getFinalSelectors()
  $class.remove($el.finalScreen, HIDDEN_CLASS)
  hideElements()
  $el.score.textContent = finalScore

  changeAllShareLinks(finalScore)
  handlePersonalLocalRecord(finalScore)

  if (isUserLogged) {
    $class.remove($el.goToLeaderboardButton, HIDDEN_CLASS)
  } else {
    $class.add($el.goToLeaderboardButton, HIDDEN_CLASS)
  }

  $el.playAgainButton.addEventListener('click', () => {
    window.location.reload()
  })
}

const handleEndTimer = () => {
  const cachedCounter = new CachedCounter()
  const finalValue = cachedCounter.value
  showFinalScreen(finalValue)
  $class.remove(getBody(), 'headShakeHard')
}

function prepareFinalScreen () {
  listenEvent(EVENTS.USER_LOGGED, () => { isUserLogged = true })
  listenEvent(EVENTS.USER_NOT_LOGGED, () => { isUserLogged = false })
  listenEvent(EVENTS.END_TIMER, handleEndTimer)
}

export {
  prepareFinalScreen
}
