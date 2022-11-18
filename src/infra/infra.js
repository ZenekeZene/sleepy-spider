import { initializeFirebase } from './firebase/firebase'
import { initializeDatabase } from './services/database/database'
import { initializeAuth } from './services/authentication/authentication'

function getInfraServices () {
  const firebaseApp = initializeFirebase()
  const authentication = initializeAuth({ app: firebaseApp })
  const database = initializeDatabase({ app: firebaseApp })

  return {
    authentication,
    database,
  }
}

export {
  getInfraServices,
}
