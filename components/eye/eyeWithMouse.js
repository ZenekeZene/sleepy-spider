const handleOpenAndCloseEyes = (eyes, x, y) => {
  eyes.forEach(eye => {
    const isAround = eye.isAroundToTheMouse(x, y)
    if (isAround) {
      eye.open()
    } else {
      //if (!eye.isIddle()) return
      eye.close()
    }
  })
}

const handleOpenAndCloseEyesSmoothly = (eyes, x, y) => {
  const rangeOffset = [0, 50, 100, 150, 200, 300, 400, 500]

  eyes.forEach(eye => {
    let limit = 0
    let touch = false
    for (const extraOffset of rangeOffset) {
      const isAround = eye.isAroundToTheMouse(x, y, extraOffset)
      if (!isAround) continue
      touch = true
      limit = Math.floor(extraOffset / 60)
      eye.openSemi({ limit })
    }
    if (!touch) {
      eye.close()
    }
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

    if (params.wave) {
      handleOpenAndCloseEyesSmoothly(eyes, x, y)
    } else {
      handleOpenAndCloseEyes(eyes, x, y)
    }
  }

  canvas.onmouseleave = () => {
    eyes.forEach(eye => {
      eye.close()
    })
  }
}

export default eyeWithMouse
