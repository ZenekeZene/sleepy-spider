import { findById, classHelper as $class, delay, listenEvent } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'

const CALL_TO_TAP_CLASSNAME = 'heartbeat'

function initCallToTap () {
  const spider = findById('spider-wrapper')
  $class.add(spider, CALL_TO_TAP_CLASSNAME)

  listenEvent(EVENTS.FIRST_CLICK, () => {
    $class.remove(spider, CALL_TO_TAP_CLASSNAME)
  })
}

export { initCallToTap }
