import { changeAllShareLinks } from '@/components/share/share'
import { handlePersonalLocalRecord } from '@/components/record/record'
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

export {
  showFinalScreen
}
