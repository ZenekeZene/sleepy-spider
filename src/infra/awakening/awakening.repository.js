import { increment, collection, getDocs } from 'firebase/firestore'
import { doc, onSnapshot, updateDoc } from "firebase/firestore"

const DOCUMENT = 'awakenings'
const FIELD = 'total'

let cachedCount = 0
const INTERVAL_TO_UPDATE = 10000

async function getTotalAwakenings ({ database }) {
  const awakeningsCol = collection(database, DOCUMENT)
  const awakeningsSnapshot = await getDocs(awakeningsCol)
  const awakeningsValue = awakeningsSnapshot.docs.map(document => document.data())
  return awakeningsValue[0].value
}

async function addAwakening (value = 1, onCachedChange) {
  cachedCount += value
  onCachedChange(value)
}

function handleAwakeningUpdatesWithInterval ({ database }) {
  const awakeningsRef = doc(database, DOCUMENT, FIELD)
  const timerToUpdate = setInterval(async () => {
    if (cachedCount <= 0) return
    await updateDoc(awakeningsRef, {
      value: increment(cachedCount)
    })
    cachedCount = 0
  }, INTERVAL_TO_UPDATE)
  return timerToUpdate
}

function listenAwakenings ({ database, callback }) {
  const unsub = onSnapshot(doc(database, DOCUMENT, FIELD), (document) => {
    callback(document.data())
  })
  return unsub
}

async function startAwakeningsSystem ({ database, onChange, onCachedChange }) {
  if (!database) throw new Error('Error with unknown database.')

  const initialAwakeningsValue = await getTotalAwakenings({ database })
  const addAwakeningWithCache = (value) => addAwakening(value, onCachedChange)

  onChange(initialAwakeningsValue)
  listenAwakenings({ database, callback: ({ value }) => { onChange(value) }})
  handleAwakeningUpdatesWithInterval({ database })

  return {
    addAwakening: addAwakeningWithCache,
  }
}

export {
  startAwakeningsSystem,
}
