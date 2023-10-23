import { stores } from '@/adapter'

async function addAwakening (value, onChange, onShowQuestion) {
	const awakeningStore = stores.awakening
  awakeningStore.increment(value)
	const questionCounter = stores.questionCounter

  onChange(value)
  if (!questionCounter.isLimitReachedByValue(value)) return
  onShowQuestion()
}

function startAwakeningsSystem (props) {
  if (!props?.onChange) throw new Error('Error with unknown callback onChange.')
  if (!props?.onShowQuestion) throw new Error('Error with unknown callback onShowQuestion.')

  return (value = 1) => addAwakening(value, props.onChange, props.onShowQuestion)
}

export {
  startAwakeningsSystem,
}
