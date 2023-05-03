import { listenEvent } from 'sleepy-spider-lib'
import { params } from '@/domain/settings'
import { getInfraServices } from '@/infra/infra'
import { EVENTS } from '@/adapter/events/events'
import { startQuiz } from '@/adapter/startQuiz'
import { loadSpiderSprite, prepare } from '@/ui'
import { onRefreshReferences } from '@/ui/components/sleepy/spider/drawSpider'
import { onShowQuestion } from '@/ui/components/question/question'
import '@/ui/screens/leaderboard/preview/leaderboardPreview.css'

const listenChangesInSettings = () => {
  listenEvent(EVENTS.CHANGES_IN_SETTINGS, () => {
    onRefreshReferences(params)
  })
}

const start = async (spiderImage) => {
  const services = getInfraServices()
  startQuiz(spiderImage, services, onShowQuestion)

  const { authentication } = services

  prepare.finalScreen()
  prepare.leaderboard()
  prepare.clock()
  prepare.gui(params)
  prepare.signIn({ authentication })

  listenChangesInSettings()
}

loadSpiderSprite(start)
