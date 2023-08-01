import { findById, classHelper as $class } from 'sleepy-spider-lib'
import { prepareSections } from '@/ui'
import { loadSpiderSprite } from '@/adapter/loadSpiderSprite'
import { startQuiz } from '@/adapter/startQuiz'
import { onShowQuestion } from '@/ui/components/question/question'

const isDebugMode = import.meta.env.VITE_MODE_DEBUG === 'true';
window.isDebugMode = isDebugMode
if (isDebugMode) {
  const root = findById('root')
  $class.add(root, 'debug-mode')
}

loadSpiderSprite()
  .then(spiderImage => {
    startQuiz(spiderImage, onShowQuestion)
    prepareSections()
  })
  .catch(error => console.error(error))
