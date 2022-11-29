import { initAuthenticationUI } from '@/ui/authentication/drawAuthentication'
import { handleLogin, handleLogout } from '@/ui/authentication/authenticationHandlers'
import { drawSpider } from '@/components/sleepy/spider/drawSpider'
import params from '@/settings/settings'
import {
  renderLeaderboardWithoutLoggedUser,
  renderLeaderboardWithLoggedUser,
} from '@/components/leaderboard/leaderboard'

async function onLogin ({ user, database }) {
  renderLeaderboardWithLoggedUser({ currentUser: user, database })
  const { addAwakening: onInterruptedSleep } = await handleLogin({ user, database })
  await drawSpider({ params, onInterruptedSleep })
}

async function onLogout ({ database }) {
  renderLeaderboardWithoutLoggedUser({ database })
  handleLogout()
  await drawSpider({ params, onInterruptedSleep: () => null })
}

function startSpider ({ authentication, database }) {
  initAuthenticationUI({ authentication,
    onLogin: ({ user }) => onLogin({ user, database }),
    onLogout: () => onLogout({ database }),
  })
}

export {
  startSpider,
}
