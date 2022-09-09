const url = new URL('../../sounds/bubble-sound2.mp3', import.meta.url).href
const url2 = new URL('../../sounds/bubble-sound3.mp3', import.meta.url).href

const audio = new Audio(url)
const audio2 = new Audio(url2)

const rangeOfCollisionInPixels = [0, 50, 100, 150, 200, 300, 400, 500]

const playSound = (eye) => {
  const audioTarget = eye.isBigEye ? audio : audio2
  audioTarget.play()
}

const handleOpenAndCloseEyes = (eyes, x, y, { sound }) => {
  eyes.forEach(eye => {
    const isAround = eye.isAroundToTheMouse(x, y)
    if (isAround) {
      if (!eye.isIddle()) return
      sound && !eye.isOpen() && playSound(eye)
      eye.open()
    } else {
      eye.close()
    }
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
      eye.openSemi({ limit })
    }
    if (touched) return
    eye.close()
  })
}

const eyeWithMouse = ({ eyes, canvas, params }) => {
  const rect = canvas.getBoundingClientRect()
  const scale = canvas.width / rect.width

  canvas.onmousemove = (event) => {
    const realX = event.clientX - rect.left
    const realY = event.clientY - rect.top
    const x = realX * scale
    const y = realY * scale
    params.wave ?
      handleOpenAndCloseEyesSmoothly(eyes, x, y, params) :
      handleOpenAndCloseEyes(eyes, x, y, params)
  }

  canvas.onmouseleave = () => {
    eyes.forEach(eye => { eye.close() })
  }
}

export default eyeWithMouse
