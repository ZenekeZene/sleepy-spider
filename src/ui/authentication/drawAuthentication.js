import { signInWithRedirect, onAuthenticationStateChanged } from '@/infra/services/authentication/authentication'

const loginIcon = document.getElementById('login-icon')
const logoutIcon = document.getElementById('logout-icon')

const signIn = ({ authentication }) => signInWithRedirect({ authentication })
const logout = ({ authentication }) => {
  authentication.signOut()
  window.location.reload()
}

const drawLogin = ({ authentication }) => {
  loginIcon.classList.add('visible')
  loginIcon.addEventListener('click', async () => {
    await signIn({ authentication })
    hideLogin()
  })
}

const drawLogout = ({ authentication }) => {
  logoutIcon.classList.add('visible')
  logoutIcon.addEventListener('click', () => {
    logout({ authentication })
    hideLogout()
  })
}

const hideLogin = () => {
  loginIcon.classList.remove('visible')
}

const hideLogout = () => {
  logoutIcon.classList.remove('visible')
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
