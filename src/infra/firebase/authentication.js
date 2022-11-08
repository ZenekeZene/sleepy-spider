import { getAuth, signInWithPopup as signInWithPopupFirebase, GoogleAuthProvider } from "firebase/auth"

const initializeAuth = ({ app }) => getAuth(app)

function signInWithPopup ({ authentication }) {
  const provider = new GoogleAuthProvider()
  signInWithPopupFirebase(authentication, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      console.log(user, token)
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.error(errorCode, errorMessage, email, credential)
    })
}

function onAuthenticationStateChanged ({ authentication, onChange }) {
  authentication.onAuthStateChanged((user) => {
    onChange({ user })
  })
}

export {
  initializeAuth,
  signInWithPopup,
  onAuthenticationStateChanged,
}

