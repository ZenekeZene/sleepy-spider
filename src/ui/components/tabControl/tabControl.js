import { classHelper as $class } from 'sleepy-spider-lib'
import { listenEvent, dispatchEvent } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { VISIBLE_CLASS } from '@/ui/constants'
import { getSelectors as $el } from './tabControl.selectors'
import './tabControl.css'

let isPLaying = false

function reload () {
  window.location.reload()
}

const show = (element) => $class.add(element, VISIBLE_CLASS)

function handleVisibilityChange () {
  if (!isPLaying) return
  const { inactiveTabModal, playAgainButton, triggers } = $el()
  playAgainButton.addEventListener('click', reload)
  triggers.forEach((trigger) => trigger.addEventListener('click', reload))


  if (document.visibilityState === "visible") return
  dispatchEvent(EVENTS.INACTIVE_TAB)
  dispatchEvent(EVENTS.MODAL_OPEN)
  show(inactiveTabModal)
}

function prepareTabControl () {
  listenEvent(EVENTS.END_TIMER, () => {
    isPLaying = false
  })

  listenEvent(EVENTS.FIRST_CLICK, () => {
    isPLaying = true
  })
  document.addEventListener('visibilitychange', handleVisibilityChange)
}

export { prepareTabControl }
