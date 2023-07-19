import { listenEvent, findAllByClassName, classHelper as $class, delay } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'

export const COUNTER_CLASSNAME = 'counter'
const COUNTER_EFFECT_CLASSNAME = 'counter-effect'

const updateAwakeningsCounter = () => {
  const { value } = new CachedCounter()
  const counters = findAllByClassName(COUNTER_CLASSNAME)
  Array.from(counters).forEach(async (counter) => {
    $class.toggle(counter, COUNTER_EFFECT_CLASSNAME)
    await delay(250)
    $class.toggle(counter, COUNTER_EFFECT_CLASSNAME)
    counter.textContent = Number(value).toLocaleString()
  })
}

const listenAnsweredCorrect = () => {
  const awakeningStore = new CachedCounter(0)
  listenEvent(EVENTS.ANSWERED_CORRECT, (event) => {
    const { value } = event.detail
    awakeningStore.increment(value)
    updateAwakeningsCounter()
  })
}

export {
  listenAnsweredCorrect,
  updateAwakeningsCounter,
}
