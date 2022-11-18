import { signInWithRedirect, onAuthenticationStateChanged } from '@/infra/services/authentication/authentication'

const signIn = ({ authentication }) => signInWithRedirect({ authentication })
const logout = ({ authentication }) => authentication.signOut()

const drawLogin = ({ authentication }) => {
  const loginIcon = document.getElementById('login-icon')
  loginIcon.classList.add('visible')
  loginIcon.addEventListener('click', () => {
    signIn({ authentication })
    hideLogin()
  })
}

const drawLogout = ({ authentication }) => {
  const logoutIcon = document.getElementById('logout-icon')
  logoutIcon.classList.add('visible')
  logoutIcon.addEventListener('click', () => {
    logout({ authentication })
    hideLogout()
  })
}

const hideLogin = () => {
  const loginIcon = document.getElementById('login-icon')
  loginIcon.classList.remove('visible')
}

const hideLogout = () => {
  const logoutIcon = document.getElementById('logout-icon')
  logoutIcon.classList.remove('visible')
}

const initAuthenticationUI = ({ authentication }) => {
  onAuthenticationStateChanged({
    authentication,
    onChange: async ({ user }) => {
      if (!user) {
        console.warn('Unknown user')
        drawLogin({ authentication })
        return
      }
      console.log(user)
      drawLogout({ authentication })
    }
  })
}

export {
  initAuthenticationUI,
}
