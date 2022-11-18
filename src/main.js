import { drawGUI } from '@/ui/gui'
import { initAuthenticationUI } from '@/ui/authentication/drawAuthentication'
import {
  updateAwakeningsCounter,
  updateAwakeningsCachedCounter
} from '@/ui/awakeningCounter/drawAwakeningCount'
import { drawSpider, onRefreshReferences } from '@/components/sleepy/spider/drawSpider'
import { getInfraServices } from '@/infra/infra'
import { startAwakeningsSystem } from '@/infra/awakening/awakening.repository'
import params from '@/settings/settings'

async function startAwakenings ({ database }) {
  // Awakenings persistence:
  const { addAwakening } = await startAwakeningsSystem({
    database,
    onChange: updateAwakeningsCounter,
    onCachedChange: updateAwakeningsCachedCounter,
  })
}

const start = async () => {
  await drawSpider({ params })
  const { authentication } = getInfraServices()
  initAuthenticationUI({ authentication })

  drawGUI({ params, onSettingsChanges: () => {
    onRefreshReferences({ params })
  }})
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
