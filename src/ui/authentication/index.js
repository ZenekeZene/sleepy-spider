import { initAuthenticationUI } from '@/ui/authentication/drawAuthentication'
import { handleLogin, handleLogout } from '@/ui/authentication/authenticationHandlers'
import { drawSpider } from '@/components/sleepy/spider/drawSpider'
import params from '@/settings/settings'

function startSpider ({ authentication, database }) {
  initAuthenticationUI({ authentication,
    onLogin: async ({ user }) => {
      const { addAwakening: onInterruptedSleep } = await handleLogin({ user, database })
      await drawSpider({ params, onInterruptedSleep })
    },
    onLogout: async () => {
      handleLogout()
      await drawSpider({ params, onInterruptedSleep: () => null })
    },
  })
}

export {
  startSpider,
}
