import createEyes from './components/eye/eyeFactory'
import createSpider from './components/spider/spiderFactory'
import eyeWithMouse from './components/eye/eyeWithMouse'
import drawGUI from './components/gui/drawGUI'

let eyes = []

const params = {
  columns: 5,
  rows: 5,
  pupil: {
    color: '#f05',
    size: 0.1,
  },
  wave: false,
  sizeColision: 1,
}

const onChange = async (context, canvas) => {
  eyes.forEach(eye => {
    eye.pupil.disable()
  })
  eyes = await createEyes({ context, canvas, params })
  eyeWithMouse({ eyes, context, canvas, sprite: eyes[0].sprite, params })
}

const sketchEyes = async () => {
  const canvas = document.getElementById('eyes')
  const context = canvas.getContext('2d')

  eyes = await createEyes({ context, canvas, params })
  eyeWithMouse({ eyes, context, canvas, sprite: eyes[0].sprite, params })
  drawGUI(params, () => { onChange(context, canvas) })
}

const sketchSpider = async () => {
  const canvas = document.getElementById('body')
  const context = canvas.getContext('2d')
  createSpider({ context, canvas, params })
}

const start = () => {
  sketchEyes()
  sketchSpider()
}

start()
