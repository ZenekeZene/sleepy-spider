import { drawGUI, drawUserIcon } from './components/gui/drawGUI'
import {
  updateAwakeningsCounter,
  updateAwakeningsCachedCounter
} from './components/gui/drawAwakeningCount'
import { listenTheSleepCycle } from './components/sleep/sleepControl'
import { sketchSpiderWithEyes, onRefreshReferences } from './components/sleepy/spider/sketchSpiderWithEyes'
import params from './settings/settings'
import { initializeInfra } from './infra/infra'
import { signInWithPopup, onAuthenticationStateChanged } from './infra/services/authentication/authentication'
import { startAwakeningsSystem } from './infra/awakening/awakening.repository'
import { renderLeaderboard } from './components/leaderboard/leaderboard'

async function initSystem ({ user, database, eyesCanvas, spider, eyes }) {
  // Awakenings persistence:
  const { addAwakening } = await startAwakeningsSystem({
    userUid: user.uid,
    database,
    onChange: updateAwakeningsCounter,
    onCachedChange: updateAwakeningsCachedCounter,
  })

  // GUI:
  drawGUI({ params, onChange: () => {
    onRefreshReferences(addAwakening, params)
  }})

  drawUserIcon({ onClick: () => {
    signInWithPopup({ authentication })
  }})
  renderLeaderboard({ currentUser: user })

  // Sleep:
  listenTheSleepCycle(eyesCanvas, eyes, spider, addAwakening)
}

const start = async () => {
  const spider = await sketchSpiderWithEyes(params)
  const { database, authentication } = initializeInfra()

  onAuthenticationStateChanged({ authentication, onChange: async ({ user }) => {
    initSystem({ database, user, ...spider })
  }})
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
