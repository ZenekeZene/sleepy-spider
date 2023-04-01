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

  const { addAwakening, setUser } = await startAwakeningsSystem({
    database,
    onChange: updateAwakeningsCounter,
  })
  await setUser(user)
  await drawSpider({ params, onInterruptedSleep: addAwakening })
}

async function onLogout ({ database }) {
  renderLeaderboardWithoutLoggedUser({ database })
  renderLogout()
  await drawSpider({ params, onInterruptedSleep: () => null })
}

function startSpider ({ authentication, database }) {
  initAuthenticationUI({
    authentication,
    onLogin: ({ user }) => onLogin({ user, database }),
    onLogout: () => onLogout({ database }),
  })
}

export {
  startSpider,
}
