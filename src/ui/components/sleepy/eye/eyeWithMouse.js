import { INTERVAL_TO_CLOSE_EYES_IN_MS } from '../spider/spider'
import { playSound } from './eyeSound'

const rangeOfCollisionInPixels = [0, 50, 100, 150, 200, 300, 400, 500]

const automaticallyCloseEye = (eye) => {
  setTimeout(() => {
    eye.close()
  }, INTERVAL_TO_CLOSE_EYES_IN_MS)
}

const handleOpenAndCloseEyes = (eyes, x, y, { sound }) => {
  eyes.forEach(eye => {
    const isAround = eye.isAroundToTheMouse(x, y)
    if (!isAround) {
      eye.close()
      return
    }
    sound && !eye.isOpen() && playSound(eye)
    eye.open()
    automaticallyCloseEye(eye)
  })
}

const handleOpenAndCloseEyesSmoothly = (eyes, x, y, { sound }) => {
  const rangeOffset = rangeOfCollisionInPixels

  eyes.forEach(eye => {
    let limit = 0
    let touched = false

    for (const extraOffset of rangeOffset) {
      const isAround = eye.isAroundToTheMouse(x, y, extraOffset)
      if (!isAround) continue
      touched = true
      limit = Math.floor(extraOffset / 60)
      sound && !eye.isOpen() && playSound(eye)
      eye.openSemi({ limit })
    }
    if (touched) return
    automaticallyCloseEye(eye)
  })
}

const handleInteractionWithCanvas = (eyes, x, y, params) => {
  const handler = params.wave ? handleOpenAndCloseEyesSmoothly : handleOpenAndCloseEyes
  handler(eyes, x, y, params)
}

const calculateCoordinates = (event, rect, scale) => {
  const realX = event.clientX - rect.left
  const realY = event.clientY - rect.top
  const x = realX * scale
  const y = realY * scale
  return { x, y }
}

const eyeWithMouse = ({ eyes, canvas, params }) => {
  const rect = canvas.getBoundingClientRect()
  const scale = canvas.width / rect.width

  canvas.onmousemove = (event) => {
    const { x, y } = calculateCoordinates(event, rect, scale)
    handleInteractionWithCanvas(eyes, x, y, params)
  }

  const onClick = (event) => {
    const { x, y } = calculateCoordinates(event, rect, scale)
    handleInteractionWithCanvas(eyes, x, y, params)
  }

  canvas.addEventListener('click', onClick)

  canvas.onmouseleave = () => {
    eyes.forEach(eye => { eye.close() })
  }
}

export default eyeWithMouse
export { calculateCoordinates }
