import Eye from '../eye'

const createEyesInSquareShape = (props) => {
  const { context, canvas, params, sprite } = props
  const w = sprite.frameWidth
  const h = sprite.frameHeight
  const gap = -70
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
      const eye = new Eye({ sprite, ...props, ...initialPosition, scale: 0.6 })
      eye.stop(initialFrame)
      eyes.push(eye)
    }
  }
  return eyes
}

export default createEyesInSquareShape
