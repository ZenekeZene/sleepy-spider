import load from 'load-asset'
import Spritesheet from '../../lib/spritesheet/spritesheet'
import Eye from './eye'

const createEyes = async (props) => {
  const { context, canvas, params } = props
  const image = await load('../sprites/eye/eye-spritesheet.png')
  const sprite = new Spritesheet(10, 1, image)

  const w = sprite.frameWidth
  const h = sprite.frameHeight
  const gap = 0
  const ix = 0
  const iy = 0
  let x, y
  let eyes = []

  context.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < params.columns; i++) {
    for (let j = 0; j < params.rows; j++) {
      x = ix + (w + gap) * i
      y = iy + (h + gap) * j

      const totalWidth = params.columns * w
      const totalHeight = params.rows * h
      const xx = x + (w * 0.5) + ((canvas.width - totalWidth) / 2)
      const yy = y + (h * 0.5) + ((canvas.height - totalHeight) / 2)

      const initialFrame = sprite.length
      const initialPosition = { x: xx, y: yy }
      const eye = new Eye({ sprite, ...props, ...initialPosition })
      eye.stop(initialFrame)
      eyes.push(eye)
    }
  }
  return eyes
}

export default createEyes
