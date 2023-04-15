import { listenEvent, getBody } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'
import { changeAllShareLinks } from '@/modules/share/share'
import { handlePersonalLocalRecord } from '@/modules/record/record'
import { finalSelectors as $el } from './finalScreen.selectors'
import './finalScreen.css'

const HIDE_CLASS = 'hidden'

function hideElements () {
  $el.elementsToHide.forEach(element => {
    element.classList.add(HIDE_CLASS)
  })
}

function showFinalScreen(finalScore) {
  $el.finalScreen.classList.remove(HIDE_CLASS)
  hideElements()
  $el.score.textContent = finalScore

  changeAllShareLinks(finalScore)
  handlePersonalLocalRecord(finalScore)

  $el.playAgainButton.addEventListener('click', () => {
    window.location.reload()
  })
}

function prepareFinalScreen () {
  listenEvent(EVENTS.END_TIMER, () => {
  const cachedCounter = new CachedCounter()
  const finalValue = cachedCounter.value
  showFinalScreen(finalValue)
  getBody().classList.remove('headShakeHard')
})
}

export {
  prepareFinalScreen
}
