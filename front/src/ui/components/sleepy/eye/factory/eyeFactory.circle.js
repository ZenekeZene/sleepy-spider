import { degToRad } from 'sleepy-spider-lib'
import Eye from '../eye'

const createCentralEye = (props, cx, cy) => {
  const offset = 80
  const { sprite } = props
  const initialFrame = sprite.length
  const bigScale = 1
  const x = cx - (sprite.frameWidth * bigScale) / 2 + offset / 2
  const y = cy - (sprite.frameHeight * bigScale) / 2 + offset / 2
  const initialPosition = { x, y }
  const bigEye = new Eye({
    sprite,
    ...props,
    ...initialPosition,
    scale: bigScale,
    pupilScale: 1,
    isBigEye: false
  })
  bigEye.stop(initialFrame)
  return bigEye
}

const createEyesInCircleShape = (props) => {
  const { context, canvas, params, sprite } = props
  const cx = canvas.width * 0.5
  const cy = canvas.height * 0.5
  let eyes = []

  context.clearRect(0, 0, canvas.width, canvas.height)

  const num = params.totalEyesInCircle
  const radius = 190
  const initialFrame = sprite.length

  for (let i = 0; i < num; i++) {
    const slice = degToRad(360 / num)
    const angle = slice * i + 180

    const x = cx + radius * Math.sin(angle)
    const y = cy + radius * Math.cos(angle)

    context.save()
    context.translate(x, y)
    context.rotate(-angle)

    const initialPosition = { x, y }
    const eye = new Eye({
      sprite,
      ...props,
      ...initialPosition,
      scale: 0.45
    })
    eye.stop(initialFrame)
    eyes.push(eye)

    context.restore()
  }
  const bigEye = createCentralEye(props, cx, cy)
  eyes.push(bigEye)

  return eyes
}

export default createEyesInCircleShape
