import { classHelper as $class, startCountdown } from 'sleepy-spider-lib'
import { findById, listenEvent, dispatchEvent } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import * as constants from '@/domain/clock'
import './clock.css'

const ALERT_CLASS = '--alert'

let countdown = null

function startClock() {
  const clock = findById('clock')
  const face = findById('lazy')
  face.textContent = constants.MAX_SECONDS

  const onInterval = (time) => {
    if (time < constants.ALERT_CLOCK_SECONDS) {
      $class.add(clock, ALERT_CLASS)
    }

    if (time > 0) {
      face.textContent = time
    } else {
      face.textContent = 0
      dispatchEvent(EVENTS.END_TIMER)
      $class.remove(clock, ALERT_CLASS)
    }
  }

  const config = {
    duration: constants.MAX_SECONDS_IN_MS,
    callback: onInterval,
    countdownToZero: true,
    interval: constants.SECOND_IN_MS,
  }

  countdown = startCountdown(config)
}

function pauseClock () {
  if (!countdown) throw new Error('Countdown not initialized')
  countdown.pause()
}

function prepareClock () {
  const face = findById('lazy')
  face.textContent = constants.MAX_SECONDS

  listenEvent(EVENTS.INACTIVE_TAB, () => {
    pauseClock()
  })

  listenEvent(EVENTS.FIRST_CLICK, () => {
    startClock()
  })
}

export {
  prepareClock,
}
