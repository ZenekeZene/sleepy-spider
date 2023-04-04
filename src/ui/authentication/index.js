import { initAuthenticationUI } from '@/ui/authentication/drawAuthentication'
import { renderLogin, renderLogout } from '@/ui/authentication/authenticationHandlers'
import { drawSpider } from '@/components/sleepy/spider/drawSpider'
import params from '@/settings/settings'
import {
  renderLeaderboardWithoutLoggedUser,
  renderLeaderboardWithLoggedUser,
} from '@/components/leaderboard/leaderboard'
import { startAwakeningsSystem } from '@/infra/awakening/awakening.repository'
import { getQuestions } from '@/infra/questions/questions.repository'
import { listenAnsweredCorrect, updateAwakeningsCounter } from '@/ui/awakeningCounter/drawAwakeningCount'

async function onLogin ({ user, database }) {
  renderLeaderboardWithLoggedUser({ currentUser: user, database })
  renderLogin()
}

async function onLogout ({ database }) {
  renderLeaderboardWithoutLoggedUser({ database })
  renderLogout()
}

async function startSpider ({ authentication, database }, onShowQuestion) {
  let spider = null
  const questions = await getQuestions({ database, size: 20 })

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
  spider = await drawSpider({ params, onInterruptedSleep: addAwakening })
}

export {
  startSpider,
}
