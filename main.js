import createEyes from './components/eye/factory/eyeFactory'
import createSpider from './components/spider/spiderFactory'
import eyeWithMouse from './components/eye/eyeWithMouse'
import { drawGUI, toggleGUI } from './components/gui/drawGUI'
import listenTheSleepCycle from './components/sleep/sleepControl'
import params from './settings/settings'

let eyes = []

const onChange = async (context, canvas) => {
  eyes.forEach(eye => {
    eye.pupil.disable()
  })
  eyes = await createEyes({ context, canvas, params })
  listenTheSleepCycle(eyes)
  eyeWithMouse({ eyes, context, canvas, sprite: eyes[0].sprite, params })
}


const sketchEyes = async () => {
  const canvas = document.getElementById('eyes')
  const context = canvas.getContext('2d')
  eyes = await createEyes({ context, canvas, params })
  eyeWithMouse({ eyes, context, canvas, sprite: eyes[0].sprite, params })
}

const sketchSpider = async () => {
  const canvas = document.getElementById('body')
  const context = canvas.getContext('2d')
  createSpider({ context, canvas, params })
}

const start = async () => {
  await sketchEyes()
  drawGUI(params, () => { onChange(context, canvas) })
  toggleGUI()
  sketchSpider()
  listenTheSleepCycle(eyes)
}

start()
