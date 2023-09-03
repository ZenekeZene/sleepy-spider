import {
  classHelper as $class,
  listenEvent,
  delay,
  isMobile,
} from 'sleepy-spider-lib'
import { HIDDEN_CLASS, INVISIBLE_CLASS } from '@/ui/constants'
import { EVENTS } from '@/adapter'
import { getSelectors } from './hideGUIFirstClick.selectors'

const HIDE_TITLE_DELAY_IN_MS = 3000

const hideGUIOnFirstClick = () => {
  const $el = getSelectors()

  listenEvent(EVENTS.FIRST_CLICK, async () => {
    $class.remove($el.userCounter, HIDDEN_CLASS)
    $class.add($el.infoIconWrapper, HIDDEN_CLASS)
    $class.add($el.infoIcon, HIDDEN_CLASS)
    $class.remove($el.clock, HIDDEN_CLASS)
    $class.add($el.mobileTitle, HIDDEN_CLASS)

    await delay(HIDE_TITLE_DELAY_IN_MS)
    if (!isMobile()) return

    for (var i = 0; i < $el.hidesAuto.length; i++) {
      $class.add($el.hidesAuto[i], INVISIBLE_CLASS)
    }
  })
}

export {
  hideGUIOnFirstClick,
}
