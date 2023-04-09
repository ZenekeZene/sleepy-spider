import './clock.css'

const END_TIMER_EVENT = 'endTimer'
const SECOND_IN_MS = 1000
const MAX_SECONDS = 60
const MAX_SECONDS_IN_MS = MAX_SECONDS * SECOND_IN_MS + (SECOND_IN_MS)

const clock = document.getElementById('clock')
const face = document.getElementById('lazy')
face.textContent = MAX_SECONDS

function dispatchEndTimerEvent () {
  const event = new CustomEvent(END_TIMER_EVENT)
  document.dispatchEvent(event)
}

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
      dispatchEndTimerEvent()
    }
  }, SECOND_IN_MS)
}

export {
  startClock
}
