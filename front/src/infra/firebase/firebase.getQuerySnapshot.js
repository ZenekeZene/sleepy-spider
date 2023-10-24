import { getDocs, query } from 'firebase/firestore'

const getQuerySnapshot = async (collection, criteria) => {
	const q = query(collection, ...criteria)
	const querySnapshot = await getDocs(q)
	return querySnapshot
}

export { getQuerySnapshot }
