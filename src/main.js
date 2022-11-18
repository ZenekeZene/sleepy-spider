import { drawGUI } from './ui/gui'
import { drawAuthentication } from './ui/authentication/drawAuthentication'

import {
  updateAwakeningsCounter,
  updateAwakeningsCachedCounter
} from './ui/awakeningCounter/drawAwakeningCount'
import { listenTheSleepCycle } from './components/sleep/sleepControl'
import { sketchSpiderWithEyes, onRefreshReferences } from './components/sleepy/spider/sketchSpiderWithEyes'
import { initializeInfra } from './infra/infra'
import { signInWithPopup, onAuthenticationStateChanged } from './infra/services/authentication/authentication'
import { startAwakeningsSystem } from './infra/awakening/awakening.repository'
import { renderLeaderboard } from './components/leaderboard/leaderboard'
import params from './settings/settings'

async function startAwakenings ({ database }) {
  // Awakenings persistence:
  const { addAwakening, setUserUid } = await startAwakeningsSystem({
    database,
    onChange: updateAwakeningsCounter,
    onCachedChange: updateAwakeningsCachedCounter,
  })
}

async function initSystem ({ database, authentication, ...spider }) {

  // renderLeaderboard({ currentUser: user })
}

const start = async () => {
  const spider = await sketchSpiderWithEyes(params)
  const infraServices = initializeInfra()
  initSystem({ ...spider, ...infraServices })

  drawAuthentication({
    onLogin: () => { signInWithPopup({ authentication: infraServices.authentication }) },
    onLogout: () => { infraServices.authentication.signOut() }
  })

  // Sleep:
  const { eyesCanvas, body, eyes } = spider
  listenTheSleepCycle(eyesCanvas, eyes, body)

  // GUI:
  drawGUI({ params, onChange: () => {
    // onRefreshReferences(addAwakening, params)
  }})

  onAuthenticationStateChanged({
    authentication: infraServices.authentication,
    onChange: async ({ user }) => {
      if (!user) {
        console.warn('Unknown user')
        return
      }
      console.log(user)
      setUserUid(user.uid)
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
