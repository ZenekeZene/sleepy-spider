import { onSnapshot } from 'firebase/firestore'
import { incrementFieldOnDocument } from '../services/database/incrementField'
import { getSnapshot } from '../services/database/getSnapshot'

const DOCUMENT = 'awakenings'

let cachedCount = 0
const INTERVAL_TO_UPDATE = 10000

async function getTotalAwakenings ({ userUid, database }) {
  if (!userUid) return
  const { data } = await getSnapshot({ database, documentId: DOCUMENT, userUid })
  return data?.value || 0
}

async function addAwakening (value = 1, onCachedChange) {
  cachedCount += value
  onCachedChange(value)
}

function handleAwakeningUpdatesWithInterval ({ userUid, database }) {
  const timerToUpdate = setInterval(async () => {
    if (cachedCount <= 0) return
    const { existsDocument, documentRef } = await getSnapshot({ database, documentId: DOCUMENT, userUid })
    incrementFieldOnDocument({ existsDocument, documentRef, value: cachedCount })
    cachedCount = 0
  }, INTERVAL_TO_UPDATE)
  return timerToUpdate
}

async function listenAwakenings ({ userUid, database, callback }) {
  if (!userUid) return
  const { documentRef } = await getSnapshot({ database, documentId: DOCUMENT, userUid })
  const unsub = onSnapshot(documentRef, (document) => {
    const data = document.data() || { value: 0 }
    callback(data)
  })
  return unsub
}

async function startAwakeningsSystem ({ database, onChange, onCachedChange }) {
  if (!database) throw new Error('Error with unknown database.')
  let userUid
  const initialAwakeningsValue = await getTotalAwakenings({ userUid, database })
  const addAwakeningWithCache = (value) => addAwakening(value, onCachedChange)

  onChange(initialAwakeningsValue)
  listenAwakenings({ userUid, database, callback: ({ value }) => { onChange(value) }})
  handleAwakeningUpdatesWithInterval({ userUid, database })

  return {
    addAwakening: addAwakeningWithCache,
    setUserUid: (value) => {
      userUid = value
    }
  }
}

export {
  startAwakeningsSystem,
}
