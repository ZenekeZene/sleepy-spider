import { listenEvent } from 'sleepy-spider-lib'
import { untilShowQuestionCounter } from '@/infra/awakening/untilShowQuestionCounter'
import { EVENTS } from '@/adapter'
import { getSnapshot } from '@/infra/services/database/getSnapshot'
import { setFieldOnDocument } from '@/infra/services/database/incrementField'
import { getInfraServices } from "@/infra/infra"
import { AwakeningStore } from '@/adapter/stores/awakening/awakening.store'
import { AuthStore } from '@/adapter/stores/authentication.store'

const awakeningStore = new AwakeningStore(0)
const { auth } = new AuthStore()

async function addAwakening (value, onChange, onShowQuestion) {
  awakeningStore.increment(value)
  onChange(value)
  if (!untilShowQuestionCounter.isLimitReachedByValue(value)) return
  onShowQuestion()
}

async function getAwakeningsOfUser () {
  if (!auth.isLogged) return Promise.reject('User not logged')
  const { database } = getInfraServices()
  const snapshot = await getSnapshot({ database, documentId: 'awakenings', userUid: auth.user.uid })
  const awakenings = snapshot.data?.value || 0
  return { ...snapshot, awakenings }
}

function updateAwakeningsOfUser (props) {
  setFieldOnDocument({ ...props, value: awakeningStore.value })
}

async function handleEndTimer () {
  if (auth.isLogged) {
    const { existsDocument, documentRef, awakenings } = await getAwakeningsOfUser()
    if (existsDocument && awakenings >= awakeningStore.value) return
    updateAwakeningsOfUser({ user: auth.user, existsDocument, documentRef })
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
