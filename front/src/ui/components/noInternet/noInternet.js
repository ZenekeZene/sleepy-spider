import { classHelper as $class } from 'sleepy-spider-lib'
import { dispatchEvent } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { VISIBLE_CLASS } from '@/ui/constants'
import { getSelectors as $el } from './noInternet.selectors'
import './noInternet.css'

function reload () {
  window.location.reload()
}

const show = (element) => $class.add(element, VISIBLE_CLASS)

function handleNoInternet () {
  const { noInternetModal, playAgainButton, triggers } = $el()
  playAgainButton.addEventListener('click', reload)
  triggers.forEach((trigger) => trigger.addEventListener('click', reload))

  dispatchEvent(EVENTS.NO_INTERNET)
  dispatchEvent(EVENTS.MODAL_OPEN)
  show(noInternetModal)
}

function prepareNoInternet () {
  if (!window.navigator.onLine) handleNoInternet()
  window.addEventListener('offline', handleNoInternet);
}

export { prepareNoInternet }
