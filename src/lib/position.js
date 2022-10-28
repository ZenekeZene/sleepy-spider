class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

class Position extends Vector {
  constructor(x, y, sprite) {
    super(x, y)
    this.middleWidth = sprite.frameWidth * 0.5
    this.middleHeight = sprite.frameHeight * 0.5
    this.x = x - this.middleWidth
    this.y = y - this.middleHeight
  }

  get position () {
    return { x: this.positionX, y: this.positionY }
  }

  set position ({ x, y }) {
    this.x = x - this.middleWidth
    this.y = y - this.middleHeight
    return this
  }
}

export default Position
