import { findById } from 'sleepy-spider-lib'
import { signInWithRedirect, onAuthenticationStateChanged } from '@/infra/services/authentication/authentication'
import { VISIBLE_CLASS } from '@/ui/constants'

const loginIcon = findById('login-icon')
const logoutIcon = findById('logout-icon')

const signIn = ({ authentication }) => signInWithRedirect({ authentication })
const logout = ({ authentication }) => {
  authentication.signOut()
  window.location.reload()
}

const drawLogin = ({ authentication }) => {
  if (!loginIcon) return
  loginIcon.classList.add(VISIBLE_CLASS)
  loginIcon.addEventListener('click', async () => {
    await signIn({ authentication })
    hideLogin()
  })
}

const drawLogout = ({ authentication }) => {
  if (!logoutIcon) return
  logoutIcon.classList.add(VISIBLE_CLASS)
  logoutIcon.addEventListener('click', () => {
    logout({ authentication })
    hideLogout()
  })
}

const hideLogin = () => {
  if (!loginIcon) return
  loginIcon.classList.remove(VISIBLE_CLASS)
}

const hideLogout = () => {
  if (!logoutIcon) return
  logoutIcon.classList.remove(VISIBLE_CLASS)
}

const initAuthenticationUI = ({ authentication, onLogin, onLogout }) => {
  onAuthenticationStateChanged({
    authentication,
    onChange: async ({ user }) => {
      if (!user) {
        drawLogin({ authentication })
        onLogout()
        return
      }
      onLogin({ user })
      drawLogout({ authentication })
    }
  })
}

export {
  initAuthenticationUI,
}
