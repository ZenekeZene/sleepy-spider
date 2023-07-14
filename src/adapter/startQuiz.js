import { findById } from 'sleepy-spider-lib'
import { params } from '@/domain/settings'
import { QUESTIONS_MAX_PER_QUIZ } from '@/domain/question'
import { startAwakeningsSystem } from '@/infra/awakening/awakening.repository'
// import { getQuestions } from '@/infra/questions/questions.repository'
import { getQuestions } from '@/infra/questions/questions.local.repository'
import { drawSpider } from '@/ui/components/sleepy/spider/drawSpider'
import { listenAnsweredCorrect, updateAwakeningsCounter } from '@/ui/components/awakeningCounter/drawAwakeningCount'

async function startQuiz (spiderImage, services, onShowQuestion) {
  let spider = null
  let questions
  let hasError = false
  const { database } = services

  getQuestions({ size: QUESTIONS_MAX_PER_QUIZ })
  .then((data) => questions = data)
  .catch((error) => {
    console.error(error)
    alert('Sorry, Sleepy is sleeping deeply. Please try again later.')
    hasError = true
    findById('spider-wrapper').innerHTML = ''
  })

  if (hasError) return

  const addAwakening = await startAwakeningsSystem({
    database,
    onChange: (value) => {
      updateAwakeningsCounter(value)
      spider.body.incrementHateLevel(value)
    },
    onShowQuestion: () => {
      spider.body.resetHateLevel()
      onShowQuestion(questions)
    },
  })

  listenAnsweredCorrect()
  spider = await drawSpider({ spiderImage, params, onInterruptedSleep: addAwakening })
}

export {
  startQuiz,
}
