let canvas
let context
let isEnabled = true

function startSleep () {
  isEnabled = true
  canvas = document.getElementById("sleep")
  context = canvas.getContext("2d")

  canvas.height = 300
  canvas.width = 300

  const parts = []
  const minSpawnTime = 440
  let lastTime = new Date().getTime()
  const maxLifeTime = Math.min(3000, (canvas.height / (1.5 * 60) * 1000))
  const emitterX = canvas.width / 2
  const emitterY = canvas.height - 10

  function spawn () {
    if (new Date().getTime() > lastTime + minSpawnTime) {
      lastTime = new Date().getTime()
      parts.push(new smoke(emitterX, emitterY))
    }
  }

  function render () {
    var len = parts.length
    context.clearRect(0, 0, canvas.width, canvas.height)

    while (len--) {
      if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
          parts.splice(len, 1)
      } else {
        parts[len].update()

        context.save()
        var offsetX = -parts[len].size/2,
            offsetY = -parts[len].size/2

        context.translate(parts[len].x-offsetX, parts[len].y-offsetY)
        context.globalAlpha  = parts[len].alpha
        context.font = "30px Secular One"
        context.fillStyle = "black"
        context.fillText('Z', 0, 0)

        context.restore()
      }
    }
    isEnabled && spawn()
    requestAnimationFrame(render)
  }

  function smoke(x, y) {
    this.x = x
    this.y = y

    this.size = 1
    this.startSize = 32
    this.endSize = 40

    this.angle = Math.random() * 359

    this.startLife = new Date().getTime()
    this.lifeTime = 0

    this.velY = -1 - (Math.random() * 0.5)
    this.velX = Math.floor(Math.random() * (-6) + 3) / 10
  }

  smoke.prototype.update = function () {
    this.lifeTime = new Date().getTime() - this.startLife
    this.angle += 0.2

    const lifePerc = ((this.lifeTime / maxLifeTime) * 100)

    this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1)

    this.alpha = 1 - (lifePerc * .01)
    this.alpha = Math.max(this.alpha, 0)

    this.x += this.velX
    this.y += this.velY
  }

  render()
}

function stopSleep () {
  isEnabled = false
  context.clearRect(0, 0, canvas.width, canvas.height)
}

export {
  startSleep,
  stopSleep
}
