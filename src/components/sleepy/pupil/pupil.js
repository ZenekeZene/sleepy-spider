import { listenEvent } from '@/lib'

const FRAME_LIMIT = 4

class Pupil {
  constructor ({ x, y, canvas, params, context }, frame, scale, pupilScale) {
    this.context = context
    this.radius = frame.width / 3
    this.pupilScale = pupilScale || 1
    this.canvas = canvas
    this.frame = frame
    this.setCoordinates(x, y, frame, scale)
    this.calculateCanvasOffset(params)
    listenEvent("mousemove", (event) => { this.onMouseMove(event) })
    this.params = params
    this.enabled = true
  }

  setCoordinates (x, y, frame, scale) {
    this.x = x + (frame.width * scale) / 2
    this.y = y + (frame.height * scale) / 2
    this.rect = this.canvas.getBoundingClientRect()
    this.mouseX = 0
    this.mouseY = 0
  }

  calculateCanvasOffset ({ columns, rows }) {
    const totalWidth = columns * this.frame.width
    const totalHeight = rows * this.frame.height
    this.offsetX = (this.canvas.width - totalWidth) / 4
    this.offsetY = (this.canvas.height - totalHeight) / 4
  }

  launchDrawPupil () {
    if (!this.enabled) return
    const event = {
      clientX: this.mouseX,
      clientY: this.mouseY
    }
    this.onMouseMove(event)
  }

  onMouseMove (event) {
    if (!this.enabled) return
    this.context.fillStyle = this.params.pupil.color
    if (this.frame.value > FRAME_LIMIT) return
    const x = event.clientX - this.rect.left - this.offsetX
    const y = event.clientY - this.rect.top  - this.offsetY
    this.draw(x, y, this.radius * 0.4, this.radius * 0.4)
    this.mouseX =  event.clientX
    this.mouseY = event.clientY
  }

  draw (x, y, cx, cy) {
    const dx = x - cx
    const dy = y - cy
    const angle = Math.atan2(dy, dx)

    this.context.save()
    this.context.translate(this.x, this.y)
    this.context.rotate(angle)
    this.renderPupil()
    this.context.restore()
  }

  renderPupil () {
    const pupilSize = this.params.pupil.size * this.pupilScale
    this.context.beginPath()
    this.context.arc(this.radius * 0.4, 0, this.radius * pupilSize, 0, Math.PI * 2)
    this.context.fill()
  }

  enable () {
    this.enabled = true
  }

  disable () {
    this.enabled = false
    // this.context.clearRect(this.x, this.y, this.frame.width, this.frame.height)
  }
}

export default Pupil
