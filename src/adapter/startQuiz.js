import { findById } from 'sleepy-spider-lib'
import { params } from '@/domain/settings'
import { QUESTIONS_MAX_PER_QUIZ } from '@/domain/question'
import { startAwakeningsSystem } from '@/infra/awakening/awakening.repository'
import { getQuestions } from '@/infra/questions/questions.local.repository'
import { drawSpider } from '@/ui/components/sleepy/spider/drawSpider'
import { listenAnsweredCorrect, updateAwakeningsCounter } from '@/ui/components/awakeningCounter/drawAwakeningCount'

const onChange = (value, spider) => {
  updateAwakeningsCounter(value)
  spider.body.incrementHateLevel(value)
}

const onShowQuestion = (questions, spider) => {
  spider.body.resetHateLevel()
  onShowQuestion(questions)
}

async function startQuiz (image, onShowQuestion) {
  let spider = null

  try {
    const questions = await getQuestions({ size: QUESTIONS_MAX_PER_QUIZ })

    const handlers = {
      onChange: (value) => onChange(value, spider),
      onShowQuestion: () => onShowQuestion(questions, spider),
    }

    const addAwakening = startAwakeningsSystem(handlers)
    listenAnsweredCorrect()
    spider = await drawSpider({ image, params, onInterruptedSleep: addAwakening })
  } catch (error) {
    console.error(error)
    alert('Sorry, Sleepy is sleeping deeply. Please try again later.')
    findById('spider-wrapper').innerHTML = ''
  }
}

export {
  startQuiz,
}
