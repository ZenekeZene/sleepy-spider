import { initializeFirebase } from './firebase/firebase'
import { initializeDatabase } from './services/database/database'
import { initializeAuth } from './services/authentication/authentication'

function getInfraServices () {
  const app = initializeFirebase()
  const authentication = initializeAuth({ app })
  const database = initializeDatabase({ app })

  return {
    authentication,
    database,
  }
}

export {
  getInfraServices,
}
