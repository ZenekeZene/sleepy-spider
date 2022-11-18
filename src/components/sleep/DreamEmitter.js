const MIN_MAX_LIFE_TIME_IN_MS = 3000

class DreamEmitter {
  constructor ({ canvasWidth: width, canvasHeight: height }) {
    this.maxLifeTime = Math.min(MIN_MAX_LIFE_TIME_IN_MS, (height / (1.5 * 60) * 1000))
    this.x = width / 2
    this.y = height - 10

    this.size = 1
    this.startSize = 32
    this.endSize = 40

    this.angle = Math.random() * 359

    this.startLife = new Date().getTime()
    this.lifeTime = 0

    this.velY = -1 - (Math.random() * 0.5)
    this.velX = Math.floor(Math.random() * (-6) + 3) / 10

    return this
  }

  update () {
    this.lifeTime = new Date().getTime() - this.startLife
    this.angle += 0.2

    const lifePerc = ((this.lifeTime / this.maxLifeTime) * 100)

    this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1)

    this.alpha = 1 - (lifePerc * .01)
    this.alpha = Math.max(this.alpha, 0)

    this.x += this.velX
    this.y += this.velY
  }
}

export {
  DreamEmitter,
}
