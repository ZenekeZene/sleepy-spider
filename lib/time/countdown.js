const countdownOptions = {
  duration: 1000,
  countdownToZero: true,
  interval: 1000,
}

function startCountdown(props = countdownOptions) {
  const { duration, countdownToZero, interval, callback } = props
  if (!callback) {
    throw new Error('[interval error]: callback is required')
  }
  let startTime = null
  let elapsedTime = 0
  let lastSecond = null

  function loop(currentTime) {
    if (!startTime) {
      startTime = currentTime
      lastSecond = Math.ceil(duration / interval)
      callback && callback(lastSecond)
    }

    elapsedTime = currentTime - startTime
    const currentSecond = countdownToZero ?
      Math.ceil(duration / interval) - Math.floor(elapsedTime / interval) :
      Math.max(Math.ceil(duration / interval) - Math.floor(elapsedTime / interval), 1)

    if (currentSecond !== lastSecond && currentSecond >= 0) {
      lastSecond = currentSecond
      callback && callback(lastSecond)
    }

    if (elapsedTime < duration && (countdownToZero ? currentSecond >= 0 : currentSecond > 1)) {
      requestAnimationFrame(loop)
    }
  }

  requestAnimationFrame(loop)
}

export {
  startCountdown,
}
