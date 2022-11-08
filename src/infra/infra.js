import { initializeFirebase } from './firebase'
import { initializeDatabase } from './database'
import { initializeAuth } from './authentication'

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
