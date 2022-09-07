import { range } from '../../lib/random'
import STATES from '../../lib/spritesheet/states'
import Frame from '../../lib/frame'
import Position from '../../lib/position'
import Pupil from './pupil'
import settings from './eyeSettings'

class Eye  {
  constructor ({ sprite, context, x, y, ...rest }) {
    this.position = new Position(x, y, sprite)
    const props = { ...this.position, ...rest, context }
    this.sprite = sprite
    this.context = context
    this.frame = new Frame(this, 0, this.sprite)
    this.params = props.params

    this.state = STATES.IDDLE
    this.scale = range(settings.scale.min, settings.scale.max)
    this.pupil = new Pupil(props, this.frame, this.scale)
  }

  isIddle () {
    return this.state === STATES.IDDLE
  }

  isAroundToTheMouse (mouseX, mouseY, extraOffset = 0) {
    this.offsetBoundaries = (this.frame.width * this.params.sizeColision)
    const { x, y } = this.position
    const { width, height } = this.frame
    const sideLeftX = x - (width / 2) - this.offsetBoundaries - extraOffset
    const sideTopY = y - (height / 2) - this.offsetBoundaries - extraOffset

    const sideRightX = x + width + this.offsetBoundaries + extraOffset
    const sideBottomY = y + height + this.offsetBoundaries + extraOffset

    const isInHorizontal = (mouseX >= sideLeftX && mouseX <= sideRightX)
    const isInVertical = (mouseY >= sideTopY && mouseY <= sideBottomY)

    return isInHorizontal && isInVertical
  }

  draw (column, row) {
    const { x, y } = this.position
    const { width, height } = this.frame

    this.context.clearRect(x, y, width, height)

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
    const frame = this.state === STATES.BACKWARD ? this.sprite.length : (limit || 0)
    this.stop(frame)
  }

  play ({ isReverse, limit }) {
    if (!this.isIddle()) return
    this.state = isReverse ? STATES.FORWARD : STATES.BACKWARD
    this.timer = setInterval(() => {
      this.doStep({ isReverse, limit })
      const { column, row } = this.sprite.getSlide(this.frame.value)
      this.draw(column, row)
    }, settings.intervalInMS)
    return this
  }

  stop (frame) {
    this.frame.drawFrame(frame)
    this.state = STATES.IDDLE
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
}

export default Eye

// https://codepen.io/osublake/pen/xWKJxY/dc58db767c4871f973290ea56c799c79?editors=0010
