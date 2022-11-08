import { drawGUI } from './components/gui/drawGUI'
import {
  updateAwakeningsCounter,
  updateAwakeningsCachedCounter
} from './components/gui/drawAwakeningCount'
import { listenTheSleepCycle } from './components/sleep/sleepControl'
import { sketchSpiderWithEyes, onRefreshReferences } from './components/sleepy/spider/sketchSpiderWithEyes'
import params from './settings/settings'
import { initializeInfra } from './infra/infra'
import { startAwakeningsSystem } from './infra/awakening/awakening.repository'

const start = async () => {
  const { eyesCanvas, spider, eyes } = await sketchSpiderWithEyes(params)
  const { database } = initializeInfra()
  const { addAwakening } = await startAwakeningsSystem({
    database,
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
