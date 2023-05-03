import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'
import { untilShowQuestionCounter } from '@/infra/awakening/untilShowQuestionCounter'

const cachedCounter = new CachedCounter(0)

async function addAwakening (value, onChange, onShowQuestion) {
  cachedCounter.increment(value)
  onChange(value)
  if (!untilShowQuestionCounter.isLimitReachedByValue(value)) return
  onShowQuestion()
}

async function startAwakeningsSystem (props) {
  if (!props?.database) throw new Error('Error with unknown database.')
  if (!props?.onChange) throw new Error('Error with unknown callback onChange.')
  if (!props?.onShowQuestion) throw new Error('Error with unknown callback onShowQuestion.')

  return (value = 1) => addAwakening(value, props.onChange, props.onShowQuestion)
}

export {
  startAwakeningsSystem,
}
