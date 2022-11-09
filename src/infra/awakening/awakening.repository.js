import { increment, getDoc } from 'firebase/firestore'
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"

const DOCUMENT = 'awakenings'

let cachedCount = 0
const INTERVAL_TO_UPDATE = 10000

async function getSnapshot ({ userUid, database }) {
  const documentRef = doc(database, DOCUMENT, userUid)
  const documentSnap = await getDoc(documentRef)

  return {
    data: documentSnap.data(),
    existsDocument: documentSnap.exists(),
    documentSnap,
    documentRef,
  }
}

async function getTotalAwakenings ({ userUid, database }) {
  if (!userUid) return
  const { data } = await getSnapshot({ userUid, database })
  return data?.value || 0
}

async function addAwakening (value = 1, onCachedChange) {
  cachedCount += value
  onCachedChange(value)
}

async function updateDocument ({ existsDocument, documentRef }) {
  const action = existsDocument ? updateDoc : setDoc
  await action(documentRef, {
    value: increment(cachedCount),
  })
}

function handleAwakeningUpdatesWithInterval ({ userUid, database }) {
  const timerToUpdate = setInterval(async () => {
    if (cachedCount <= 0) return
    const { existsDocument, documentRef } = await getSnapshot({ userUid, database })
    updateDocument({ existsDocument, documentRef })
    cachedCount = 0
  }, INTERVAL_TO_UPDATE)
  return timerToUpdate
}

async function listenAwakenings ({ userUid, database, callback }) {
  if (!userUid) return
  const { documentRef } = await getSnapshot({ userUid, database })
  const unsub = onSnapshot(documentRef, (document) => {
    const data = document.data() || { value: 0 }
    callback(data)
  })
  return unsub
}

async function startAwakeningsSystem ({ userUid, database, onChange, onCachedChange }) {
  if (!database) throw new Error('Error with unknown database.')

  const initialAwakeningsValue = await getTotalAwakenings({ userUid, database })
  const addAwakeningWithCache = (value) => addAwakening(value, onCachedChange)

  onChange(initialAwakeningsValue)
  listenAwakenings({ userUid, database, callback: ({ value }) => { onChange(value) }})
  handleAwakeningUpdatesWithInterval({ userUid, database })

  return {
    addAwakening: addAwakeningWithCache,
  }
}

export {
  startAwakeningsSystem,
}
