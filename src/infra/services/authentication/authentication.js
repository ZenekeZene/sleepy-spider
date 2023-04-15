import { getAuth, signInWithRedirect as signInWithRedirectFirebase, GoogleAuthProvider } from "firebase/auth"

const initializeAuth = ({ app }) => getAuth(app)

const signInWithRedirect = ({ authentication }) => {
  const provider = new GoogleAuthProvider()
  signInWithRedirectFirebase(authentication, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      // console.log(result)
      // console.log(user, token)
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      if (errorCode === 'auth/popup-blocked') {
        alert('Let')
      }
      console.error(errorCode, errorMessage, email, credential)
    })
}

const onAuthenticationStateChanged = ({ authentication, onChange }) => {
  authentication.onAuthStateChanged((user) => {
    onChange({ user })
  })
}

export {
  initializeAuth,
  signInWithRedirect,
  onAuthenticationStateChanged,
}

