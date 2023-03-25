import { drawGUI } from '@/ui/gui'
import { getInfraServices } from '@/infra/infra'
import params from '@/settings/settings'
import { startSpider } from '@/ui/authentication'
import { onRefreshReferences } from '@/components/sleepy/spider/drawSpider'

const start = async () => {
  const services = getInfraServices()
  startSpider(services)

  drawGUI({ params, onSettingsChanges: () => {
    onRefreshReferences({ params })
  }})
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
