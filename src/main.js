import { drawGUI } from './ui/gui'
import { drawAuthentication } from './ui/authentication/drawAuthentication'

import {
  updateAwakeningsCounter,
  updateAwakeningsCachedCounter
} from './ui/awakeningCounter/drawAwakeningCount'
import { listenTheSleepCycle } from './components/sleep/sleepControl'
import { drawSpider, onRefreshReferences } from './components/sleepy/spider/drawSpider'
import { initializeInfra } from './infra/infra'
import { signInWithPopup, onAuthenticationStateChanged } from './infra/services/authentication/authentication'
import { startAwakeningsSystem } from './infra/awakening/awakening.repository'
import params from './settings/settings'

async function startAwakenings ({ database }) {
  // Awakenings persistence:
  const { addAwakening, setUserUid } = await startAwakeningsSystem({
    database,
    onChange: updateAwakeningsCounter,
    onCachedChange: updateAwakeningsCachedCounter,
  })
}

const start = async () => {
  const spider = await drawSpider({ params })
  listenTheSleepCycle(spider)

  const infraServices = initializeInfra()

  drawAuthentication({
    onLogin: () => { signInWithPopup({ authentication: infraServices.authentication }) },
    onLogout: () => { infraServices.authentication.signOut() }
  })

  // GUI:
  drawGUI({ params, onChange: () => {
    // onRefreshReferences({ addAwakening, params })
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
