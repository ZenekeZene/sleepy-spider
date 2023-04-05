import { onSnapshot } from 'firebase/firestore'
import { incrementFieldOnDocument } from '@/infra/services/database/incrementField'
import { getSnapshot } from '@/infra/services/database/getSnapshot'
import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'
import { untilShowQuestionCounter } from '@/infra/awakening/untilShowQuestionCounter'

let clicksSinceTheLastUpdate = 0
const cachedCounter = new CachedCounter(0)
const INTERVAL_TO_UPDATE_IN_MS = 10000
const DOCUMENT = 'awakenings'

async function getTotalAwakenings ({ userUid, database }) {
  const { data } = await getSnapshot({ database, documentId: DOCUMENT, userUid })
  return data?.value || 0
}

async function addAwakening (value, onChange, onShowQuestion) {
  clicksSinceTheLastUpdate += value
  cachedCounter.increment(value)
  onChange(value)
  if (!untilShowQuestionCounter.isLimitReachedByValue(value)) return
  onShowQuestion()
}

async function syncClickCounter ({ database, user, userUid }) {
  if (clicksSinceTheLastUpdate <= 0) return
  const snapshot = await getSnapshot({ database, documentId: DOCUMENT, userUid })
  incrementFieldOnDocument({ value: clicksSinceTheLastUpdate, user, ...snapshot })
  clicksSinceTheLastUpdate = 0
}

function handleAwakeningUpdatesWithInterval (props) {
  const timerToUpdate = setInterval(async () => {
    syncClickCounter(props)
  }, INTERVAL_TO_UPDATE_IN_MS)
  return timerToUpdate
}

// async function listenAwakenings ({ userUid, database, callback }) {
  // const { documentRef } = await getSnapshot({ database, documentId: DOCUMENT, userUid })
  // const unsubcribe = onSnapshot(documentRef, (document) => {
    // const data = document.data() || { value: 0 }
    // callback(data)
  // })
  // return unsubcribe
// }

async function setInitialAwakenings ({ userUid, database, onChange }) {
  const initialAwakeningsValue = await getTotalAwakenings({ userUid, database })
  cachedCounter.update(initialAwakeningsValue)
  onChange(initialAwakeningsValue)
}

async function listenUnload (props) {
  window.onbeforeunload = async function (event) {
    event.preventDefault()
    await syncClickCounter(props)
  }
}

async function setUser ({ user, database, onChange }) {
  let userUid = user.uid

  // listenUnload({ user, userUid, database })
  // setInitialAwakenings({ userUid, database, onChange })
  // handleAwakeningUpdatesWithInterval({ userUid, user, database })

  // listenAwakenings({ userUid, database, callback: ({ value }) => {
    // cachedCounter.update(value)
    // onChange(value)
  // }})
}

async function startAwakeningsSystem (props) {
  if (!props?.database) throw new Error('Error with unknown database.')
  if (!props?.onChange) throw new Error('Error with unknown callback onChange.')
  if (!props?.onShowQuestion) throw new Error('Error with unknown callback onShowQuestion.')

  return {
    addAwakening: (value = 1) => addAwakening(value, props.onChange, props.onShowQuestion),
    setUser: (user) => setUser({ user, ...props }),
  }
}

export {
  startAwakeningsSystem,
}
