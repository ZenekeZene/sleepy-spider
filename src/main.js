import createEyes from './components/eye/factory/eyeFactory'
import createSpider from './components/spider/spiderFactory'
import eyeWithMouse from './components/eye/eyeWithMouse'
import { drawGUI, toggleGUI } from './components/gui/drawGUI'
import listenTheSleepCycle from './components/sleep/sleepControl'
import params from './settings/settings'
import initModal from './lib/modal'

let spider
let eyes = []
const canvas = document.getElementById('eyes')
const context = canvas.getContext('2d')

const onChange = async (context, canvas) => {
  eyes.forEach(eye => {
    eye.pupil.disable()
  })
  eyes = await createEyes({ context, canvas, params })
  listenTheSleepCycle(eyes, spider)
  eyeWithMouse({ eyes, context, canvas, sprite: eyes[0].sprite, params })
}

const sketchEyes = async () => {
  eyes = await createEyes({ context, canvas, params })
  eyeWithMouse({ eyes, context, canvas, sprite: eyes[0].sprite, params })
}

const toggleInvisible = () => {
  setTimeout(() => {
    const invisibleElements = document.querySelectorAll('.invisible')
    const transparentElements = document.querySelectorAll('.transparent')
    invisibleElements.forEach((invisibleElement) => {
      invisibleElement.classList.toggle('invisible')
    })
    transparentElements.forEach((transparentElement) => {
      transparentElement.classList.toggle('transparent')
      transparentElement.classList.add('bounceInDown')
    })
    const loaderElement = document.getElementById('loader')
    loaderElement.classList.add('invisible')
  }, 1000)
}

const sketchSpider = async () => {
  const canvas = document.getElementById('body')
  const context = canvas.getContext('2d')
  spider = await createSpider({ context, canvas, params })
  toggleInvisible()
}

const start = async () => {
  initModal()
  await sketchEyes()
  drawGUI(params, () => { onChange(context, canvas) })
  toggleGUI()
  await sketchSpider()
  listenTheSleepCycle(eyes, spider)
}

start()
