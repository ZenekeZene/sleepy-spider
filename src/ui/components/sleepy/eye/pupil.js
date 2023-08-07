import { findById, createElement } from 'sleepy-spider-lib'

const size = 80

function createCanvas () {
  const target = findById("new-pupils")
  const wrapper = createElement({ tag: "div", classNames: ["pupil-wrapper"], target })
  const canvas = createElement({ tag: "canvas", target: wrapper })
  canvas.width = 80
  canvas.height = 80
  const context = canvas.getContext("2d")
  const rect = canvas.getBoundingClientRect()
  return { context, rect, canvas }
}

function drawPupil () {
  const { context, rect, canvas } = createCanvas()
  document.addEventListener("mousemove", onMouseMove)

  function onMouseMove(event) {
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    context.clearRect(0, 0, size * 2, size)
    drawEye(x, y, size / 2, size / 2)
  }

  function drawEye(x, y, cx, cy) {
    const dx = x - cx
    const dy = y - cy
    const angle = Math.atan2(dy, dx)
    context.save()
    context.translate(cx, cy)
    context.rotate(angle)
    context.beginPath()
    context.fillStyle = 'white'
    context.arc(0, 0, size / 2, 0, Math.PI * 2)
    context.fill()
    // context.stroke()
    context.beginPath()
    context.arc(size * 0.3, 0, size * 0.15, 0, Math.PI * 2)
    context.fillStyle = '#b95377'
    context.fill()
    context.restore()
  }

  return canvas
}

export { drawPupil }
