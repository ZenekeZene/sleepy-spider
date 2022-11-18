import { initAuthenticationUI } from '@/ui/authentication/drawAuthentication'
import { handleLogin, handleLogout } from '@/ui/authentication/authenticationHandlers'
import { drawSpider } from '@/components/sleepy/spider/drawSpider'
import params from '@/settings/settings'
import { renderLeaderboard } from '@/components/leaderboard/leaderboard'

async function onLogin ({ user, database }) {
  renderLeaderboard({ currentUser: user, database })
  const { addAwakening: onInterruptedSleep } = await handleLogin({ user, database })
  await drawSpider({ params, onInterruptedSleep })
}

async function onLogout () {
  handleLogout()
  await drawSpider({ params, onInterruptedSleep: () => null })
}

function startSpider ({ authentication, database }) {
  initAuthenticationUI({ authentication,
    onLogin: ({ user }) => onLogin({ user, database }),
    onLogout,
  })
}

export {
  startSpider,
}
