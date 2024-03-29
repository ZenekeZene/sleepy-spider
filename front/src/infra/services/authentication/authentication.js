import {
  getAuth,
  signInWithPopup as signInWithPopupFirebase,
  TwitterAuthProvider,
} from "firebase/auth"
import { getInfraServices } from '@/infra/infra'

const initializeAuth = ({ app }) => getAuth(app)

const parseResponse = (result) => {
  const { user, _tokenResponse } = result
  const isNewUser = _tokenResponse?.isNewUser || false
  const { displayName, photoURL, uid, email } = user
  return { displayName, photoURL, uid, isNewUser, email }
}

const signInWithPopup = () => {
  const { authentication } = getInfraServices()
  return new Promise((resolve, reject) => {
    const provider = new TwitterAuthProvider()
    signInWithPopupFirebase(authentication, provider)
    .then((result) => {
      const response = parseResponse(result)
      resolve(response)
    }).catch((error) => {
      console.error(error)
      reject(error)
    });
  })
}

const logout = () => {
  const { authentication } = getInfraServices()
  return new Promise((resolve, reject) => {
    authentication.signOut()
    .then(() => {
      resolve()
    }).catch((error) => {
      console.error(error)
      reject(error)
    })
  })
}

const onAuthenticationStateChanged = ({ onChange = () => {} }) => {
  const { authentication } = getInfraServices()
  authentication.onAuthStateChanged((user) => {
    onChange({ user })
  })
}

export {
  initializeAuth,
  signInWithPopup,
  logout,
  onAuthenticationStateChanged,
}

