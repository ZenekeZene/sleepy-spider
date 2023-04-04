const INTERVAL_PER_SECONDS_IN_MS = 1000
const INTERVAL_PER_CALCULATION_IN_MS = 100

let numClicks = 0
let secondsSpent = 0
let lastCPS = 0

let secondsIntervalID = null

function incrementClick() {
  numClicks += 1
}

function resetClicks() {
  secondsSpent = 0
  numClicks = 0
}

function checkLastClicks(minToAction) {
  if (lastCPS > minToAction) { return true }
  return false
}

function startCheckLastClicksInterval(minToAction, onAction) {
  secondsIntervalID = setInterval(() => {
    if (checkLastClicks(minToAction)) {
      onAction(lastCPS)
      resetClicks()
    }
    secondsSpent += 1
  }, INTERVAL_PER_SECONDS_IN_MS)
}

function getClicksPerSecond() {
  const cps = Math.floor(numClicks / secondsSpent)
  if (isNaN(cps) || cps === Infinity)
    return 0
  return cps
}

function updateClicksPerSecond() {
  lastCPS = getClicksPerSecond()
}

function createClicksPerSecCounter(props) {
  const { onAction = () => null, minToAction = 1 } = props
  startCheckLastClicksInterval(minToAction, onAction)
  setInterval(updateClicksPerSecond, INTERVAL_PER_CALCULATION_IN_MS)
  return incrementClick
}

export {
  createClicksPerSecCounter
}
