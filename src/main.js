import { drawGUI, updateAwakeningsCounter, updateAwakeningsCachedCounter } from './components/gui/drawGUI'
import { listenTheSleepCycle } from './components/sleep/sleepControl'
import { sketchSpiderWithEyes, onRefreshReferences } from './components/spider/sketchSpiderWithEyes'
import params from './settings/settings'
import initModal from './lib/modal'
import { startAwakeningsSystem } from './infra/firebase'

const start = async () => {
  initModal()
  const { eyesCanvas, spider, eyes } = await sketchSpiderWithEyes(params)
  const { addAwakening } = await startAwakeningsSystem({
    onChange: updateAwakeningsCounter,
    onCachedChange: updateAwakeningsCachedCounter,
  })
  drawGUI({ params, onChange: () => {
    onRefreshReferences(addAwakening, params)
  }})
  listenTheSleepCycle(eyesCanvas, eyes, spider, addAwakening)
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
