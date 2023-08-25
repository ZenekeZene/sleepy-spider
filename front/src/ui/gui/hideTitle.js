import {
  classHelper as $class,
  findAllByClassName,
  findById,
  listenEvent,
  delay,
  isMobile,
} from 'sleepy-spider-lib'
import { HIDDEN_CLASS, INVISIBLE_CLASS } from '@/ui/constants'
import { EVENTS } from '@/adapter'

const TITLE_ID = 'title'
const MOBILE_TITLE_ID = 'title-mobile'
const USER_TITLE_ID = 'user-title'
const HIDE_TITLE_CLASSNAME = 'title-hidden'
const HIDE_CLASSNAME = 'hide-auto'

const HIDE_TITLE_DELAY_IN_MS = 3000

const hideTitleOnFirstClick = () => {
  const title = findById(TITLE_ID)
  const mobileTitle = findById(MOBILE_TITLE_ID)
  const userTitle = findById(USER_TITLE_ID)
  const hidesAuto = findAllByClassName(HIDE_CLASSNAME)
  const userCounter = findById('user-counter')
  const infoIconWrapper = findById('info-icon-wrapper')
  const infoIcon = findById('info-icon')
  const clock = findById('clock')
  const sponsor = findById('sponsor')
  const edition = findById('edition')

  listenEvent(EVENTS.FIRST_CLICK, async () => {
    $class.remove(userCounter, HIDDEN_CLASS)
    $class.add(infoIconWrapper, HIDDEN_CLASS)
    $class.add(infoIcon, HIDDEN_CLASS)
    $class.remove(clock, HIDDEN_CLASS)
    $class.add(mobileTitle, HIDDEN_CLASS)
    $class.add(userTitle, HIDDEN_CLASS)

    await delay(HIDE_TITLE_DELAY_IN_MS)
    // $class.add(sponsor, HIDDEN_CLASS)
    // $class.add(edition, HIDDEN_CLASS)
    // $class.add(title, HIDDEN_CLASS)
    if (!isMobile()) return

    // edition

    for (var i = 0; i < hidesAuto.length; i++) {
      $class.add(hidesAuto[i], INVISIBLE_CLASS)
    }
  })
}

export {
  hideTitleOnFirstClick,
}
