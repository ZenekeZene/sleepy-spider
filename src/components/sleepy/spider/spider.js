import Frame from '../../../lib/animation/frame'
import Position from '../../../lib/animation/position'
import STATES from '../../../lib/animation/spritesheet/states'

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
    this.state = STATES.IDDLE
    this.wrapper = document.getElementById('spider-wrapper')
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

  relax (eyes) {
    this.removeSurpriseClassname()
    this.resumeIddleAnimation()

    setTimeout(() => {
      this.closeEyes(eyes)
    }, INTERVAL_TO_CLOSE_EYES_IN_MS)
  }
}

export default Spider
