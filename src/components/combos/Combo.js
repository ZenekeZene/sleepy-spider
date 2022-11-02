import { createCombo } from './comboFactory'

const INTERVAL_PER_SECONDS_IN_MS = 1000
const INTERVAL_PER_CALCULATION_IN_MS = 100
const MINIMUM_COMBO = 1
export const MINIMUN_MEGACOMBO = 7

let numClicks = 0
let previousNumClicks = 0
let secondsSpent = 0
let lastCPS = 0

function incrementClick () {
  numClicks += 1
  previousNumClicks = numClicks
}

function ClicksPerSecCounter (onCombo) {
  this.secondsIntervalID = setInterval(function () {
    if (previousNumClicks === numClicks) {
      if (lastCPS > MINIMUM_COMBO) {
        onCombo(lastCPS)
      }
      secondsSpent = 1
      numClicks = 0
      previousNumClicks = 0
      return
    }
    secondsSpent += 1
  }, INTERVAL_PER_SECONDS_IN_MS)

  this.clicksPerSecond = function () {
    return Math.floor(numClicks / secondsSpent)
  }

  this.incrementClick = incrementClick
}

function createClicksPerSecCounter (onCombo) {
  const cpsCounter = new ClicksPerSecCounter(onCombo)

  setInterval(() => {
    const clicksPerSecond = cpsCounter.clicksPerSecond()
    lastCPS = clicksPerSecond
  }, INTERVAL_PER_CALCULATION_IN_MS)

  return { incrementClick }
}

function calculateMegaCombo (combo) {
  let scaledCombo = combo
  if (combo >= MINIMUN_MEGACOMBO) {
    scaledCombo *= (100 / combo)
  }
  return scaledCombo
}

function launchComboSystem ({ onCombo }) {
  const { incrementClick } = createClicksPerSecCounter((combo) => {
    createCombo(combo)
    const scaledCombo = calculateMegaCombo(combo)
    onCombo(scaledCombo)
  })
  return {
    incrementClick,
  }
}

export {
  launchComboSystem,
}
