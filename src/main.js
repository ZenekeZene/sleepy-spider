import { drawGUI } from '@/ui/gui'
import { getInfraServices } from '@/infra/infra'
import params from '@/settings/settings'
import { startSpider } from '@/ui/authentication'
import { onRefreshReferences } from '@/components/sleepy/spider/drawSpider'
import { launchQuestion } from '@/components/question/question'
import { startClock } from '@/components/clock/clock'

function onShowQuestion (questions) {
  if (!questions || questions.length === 0) return
  const question = questions.pop()
  launchQuestion(question)
}

const start = async () => {
  const services = getInfraServices()
  startSpider(services, onShowQuestion)

  document.addEventListener('firstClick', () => {
    startClock()
  })

  drawGUI({ params, onSettingsChanges: () => {
    onRefreshReferences({ params })
  }})
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
