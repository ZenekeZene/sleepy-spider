import { collection} from 'firebase/firestore'
import { getDatabase } from "@/infra/services/database/getDatabase"

const collectionName = 'awakenings'

const getCollectionReference = () => {
	const database = getDatabase()
  const collectionReference = collection(database, collectionName)
	return collectionReference
}

export {
	getCollectionReference,
}
