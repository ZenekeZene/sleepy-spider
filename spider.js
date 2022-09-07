import canvasSketch from 'canvas-sketch'
import createEyes from './components/eye/eyeFactory'
import eyeWithMouse from './components/eye/eyeWithMouse'
import drawGUI from './components/gui/drawGUI'

let eyes = []

const settings = {
  dimensions: [ 3000, 3000 ],
  animate: false,
}

let sketchController = null

const params = {
  columns: 10,
  rows: 10,
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

const sketch = async ({ context, canvas }) => {
  eyes = await createEyes({ context, canvas, params })
  eyeWithMouse({ eyes, context, canvas, sprite: eyes[0].sprite, params })
  drawGUI(params, () => { onChange(context, canvas) })

  return (async ({ context, width, height }) => {

  })
}

const start = async () => {
  sketchController = await canvasSketch(sketch, settings)
}

start()
