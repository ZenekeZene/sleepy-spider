import { getInfraServices } from '@/infra/infra'
import params from '@/modules/settings/settings'
import { startSpider } from '@/modules/authentication'
import { drawGUI } from '@/ui/gui'
import { loadSpiderSprite } from '@/ui'
import { prepareFinalScreen } from '@/ui/screens/finalScreen/finalScreen'
import { onRefreshReferences } from '@/ui/components/sleepy/spider/drawSpider'
import { onShowQuestion } from '@/ui/components/question/question'
import { prepareClock } from '@/ui/components/clock/clock'

const start = async (spiderImage) => {
  const services = getInfraServices()
  startSpider(spiderImage, services, onShowQuestion)
  prepareClock()
  prepareFinalScreen()

  drawGUI({
    params,
    onSettingsChanges: () => {
      onRefreshReferences({ params })
    }}
  )
}

loadSpiderSprite(start)

// document.addEventListener("DOMContentLoaded", () => {
  // start()
// })
