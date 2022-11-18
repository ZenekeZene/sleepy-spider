import { onSnapshot } from 'firebase/firestore'
import { incrementFieldOnDocument } from '../services/database/incrementField'
import { getSnapshot } from '../services/database/getSnapshot'

const DOCUMENT = 'awakenings'

let cachedCount = 0
const INTERVAL_TO_UPDATE_IN_MS = 10000

async function getTotalAwakenings ({ userUid, database }) {
  const { data } = await getSnapshot({ database, documentId: DOCUMENT, userUid })
  return data?.value || 0
}

async function addAwakening (value = 1, onCachedChange) {
  cachedCount += value
  onCachedChange(value)
}

function handleAwakeningUpdatesWithInterval ({ userUid, user, database }) {
  const timerToUpdate = setInterval(async () => {
    if (cachedCount > 0) {
      const { existsDocument, documentRef } = await getSnapshot({ database, documentId: DOCUMENT, userUid })
      incrementFieldOnDocument({ existsDocument, documentRef, value: cachedCount, user })
      cachedCount = 0
    }
  }, INTERVAL_TO_UPDATE_IN_MS)
  return timerToUpdate
}

async function listenAwakenings ({ userUid, database, callback }) {
  const { documentRef } = await getSnapshot({ database, documentId: DOCUMENT, userUid })
  const unsubcribe = onSnapshot(documentRef, (document) => {
    const data = document.data() || { value: 0 }
    callback(data)
  })
  return unsubcribe
}

async function startAwakeningsSystem ({ database, onChange, onCachedChange }) {
  if (!database) throw new Error('Error with unknown database.')
  let userUid

  return {
    addAwakening: (value = 1) => addAwakening(value, onCachedChange),
    setUser: async (user) => {
      userUid = user.uid
      const initialAwakeningsValue = await getTotalAwakenings({ userUid, database })
      onChange(initialAwakeningsValue)
      handleAwakeningUpdatesWithInterval({ userUid, user, database })
      listenAwakenings({ userUid, database, callback: ({ value }) => { onChange(value) }})
    }
  }
}

export {
  startAwakeningsSystem,
}
