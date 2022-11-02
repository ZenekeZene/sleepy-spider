import { calculateCoordinates } from '../eye/eyeWithMouse'
import { initSleep, drawDream, stopDream } from '../sleep/sleep'
import { launchComboSystem } from '../combos/Combo'
import { createCombo } from '../combos/comboFactory'

let dreamIsLaunched = false
let spiderIsClicked = false
let incrementClickForCombo
const CHECK_SLEEP_INTERVAL_IN_MS = 100

const handleDream = (eyes, spider) => {
  const areAnyEyesOpen = spider.searchOpenEyes(eyes)
  if (areAnyEyesOpen) {
    if (!dreamIsLaunched) return
    dreamIsLaunched = false
    stopDream()
    spider.resumeIddleAnimation()
    return
  }
  if (dreamIsLaunched) return
  dreamIsLaunched = true
  drawDream()
  spider.stopIddleAnimation()
}

const checkIsSleeping = (eyes, spider) => {
  setInterval(() => {
    handleDream(eyes, spider)
  }, CHECK_SLEEP_INTERVAL_IN_MS)
}

const handleSleep = (eyes, spider, onSleepInterrupted) => {
  spider.relax(eyes)
  incrementClickForCombo()
  if (spiderIsClicked) return
  spiderIsClicked = true
  onSleepInterrupted()
  createCombo(1)
  stopDream()
  spider.toBeSurprised(eyes)

  setTimeout(() => {
    spider.relax(eyes)
    spiderIsClicked = false
  }, 100)
}

const checkClickOnEyes = (eyesCanvas, eyes, spider, onSleepInterrupted) => {
  const rect = eyesCanvas.getBoundingClientRect()
  const scale = eyesCanvas.width / rect.width

  const handleClick = (event) => {
    event.preventDefault()
    let isThereAnEyeNearby = false
    const { x, y } = calculateCoordinates(event, rect, scale)
    for (const eye of eyes) {
      const isAround = eye.isAroundToTheMouse(x, y)
      if (!isAround) return
      isThereAnEyeNearby = isAround
      break
    }
    isThereAnEyeNearby && handleSleep(eyes, spider, onSleepInterrupted)
  }

  eyesCanvas.addEventListener('click', handleClick)
}

const checkClicksOnColliders = (eyes, spider, onSleepInterrupted) => {
  const handClickOnCollider = () => {
    handleSleep(eyes, spider, onSleepInterrupted)
  }
  const colliders = Array.from(document.getElementsByClassName('collider'))
  colliders.forEach((collider) => collider.addEventListener('click', handClickOnCollider))
}

const updateListenEyes = (eyesCanvas, eyes, spider, onSleepInterrupted) => {
  checkClickOnEyes(eyesCanvas, eyes, spider, onSleepInterrupted)
}

const listenTheSleepCycle = (eyesCanvas, eyes, spider, onSleepInterrupted) => {
  initSleep()
  checkIsSleeping(eyes, spider)
  checkClicksOnColliders(eyes, spider, onSleepInterrupted)
  checkClickOnEyes(eyesCanvas, eyes, spider, onSleepInterrupted)
  const { incrementClick } = launchComboSystem({ onCombo: onSleepInterrupted })
  incrementClickForCombo = incrementClick

}

export { listenTheSleepCycle, updateListenEyes }
