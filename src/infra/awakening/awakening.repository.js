import { onSnapshot } from 'firebase/firestore'
import { incrementFieldOnDocument } from '../services/database/incrementField'
import { getSnapshot } from '../services/database/getSnapshot'
import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'

const DOCUMENT = 'awakenings'

let clicksSinceTheLastUpdate = 0
let cachedCounter
const INTERVAL_TO_UPDATE_IN_MS = 10000

async function getTotalAwakenings ({ userUid, database }) {
  const { data } = await getSnapshot({ database, documentId: DOCUMENT, userUid })
  return data?.value || 0
}

async function addAwakening (value = 1, onChange) {
  clicksSinceTheLastUpdate += value
  cachedCounter.increment(value)
  onChange(value)
}

function handleAwakeningUpdatesWithInterval ({ userUid, user, database }) {
  const timerToUpdate = setInterval(async () => {
    if (clicksSinceTheLastUpdate > 0) {
      const snapshot = await getSnapshot({ database, documentId: DOCUMENT, userUid })
      incrementFieldOnDocument({ value: clicksSinceTheLastUpdate, user, ...snapshot })
      clicksSinceTheLastUpdate = 0
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

async function setInitialAwakenings ({ userUid, database, onChange }) {
  const initialAwakeningsValue = await getTotalAwakenings({ userUid, database })
  cachedCounter.update(initialAwakeningsValue)
  onChange(initialAwakeningsValue)
}

async function setUser ({ user, database, onChange }) {
  let userUid = user.uid
  setInitialAwakenings({ userUid, database, onChange })
  handleAwakeningUpdatesWithInterval({ userUid, user, database })

  listenAwakenings({ userUid, database, callback: ({ value }) => {
    cachedCounter.update(value)
    onChange(value)
  }})
}

async function startAwakeningsSystem (props) {
  if (!props?.database) throw new Error('Error with unknown database.')
  if (!props?.onChange) throw new Error('Error with unknown callback onChange.')
  cachedCounter = new CachedCounter(0)

  const api = {
    addAwakening: (value = 1) => addAwakening(value, props.onChange),
    setUser: (user) => setUser({ user, ...props }),
  }
  return api
}

export {
  startAwakeningsSystem,
}
