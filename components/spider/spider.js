import Frame from '../../lib/frame'
import Position from '../../lib/position'
import STATES from '../../lib/spritesheet/states'

const intervalInMS = 250

class Spider {
  constructor ({ sprite, context, canvas, frame, x, y }) {
    this.position = new Position(x, y, sprite)
    this.context = context
    this.canvas = canvas
    this.frame = new Frame(this, frame, sprite)
    this.sprite = sprite
    this.direction = 1
    this.state = STATES.IDDLE
  }

  draw (column, row) {
    const { x, y } = this.position
    const { width, height } = this.frame
    this.context.clearRect(x, y, this.canvas.width, this.canvas.height)

    const { image } = this.sprite
    const sx = column * width
    const sy = row * height
    const widthScaled = width * 2
    const heightScaled = height * 2
    this.context.drawImage(image, sx, sy, width, height, x, y, widthScaled, heightScaled)
  }

  doStep () {
    if (this.isPaused) return
    this.frame.value += this.direction
    if (!this.frame.isLimitPingPong({ direction: this.state })) return
    this.direction = this.state === STATES.FORWARD ? -1 : 1
    this.state = (this.state === STATES.FORWARD) ? STATES.BACKWARD : STATES.FORWARD
  }

  play () {
    this.state = STATES.FORWARD
    this.timer = setInterval(() => {
      this.doStep()
      const { column, row } = this.sprite.getSlide(this.frame.value)
      this.draw(column, row)
    }, intervalInMS)
    return this
  }

  stop () {
    this.frame.drawFrame(this.frame.value)
    // this.state = STATES.IDDLE
    this.isPaused = true
    return this
  }

  resume () {
    this.isPaused = false
  }
}

export default Spider
