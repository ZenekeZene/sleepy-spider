import Frame from '../../lib/frame.js'
import Position from '../../lib/position.js'

class Spider {
  constructor ({ sprite, context, frame, x, y }) {
    this.position = new Position(x, y, sprite)
    this.context = context
    this.frame = new Frame(this, frame, sprite)
    this.sprite = sprite
  }

  draw (column, row) {
    const { x, y } = this.position
    const { width, height } = this.frame
    this.context.clearRect(x, y, width, height)

    const { image } = this.sprite
    const sx = column * width
    const sy = row * height
    const widthScaled = width * 2
    const heightScaled = height * 2
    this.context.drawImage(image, sx, sy, width, height, x, y, widthScaled, heightScaled)
  }
}

export default Spider
