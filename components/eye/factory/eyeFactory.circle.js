import { degToRad } from '../../../lib/degree'
import Eye from '../eye'

const createEyesInCircleShape = (props) => {
  const { context, canvas, params, sprite } = props
  const w = 400
  const cx = canvas.width * 0.5
  const cy = canvas.height * 0.5
  let x, y
  let eyes = []

  context.clearRect(0, 0, canvas.width, canvas.height)

  const num = params.totalEyesInCircle
  const radius = w
  const initialFrame = sprite.length

  for (let i = 0; i < num; i++) {
    const slice = degToRad(360 / num)
    const angle = slice * i

    x = cx + radius * Math.sin(angle)
    y = cy + radius * Math.cos(angle)

    context.save()
    context.translate(x, y)
    context.rotate(-angle)

    const initialPosition = { x, y }
    const eye = new Eye({ sprite, ...props, ...initialPosition, scale: 0.7 })
    eye.stop(initialFrame)
    eyes.push(eye)

    context.restore()
  }
  // A big eye:
  const bigScale = 2.7
  const bigX = cx - (sprite.frameWidth * bigScale) / 2 + 80
  const bigY = cy - (sprite.frameHeight * bigScale) / 2 + 80
  const initialPositionForBigEye = { x: bigX, y: bigY }
  const bigEye = new Eye({ sprite, ...props, ...initialPositionForBigEye, scale: bigScale })
  bigEye.stop(initialFrame)
  eyes.push(bigEye)

  return eyes
}

export default createEyesInCircleShape
