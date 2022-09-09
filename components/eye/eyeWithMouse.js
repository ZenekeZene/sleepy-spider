const rangeOfCollisionInPixels = [0, 50, 100, 150, 200, 300, 400, 500]

const handleOpenAndCloseEyes = (eyes, x, y) => {
  eyes.forEach(eye => {
    const isAround = eye.isAroundToTheMouse(x, y)
    isAround ? eye.open() : eye.close()
  })
}

const handleOpenAndCloseEyesSmoothly = (eyes, x, y) => {
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
      handleOpenAndCloseEyesSmoothly(eyes, x, y) :
      handleOpenAndCloseEyes(eyes, x, y)
  }

  canvas.onmouseleave = () => {
    eyes.forEach(eye => { eye.close() })
  }
}

export default eyeWithMouse
