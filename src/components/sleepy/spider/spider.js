import canvasTintImage from "canvas-tint-image"
import getCanvasContext from "get-canvas-context"
import { findById, getBody, Frame, Position, spriteStates } from 'sleepy-spider-lib'
import { LIMIT_TO_SHOW_QUESTION } from '@/domain/question/question.constants'
import './spider.css'

const INTERVAL_ANIMATION_IN_MS = 250
const SURPRISE_CLASSNAME = 'surprise'
export const INTERVAL_TO_CLOSE_EYES_IN_MS = 2000

class Spider {
  constructor ({ sprite, context, canvas, frame, x, y }) {
    this.position = new Position(x, y, sprite)
    this.context = context
    this.canvas = canvas
    this.frame = new Frame(this, frame, sprite)
    this.sprite = sprite
    this.direction = 1
    this.state = spriteStates.IDDLE
    this.wrapper = findById('spider-wrapper')
    this.shakeWrapper = getBody()
    this.contextTint = getCanvasContext("2d", { width: sprite.width, height: sprite.height })
    this.hateLevel = 0
    this.opacityOffset = (LIMIT_TO_SHOW_QUESTION / 4)
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
    const opacity = this.hateLevel / LIMIT_TO_SHOW_QUESTION
    const tintedImage = canvasTintImage(image, 'red', opacity)
    this.context.drawImage(tintedImage, sx, sy, width, height, x, y, widthScaled, heightScaled)
  }

  doStep () {
    if (this.isPaused) return
    this.frame.value += this.direction
    if (!this.frame.isLimitPingPong({ direction: this.state })) return
    this.direction = this.state === spriteStates.FORWARD ? -1 : 1
    this.state = (this.state === spriteStates.FORWARD) ? spriteStates.BACKWARD : spriteStates.FORWARD
  }

  play () {
    this.state = spriteStates.FORWARD
    this.timer = setInterval(() => {
      this.doStep()
      const { column, row } = this.sprite.getSlide(this.frame.value)
      this.draw(column, row)
    }, INTERVAL_ANIMATION_IN_MS)
    return this
  }

  stopIddleAnimation () {
    this.frame.drawFrame(this.frame.value)
    this.isPaused = true
    return this
  }

  resumeIddleAnimation () {
    this.isPaused = false
  }

  closeEyes (eyes) {
    eyes.forEach((eye) => eye.close())
  }

  openEyes (eyes) {
    eyes.forEach((eye) => eye.open())
  }

  searchOpenEyes (eyes) {
    let areAnyEyesOpen = false
    for (const eye of eyes) {
      if (!eye.isOpen()) continue
      areAnyEyesOpen = true
      break
    }
    return areAnyEyesOpen
  }

  addSurpriseClassname () {
    if (this.wrapper.classList.contains(SURPRISE_CLASSNAME)) return
    this.wrapper.classList.add(SURPRISE_CLASSNAME)
  }

  removeSurpriseClassname () {
    this.wrapper.classList.remove(SURPRISE_CLASSNAME)
  }

  toBeSurprised (eyes) {
    this.addSurpriseClassname()
    this.openEyes(eyes)
    this.stopIddleAnimation()
  }

  incrementHateLevel (value = 1) {
    if (this.hateLevel >= (LIMIT_TO_SHOW_QUESTION - this.opacityOffset)) return
    if (this.hateLevel > (LIMIT_TO_SHOW_QUESTION / 1.5)) {
      this.shakeWrapper.classList.add('headShakeHard')
    }
    this.hateLevel += value

  }

  resetHateLevel () {
    this.hateLevel = 0
    this.shakeWrapper.classList.remove('headShake', 'headShakeHard')
  }

  relax (eyes) {
    this.removeSurpriseClassname()
    this.resumeIddleAnimation()

    setTimeout(() => {
      this.closeEyes(eyes)
    }, INTERVAL_TO_CLOSE_EYES_IN_MS)
  }
}

export default Spider
