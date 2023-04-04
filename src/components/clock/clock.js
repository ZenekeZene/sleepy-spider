import './clock.css'

const SECOND_IN_MS = 1000
const MAX_SECONDS_IN_MS = 10 * SECOND_IN_MS

const face = document.getElementById('lazy')
face.textContent = '60'

function startClock() {
  const startTime = new Date().getTime()
  const intervalId = setInterval(() => {
    const currentTime = new Date().getTime()
    const timeElapsed = currentTime - startTime
    const timeRemaining = MAX_SECONDS_IN_MS - timeElapsed
    const secondsRemaining = Math.floor(timeRemaining / SECOND_IN_MS)
    if (timeRemaining > 0) {
      face.innerText = secondsRemaining
    } else {
      clearInterval(intervalId)
    }
  }, SECOND_IN_MS)
}

export {
  startClock
}
