import createEyes from './components/eye/factory/eyeFactory'
import createSpider from './components/spider/spiderFactory'
import eyeWithMouse from './components/eye/eyeWithMouse'
import {
  drawGUI,
  toggleGUI,
  toggleInvisibleElements,
  updateAwakeningsCounter,
} from './components/gui/drawGUI'

import listenTheSleepCycle, { applySurprise } from './components/sleep/sleepControl'
import params from './settings/settings'
import initModal from './lib/modal'
import { startAwakeningsSystem } from './lib/firebase'

let spider
let eyes = []
const canvas = document.getElementById('eyes')
const context = canvas.getContext('2d')

const onRefreshReferences = async (addAwakening) => {
  eyes.forEach(({ pupil }) => { pupil.disable() })
  await sketchEyes()
  listenTheSleepCycle(eyes, spider, addAwakening)
}

const sketchEyes = async () => {
  eyes = await createEyes({ context, canvas, params })
  eyeWithMouse({ eyes, context, canvas, sprite: eyes[0].sprite, params })
}

const sketchSpider = async () => {
  const canvas = document.getElementById('body')
  const context = canvas.getContext('2d')
  spider = await createSpider({ context, canvas, params })
}

const start = async () => {
  initModal()
  await sketchEyes()

  const { addAwakening } = await startAwakeningsSystem({
    onChange: updateAwakeningsCounter
  })

  drawGUI({ params, onChange: () => {
    onRefreshReferences(addAwakening)
  }})

  toggleGUI()
  toggleInvisibleElements()
  await sketchSpider()
  listenTheSleepCycle(eyes, spider, addAwakening)
}

start()
