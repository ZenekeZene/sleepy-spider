import { drawGUI, updateAwakeningsCounter } from './components/gui/drawGUI'
import { listenTheSleepCycle } from './components/sleep/sleepControl'
import { sketchSpiderWithEyes, onRefreshReferences } from './components/spider/sketchSpiderWithEyes'
import params from './settings/settings'
import initModal from './lib/modal'
import { startAwakeningsSystem } from './lib/firebase'

const start = async () => {
  initModal()
  const { eyesCanvas, spider, eyes } = await sketchSpiderWithEyes(params)
  const { addAwakening } = await startAwakeningsSystem({
    onChange: updateAwakeningsCounter
  })
  drawGUI({ params, onChange: () => {
    onRefreshReferences(addAwakening, params)
  }})
  listenTheSleepCycle(eyesCanvas, eyes, spider, addAwakening)
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
