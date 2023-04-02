import { initAuthenticationUI } from '@/ui/authentication/drawAuthentication'
import { renderLogin, renderLogout } from '@/ui/authentication/authenticationHandlers'
import { drawSpider } from '@/components/sleepy/spider/drawSpider'
import params from '@/settings/settings'
import {
  renderLeaderboardWithoutLoggedUser,
  renderLeaderboardWithLoggedUser,
} from '@/components/leaderboard/leaderboard'
import { startAwakeningsSystem } from '@/infra/awakening/awakening.repository'
import { updateAwakeningsCounter } from '@/ui/awakeningCounter/drawAwakeningCount'

async function onLogin ({ user, database }) {
  renderLeaderboardWithLoggedUser({ currentUser: user, database })
  renderLogin()
}

async function onLogout ({ database }) {
  renderLeaderboardWithoutLoggedUser({ database })
  renderLogout()
}

async function startSpider ({ authentication, database }, onShowQuestion) {
  initAuthenticationUI({
    authentication,
    onLogin: ({ user }) => onLogin({ user, database }),
    onLogout: () => onLogout({ database }),
  })

  const { addAwakening, setUser } = await startAwakeningsSystem({
    database,
    onChange: updateAwakeningsCounter,
    onShowQuestion,
  })
  // await setUser(user)
  await drawSpider({ params, onInterruptedSleep: addAwakening })
}

export {
  startSpider,
}
