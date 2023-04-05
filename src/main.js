import { drawGUI } from '@/ui/gui'
import { getInfraServices } from '@/infra/infra'
import params from '@/settings/settings'
import { startSpider } from '@/ui/authentication'
import { onRefreshReferences } from '@/components/sleepy/spider/drawSpider'
import { launchQuestion } from '@/components/question/question'
import { startClock } from '@/components/clock/clock'
import { showFinalScreen } from '@/ui/finalScreen/finalScreen'
import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'
const cachedCounter = new CachedCounter()

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

  document.addEventListener('endTimer', () => {
    const finalValue = cachedCounter.value
    showFinalScreen(finalValue)
  })

  drawGUI({ params, onSettingsChanges: () => {
    onRefreshReferences({ params })
  }})
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
