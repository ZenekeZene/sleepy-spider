import { listenEvent } from 'sleepy-spider-lib'
import { params } from '@/domain/settings'
import { getInfraServices } from '@/infra/infra'
import { EVENTS } from '@/adapter/events/events'
import { startSpider } from '@/modules/authentication'
import { drawGUI } from '@/ui/gui'
import { loadSpiderSprite } from '@/ui'
import { prepareFinalScreen } from '@/ui/screens/finalScreen/finalScreen'
import { onRefreshReferences } from '@/ui/components/sleepy/spider/drawSpider'
import { onShowQuestion } from '@/ui/components/question/question'
import { prepareClock } from '@/ui/components/clock/clock'
import '@/modules/leaderboard/preview/leaderboard-preview.css'

const listenChangesInSettings = () => {
  listenEvent(EVENTS.CHANGES_IN_SETTINGS, () => {
    onRefreshReferences(params)
  })
}

const start = async (spiderImage) => {
  const services = getInfraServices()
  startSpider(spiderImage, services, onShowQuestion)
  prepareClock()
  prepareFinalScreen()
  listenChangesInSettings()
  drawGUI(params)
}

loadSpiderSprite(start)
