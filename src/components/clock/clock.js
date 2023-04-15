import { findById } from '@/lib/dom/dom'
import { dispatchEvent } from '@/lib/dom/event'
import './clock.css'

const END_TIMER_EVENT = 'endTimer'
const SECOND_IN_MS = 1000
const MAX_SECONDS = 10
const MAX_SECONDS_IN_MS = MAX_SECONDS * SECOND_IN_MS + (SECOND_IN_MS)

const clock = findById('clock')
const face = findById('lazy')
face.textContent = MAX_SECONDS

function startClock() {
  const startTime = new Date().getTime()
  const intervalId = setInterval(() => {
    const currentTime = new Date().getTime()
    const timeElapsed = currentTime - startTime
    const timeRemaining = MAX_SECONDS_IN_MS - timeElapsed
    const secondsRemaining = Math.floor(timeRemaining / SECOND_IN_MS)

    if (secondsRemaining < 10) {
      clock.classList.add('--alert')
    }

    if (timeRemaining > 0) {
      face.innerText = secondsRemaining
    } else {
      clearInterval(intervalId)
      dispatchEvent(END_TIMER_EVENT)
    }
  }, SECOND_IN_MS)
}

export {
  startClock
}
