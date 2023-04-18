import { EVENTS } from '@/adapter'
import { dispatchEvent, listenEvent } from "sleepy-spider-lib"

let isFirstClick = false

function listenFirstClick() {
  listenEvent('click', async () => {
    if (isFirstClick) return
    isFirstClick = true
    dispatchEvent(EVENTS.FIRST_CLICK)
  })
}

export {
  listenFirstClick,
}
