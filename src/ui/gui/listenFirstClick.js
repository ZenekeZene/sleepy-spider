import { dispatchEvent, listenEvent } from "sleepy-spider-lib"

const EVENT_NAME = 'firstClick'

let isFirstClick = false

function listenFirstClick() {
  listenEvent('click', async () => {
    if (isFirstClick) return
    isFirstClick = true
    dispatchEvent(EVENT_NAME)
  })
}

export {
  listenFirstClick,
}
