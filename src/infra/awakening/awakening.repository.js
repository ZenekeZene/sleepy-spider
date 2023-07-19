import { listenEvent } from 'sleepy-spider-lib'
import { untilShowQuestionCounter } from '@/infra/awakening/untilShowQuestionCounter'
import { EVENTS, stores } from '@/adapter'
import { getSnapshot } from '@/infra/services/database/getSnapshot'
import { setFieldOnDocument } from '@/infra/services/database/incrementField'

const awakeningStore = stores.awakening

async function addAwakening (value, onChange, onShowQuestion) {
  awakeningStore.increment(value)
  onChange(value)
  if (!untilShowQuestionCounter.isLimitReachedByValue(value)) return
  onShowQuestion()
}

async function getAwakeningsOfUser () {
  const { isLogged, user } = stores.auth
  if (!isLogged) return Promise.reject('User not logged')
  const snapshot = await getSnapshot({ documentId: 'awakenings', userUid: user.uid })
  const awakenings = snapshot.data?.value || 0
  return { ...snapshot, awakenings }
}

function updateAwakeningsOfUser (props) {
  setFieldOnDocument({ ...props, value: awakeningStore.value })
}

async function handleEndTimer () {
  const { isLogged, user } = stores.auth
  if (isLogged) {
    const { existsDocument, documentRef, awakenings } = await getAwakeningsOfUser()
    if (existsDocument && awakenings >= awakeningStore.value) return
    updateAwakeningsOfUser({ user, existsDocument, documentRef })
  } else {
    // Si no esta logeado...
  }
}

async function startAwakeningsSystem (props) {
  if (!props?.onChange) throw new Error('Error with unknown callback onChange.')
  if (!props?.onShowQuestion) throw new Error('Error with unknown callback onShowQuestion.')
  listenEvent(EVENTS.END_TIMER, handleEndTimer)

  return (value = 1) => addAwakening(value, props.onChange, props.onShowQuestion)
}

export {
  startAwakeningsSystem,
  getAwakeningsOfUser,
}
