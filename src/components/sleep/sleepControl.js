import { calculateCoordinates } from '../sleepy/eye/eyeWithMouse'
import { launchComboSystem } from '../combos/Combo'
import { createCombo } from '../combos/factory/comboFactory'
import { initDreamController, drawDream, stopDream } from './dream/dreamController'

const CHECK_SLEEP_INTERVAL_IN_MS = 100
let dreamIsLaunched = false
let spiderIsClicked = false
let incrementClickForCombo

const handleDream = ({ ...spider }) => {
  const { eyes, body } = spider
  if (!eyes || !body) throw new Error('Error with the eyes or body of spider')
  const areAnyEyesOpen = body.searchOpenEyes(eyes)
  if (areAnyEyesOpen) {
    if (!dreamIsLaunched) return
    dreamIsLaunched = false
    stopDream()
    body.resumeIddleAnimation()
    return
  }
  if (dreamIsLaunched) return
  dreamIsLaunched = true
  drawDream()
  body.stopIddleAnimation()
}

const checkIsSleeping = ({ ...spider }) => {
  setInterval(() => {
    handleDream({ ...spider })
  }, CHECK_SLEEP_INTERVAL_IN_MS)
}

const handleSleep = ({ onInterruptedSleep, ...spider }) => {
  const { eyes, body } = spider
  if (!eyes || !body) throw new Error('Error with the eyes or body of spider')
  if (!onInterruptedSleep) console.info('sleep callback not recognized')

  body.relax(eyes)
  incrementClickForCombo()

  if (spiderIsClicked) return
  spiderIsClicked = true
  onInterruptedSleep?.()
  createCombo(1)
  stopDream()
  body.toBeSurprised(eyes)

  setTimeout(() => {
    body.relax(eyes)
    spiderIsClicked = false
  }, 100)
}

const checkClickOnEyes = ({ onInterruptedSleep, ...spider }) => {
  const { eyesCanvas, eyes } = spider
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
    isThereAnEyeNearby && handleSleep({ onInterruptedSleep, ...spider })
  }

  eyesCanvas.addEventListener('click', handleClick)
}

const checkClicksOnColliders = ({ onInterruptedSleep, ...spider }) => {
  const handClickOnCollider = () => {
    handleSleep({ onInterruptedSleep, ...spider })
  }
  const colliders = Array.from(document.getElementsByClassName('collider'))
  colliders.forEach((collider) => collider.addEventListener('click', handClickOnCollider))
}

const updateListenEyes = ({ onInterruptedSleep, ...spider }) => {
  checkClickOnEyes({ onInterruptedSleep, ...spider })
}

const listenTheSleepCycle = ({ onInterruptedSleep, ...spider }) => {
  const spiderWithInterruptedSleep = { onInterruptedSleep, ...spider }
  initDreamController()
  checkIsSleeping(spider)
  checkClicksOnColliders(spiderWithInterruptedSleep)
  checkClickOnEyes(spiderWithInterruptedSleep)
  const { incrementClick } = launchComboSystem({ onCombo: onInterruptedSleep })
  incrementClickForCombo = incrementClick
}

export { listenTheSleepCycle, updateListenEyes }
