import { findById, listenEvent } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { DreamEmitter } from './DreamEmitter'

const CANVAS_SIZE = 300
const FONT = {
  FAMILY: '30px Secular One',
  COLOR: 'black',
  SYMBOL: 'Z',
}

const MIN_SPAWN_TIME = 440

let canvas
let context
let isEnabled = true

function drawDreamSymbol ({ part }) {
  part.update()
  const { x, y, size, alpha } = part
  context.save()
  const offsetX = -size / 2
  const offsetY = offsetX

  context.translate(x - offsetX, y - offsetY)
  context.globalAlpha  = alpha
  context.font = FONT.FAMILY
  context.fillStyle = FONT.COLOR
  context.fillText(FONT.SYMBOL, 0, 0)
  context.restore()
}

function drawDream () {
  isEnabled = true

  canvas.width = CANVAS_SIZE
  canvas.height = CANVAS_SIZE
  const { width, height } = canvas

  const parts = []
  let lastTime = new Date().getTime()

  function spawn () {
    const time = new Date().getTime()
    if (time <= lastTime + MIN_SPAWN_TIME) return
    lastTime = new Date().getTime()
    parts.push(new DreamEmitter({ canvasWidth: width, canvasHeight: height }))
  }

  function render () {
    context.clearRect(0, 0, width, height)

    let length = parts.length
    while (length--) {
      const part = parts[length]
      if (part.y < 0 || part.lifeTime > part.maxLifeTime) {
        parts.splice(length, 1)
      } else {
        drawDreamSymbol({ part })
      }
    }
    isEnabled && spawn()
    requestAnimationFrame(render)
  }
  render()
}

function stopDream () {
  isEnabled = false
  context.clearRect(0, 0, canvas.width, canvas.height)
}

function initDreamController () {
  canvas = findById("sleep")
  if (!canvas) throw new Error('Dream canvas is not found.')
  context = canvas.getContext("2d")

  listenEvent(EVENTS.END_TIMER, () => {
    stopDream()
  })
}

export {
  initDreamController,
  drawDream,
  stopDream
}
