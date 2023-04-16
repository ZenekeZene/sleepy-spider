import { findById, listenEvent, dispatchEvent } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import * as constants from '@/domain/clock'
import './clock.css'

const ALERT_CLASS = '--alert'
const clock = findById('clock')
const face = findById('lazy')
face.textContent = constants.MAX_SECONDS

function startClock() {
  const startTime = new Date().getTime()
  const intervalId = setInterval(() => {
    const currentTime = new Date().getTime()
    const timeElapsed = currentTime - startTime
    const timeRemaining = constants.MAX_SECONDS_IN_MS - timeElapsed
    const secondsRemaining = Math.floor(timeRemaining / constants.SECOND_IN_MS)

    if (secondsRemaining < constants.ALERT_CLOCK_SECONDS) {
      clock.classList.add(ALERT_CLASS)
    }

    if (secondsRemaining > 0) {
      face.innerText = secondsRemaining
    } else {
      clearInterval(intervalId)
      dispatchEvent(EVENTS.END_TIMER)
      clock.classList.remove(ALERT_CLASS)
    }
  }, constants.SECOND_IN_MS)
}

function prepareClock () {
  listenEvent(EVENTS.FIRST_CLICK, () => {
    startClock()
  })
}

export {
  prepareClock,
}
