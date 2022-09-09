import { degToRad } from '../../../lib/degree'
import Eye from '../eye'

const createCentralEye = (props, cx, cy) => {
  const offset = 80
  const { sprite } = props
  const initialFrame = sprite.length
  const bigScale = 2.7
  const x = cx - (sprite.frameWidth * bigScale) / 2 + offset
  const y = cy - (sprite.frameHeight * bigScale) / 2 + offset
  const initialPosition = { x, y }
  const bigEye = new Eye({ sprite, ...props, ...initialPosition, scale: bigScale, pupilScale: 2, isBigEye: true })
  bigEye.stop(initialFrame)
  return bigEye
}

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
  const bigEye = createCentralEye(props, cx, cy)
  eyes.push(bigEye)

  return eyes
}

export default createEyesInCircleShape
