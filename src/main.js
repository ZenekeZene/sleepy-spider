import { drawGUI, drawUserIcon } from './components/gui/drawGUI'
import {
  updateAwakeningsCounter,
  updateAwakeningsCachedCounter
} from './components/gui/drawAwakeningCount'
import { listenTheSleepCycle } from './components/sleep/sleepControl'
import { sketchSpiderWithEyes, onRefreshReferences } from './components/sleepy/spider/sketchSpiderWithEyes'
import params from './settings/settings'
import { initializeInfra } from './infra/infra'
import { signInWithPopup, onAuthenticationStateChanged } from './infra/firebase/authentication'
import { startAwakeningsSystem } from './infra/awakening/awakening.repository'

const start = async () => {
  const { eyesCanvas, spider, eyes } = await sketchSpiderWithEyes(params)
  const { database, authentication } = initializeInfra()
  const { addAwakening } = await startAwakeningsSystem({
    database,
    onChange: updateAwakeningsCounter,
    onCachedChange: updateAwakeningsCachedCounter,
  })

  onAuthenticationStateChanged({ authentication, onChange: ({ user }) => {
    if (!user?.displayName) return
    document.getElementById('user-icon').src = user.photoURL
    console.log(user.displayName)
    console.log(user.email)
    console.log(user.photoURL)
  }})

  drawGUI({ params, onChange: () => {
    onRefreshReferences(addAwakening, params)
  }})
  drawUserIcon({ onClick: () => {
    signInWithPopup({ authentication })
  }})
  listenTheSleepCycle(eyesCanvas, eyes, spider, addAwakening)
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
