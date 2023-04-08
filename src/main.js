import { drawGUI } from '@/ui/gui'
import { getInfraServices } from '@/infra/infra'
import params from '@/settings/settings'
import { startSpider } from '@/ui/authentication'
import { onRefreshReferences } from '@/components/sleepy/spider/drawSpider'
import { launchQuestion } from '@/components/question/question'
import { startClock } from '@/components/clock/clock'
import { showFinalScreen } from '@/ui/finalScreen/finalScreen'
import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'

(() => {
  const url = new URL('/sprites/spider/spider-spritesheet.png', import.meta.url).href
  const spiderImage = new Image()
  spiderImage.src = url
  spiderImage.onload = () => {
    start(spiderImage)
  }
})()

function onShowQuestion (questions) {
  if (!questions || questions.length === 0) return
  const question = questions.pop()
  launchQuestion(question)
}

document.addEventListener('firstClick', () => {
  startClock()
})

document.addEventListener('endTimer', () => {
  const cachedCounter = new CachedCounter()
  const finalValue = cachedCounter.value
  showFinalScreen(finalValue)
})

const start = async (spiderImage) => {
  const services = getInfraServices()
  startSpider(spiderImage, services, onShowQuestion)

  drawGUI({
    params,
    onSettingsChanges: () => {
      onRefreshReferences({ params })
    }}
  )
}

// document.addEventListener("DOMContentLoaded", () => {
  // start()
// })
