import { untilShowQuestionCounter } from '@/infra/awakening/untilShowQuestionCounter'
import { getSnapshot } from '@/infra/services/database/getSnapshot'
import { setFieldOnDocument } from '@/infra/services/database/incrementField'
import { stores } from '@/adapter'

const awakeningStore = stores.awakening

async function addAwakening (value, onChange, onShowQuestion) {
  awakeningStore.increment(value)
  onChange(value)
  if (!untilShowQuestionCounter.isLimitReachedByValue(value)) return
  onShowQuestion()
}

function startAwakeningsSystem (props) {
  if (!props?.onChange) throw new Error('Error with unknown callback onChange.')
  if (!props?.onShowQuestion) throw new Error('Error with unknown callback onShowQuestion.')

  return (value = 1) => addAwakening(value, props.onChange, props.onShowQuestion)
}

export async function getAwakeningsOfUser () {
  const { isLogged, user } = stores.auth
  if (!isLogged) return Promise.reject('User not logged')
  const snapshot = await getSnapshot({ userUid: user.uid })
  const awakenings = snapshot.data?.value || 0
  return { ...snapshot, awakenings }
}

function updateAwakeningsOfUser (props) {
	const awakeningStore = stores.awakening
  setFieldOnDocument({ ...props, value: awakeningStore.value })
}

async function updateAwakenings () {
	const awakeningStore = stores.awakening
  const { isLogged, user } = stores.auth
  if (!isLogged) return
  const { existsDocument, documentRef, awakenings } = await getAwakeningsOfUser()
  if (existsDocument && awakenings >= awakeningStore.value) {
		return
	}
  updateAwakeningsOfUser({ user, existsDocument, documentRef })
}

export {
  startAwakeningsSystem,
	updateAwakenings,

}
