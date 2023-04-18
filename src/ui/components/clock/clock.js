import { startCountdown } from 'sleepy-spider-lib'
import { findById, listenEvent, dispatchEvent } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import * as constants from '@/domain/clock'
import './clock.css'

const ALERT_CLASS = '--alert'

function startClock() {
  const clock = findById('clock')
  const face = findById('lazy')
  face.textContent = constants.MAX_SECONDS

  const onInterval = (time) => {
    if (time < constants.ALERT_CLOCK_SECONDS) {
      clock.classList.add(ALERT_CLASS)
    }

    if (time > 0) {
      face.textContent = time
    } else {
      face.textContent = 0
      dispatchEvent(EVENTS.END_TIMER)
      clock.classList.remove(ALERT_CLASS)
    }
  }

  const config = {
    duration: constants.MAX_SECONDS_IN_MS,
    callback: onInterval,
    countdownToZero: true,
    interval: constants.SECOND_IN_MS,
  }

  startCountdown(config)
}

function prepareClock () {
  const face = findById('lazy')
  face.textContent = constants.MAX_SECONDS

  listenEvent(EVENTS.FIRST_CLICK, () => {
    startClock()
  })
}

export {
  prepareClock,
}
