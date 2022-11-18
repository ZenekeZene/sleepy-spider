import { query, limit, orderBy, getDocs, collection } from 'firebase/firestore'

const DOCUMENT = 'awakenings'

async function getUsersByLimit ({ database, limitSize = 3 }) {
  const users = []
  const awakeningsRef = collection(database, DOCUMENT)
  const q = query(awakeningsRef, orderBy('value', 'desc'), limit(limitSize))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    data.id = doc.id
    users.push(data)
  })
  return users
}

export {
  getUsersByLimit,
}
