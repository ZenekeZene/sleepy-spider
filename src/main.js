import { listenEvent } from 'sleepy-spider-lib'
import { params } from '@/domain/settings'
import { getInfraServices } from '@/infra/infra'
import { EVENTS } from '@/adapter'
import { startQuiz } from '@/adapter/startQuiz'
import { loadSpiderSprite, prepare } from '@/ui'
import { onRefreshReferences } from '@/ui/components/sleepy/spider/drawSpider'
import { onShowQuestion } from '@/ui/components/question/question'

const listenChangesInSettings = () => {
  listenEvent(EVENTS.CHANGES_IN_SETTINGS, () => {
    onRefreshReferences(params)
  })
}

const start = async (spiderImage) => {
  const { authentication } = getInfraServices()
  startQuiz(spiderImage, onShowQuestion)

  prepare.finalScreen()
  prepare.record()
  prepare.leaderboard()
  prepare.clock()
  prepare.gui(params)
  prepare.signIn(authentication)

  listenChangesInSettings()
}

loadSpiderSprite(start)
