import { prepareSections } from '@/ui'
import { loadSpiderSprite } from '@/adapter/loadSpiderSprite'
import { startQuiz } from '@/adapter/startQuiz'
import { onShowQuestion } from '@/ui/components/question/question'

loadSpiderSprite()
  .then(spiderImage => {
    startQuiz(spiderImage, onShowQuestion)
    prepareSections()
  })
  .catch(error => console.error(error))
