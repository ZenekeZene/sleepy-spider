import { spriteStates } from './spritesheet'

class Frame {
  constructor (target, frame, sprite) {
    this.target = target
    this.drawFrame(frame)
    this.width = sprite.frameWidth
    this.height = sprite.frameHeight
    this.sprite = sprite
  }

  get value () {
    return this.currentFrame
  }

  set value (value) {
    if (value > this.length) {
      throw new Error('frame can not be > of size of sprite')
    }
    this.drawFrame(value)
  }

  drawFrame (frame) {
    this.currentFrame = frame
    setTimeout(() => {
      this.target.draw(this.currentFrame, 0)
    }, 0)
  }

  isLimit ({ isReverse, limit } = { isReverse: false }) {
    if (limit) {
      if (isReverse) {
        return this.value <= limit
      } else {
        return this.value > limit
      }
    }
    return isReverse ? this.value <= 1 : this.value > this.sprite.length
  }

  isLimitPingPong ({ direction }) {
    if (direction === spriteStates.FORWARD) {
      return this.value >= this.sprite.length
    } else {
      return this.value < 1
    }
  }
}

export {
  Frame
}
