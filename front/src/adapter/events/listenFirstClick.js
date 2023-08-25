import { delay, findById } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { dispatchEvent } from "sleepy-spider-lib"

let isFirstClick = false

async function listenFirstClick() {
  const collider = findById('collider')

  await delay(1000)

  collider.addEventListener('click', async (event) => {
    if (isFirstClick) return
    isFirstClick = true
    dispatchEvent(EVENTS.FIRST_CLICK)
  })
}

export {
  listenFirstClick,
}
