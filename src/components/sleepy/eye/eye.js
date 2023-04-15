import { range, spriteStates, Frame, Position } from '@/lib'
import Pupil from '../pupil/pupil'
import settings from './eyeSettings'

const FRAME_WITHOUT_PUPIL_INDEX = 8

class Eye {
  constructor ({ sprite, context, x, y, scale, pupilScale, isBigEye, ...rest }) {
    this.position = new Position(x, y, sprite)
    const props = { ...this.position, ...rest, context }
    this.sprite = sprite
    this.context = context
    this.frame = new Frame(this, 0, this.sprite)
    this.params = props.params
    this.isBigEye = isBigEye || false

    this.state = spriteStates.IDDLE
    this.scale = scale || range(settings.scale.min, settings.scale.max)
    this.pupil = new Pupil(props, this.frame, this.scale, pupilScale)
  }

  isAroundToTheMouse (mouseX, mouseY, extraOffset = 0) {
    const realWidth = this.frame.width * this.scale
    this.offsetBoundaries = realWidth * (this.params.sizeColision + 0.5)
    const { x, y } = this.position
    const { width, height } = this.frame
    const sideLeftX = x - (width / 2) - this.offsetBoundaries
    const sideTopY = y - (height / 2) - this.offsetBoundaries

    const sideRightX = x + width + this.offsetBoundaries + extraOffset
    const sideBottomY = y + height + this.offsetBoundaries + extraOffset

    const isInHorizontal = (mouseX >= sideLeftX && mouseX <= sideRightX)
    const isInVertical = (mouseY >= sideTopY && mouseY <= sideBottomY)

    return isInHorizontal && isInVertical
  }

  draw (column, row) {
    const { x, y } = this.position
    const { width, height } = this.frame

    this.context.clearRect(x, y, width * this.scale, height * this.scale)

    const { image } = this.sprite
    const sx = column * width
    const sy = row * height
    const widthScaled = width * this.scale
    const heightScaled = height * this.scale
    this.context.drawImage(image, sx, sy, width, height, x, y, widthScaled, heightScaled)
    this.pupil && this.pupil.launchDrawPupil()
  }

  doStep ({ isReverse, limit }) {
    const direction = isReverse ? -1 : 1
    this.frame.value += direction
    if (!this.frame.isLimit({ isReverse, limit })) return
    const frame = this.state === spriteStates.BACKWARD ? this.sprite.length : (limit || 0)
    this.stop(frame)
  }

  isIddle () {
    return this.state === spriteStates.IDDLE
  }

  play ({ isReverse, limit }) {
    if (!this.isIddle()) return
    this.state = isReverse ? spriteStates.FORWARD : spriteStates.BACKWARD
    this.timer = setInterval(() => {
      this.doStep({ isReverse, limit })
      const { column, row } = this.sprite.getSlide(this.frame.value)
      this.draw(column, row)
    }, settings.intervalInMS)
    return this
  }

  stop (frame) {
    this.frame.drawFrame(frame)
    this.state = spriteStates.IDDLE
    clearInterval(this.timer)
    return this
  }

  open () {
    this.play({ isReverse: true })
    return this
  }

  openSemi ({ limit }) {
    this.play({ isReverse: true, limit })
    return this
  }

  close () {
    this.play({ isReverse: false })
    return this
  }

  isOpen () {
    return this.frame.value < FRAME_WITHOUT_PUPIL_INDEX
  }
}

export default Eye

// https://codepen.io/osublake/pen/xWKJxY/dc58db767c4871f973290ea56c799c79?editors=0010
