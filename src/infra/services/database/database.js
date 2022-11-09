import { getFirestore } from 'firebase/firestore'

const initializeDatabase = ({ app }) => getFirestore(app)

export {
  initializeDatabase,
}
