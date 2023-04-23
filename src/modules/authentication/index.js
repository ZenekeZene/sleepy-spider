import { findById } from 'sleepy-spider-lib'
import { startAwakeningsSystem } from '@/infra/awakening/awakening.repository'
import { getQuestions } from '@/infra/questions/questions.repository'
import { initAuthenticationUI } from '@/modules/authentication/drawAuthentication'
import { renderLogin, renderLogout } from '@/modules/authentication/authenticationHandlers'
import { params } from '@/domain/settings'
import {
  renderLeaderboardWithoutLoggedUser,
  renderLeaderboardWithLoggedUser,
} from '@/ui/screens/leaderboard/leaderboard'
import { drawSpider } from '@/ui/components/sleepy/spider/drawSpider'
import { listenAnsweredCorrect, updateAwakeningsCounter } from '@/ui/components/awakeningCounter/drawAwakeningCount'

async function onLogin ({ user, database }) {
  renderLeaderboardWithLoggedUser({ currentUser: user, database })
  renderLogin()
}

async function onLogout ({ database }) {
  renderLeaderboardWithoutLoggedUser({ database })
  renderLogout()
}

async function startSpider (spiderImage, services, onShowQuestion) {
  let spider = null
  let questions
  let hasError = false
  const { authentication, database } = services

  try {
    questions = await getQuestions({ database, size: 20 })
  } catch (error) {
    alert('Sorry, Sleepy is sleeping deeply. Please try again later.')
    hasError = true
  }

  if (hasError) {
    findById('spider-wrapper').innerHTML = ''
    return
  }

  initAuthenticationUI({
    authentication,
    onLogin: ({ user }) => onLogin({ user, database }),
    onLogout: () => onLogout({ database }),
  })


  const { addAwakening, setUser } = await startAwakeningsSystem({
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
  // await setUser(user)
  spider = await drawSpider({ spiderImage, params, onInterruptedSleep: addAwakening })
}

export {
  startSpider,
}
