import { initializeFirebase } from './firebase/firebase'
import { initializeDatabase } from './firebase/database'
import { initializeAuth } from './firebase/authentication'

function initializeInfra () {
  const firebaseApp = initializeFirebase()
  const authentication = initializeAuth({ app: firebaseApp })
  const database = initializeDatabase({ app: firebaseApp })

  return {
    authentication,
    database,
  }
}

export {
  initializeInfra,
}
