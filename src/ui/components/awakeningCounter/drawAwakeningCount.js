import { listenEvent, findAllByClassName, classHelper as $class, delay } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'

const cachedCounter = new CachedCounter()

export const COUNTER_CLASSNAME = 'counter'
const COUNTER_EFFECT_CLASSNAME = 'counter-effect'

const updateAwakeningsCounter = () => {
  const value = cachedCounter.value
  const counters = findAllByClassName(COUNTER_CLASSNAME)
  Array.from(counters).forEach(async (counter) => {
    $class.toggle(counter, COUNTER_EFFECT_CLASSNAME)
    await delay(250)
    $class.toggle(counter, COUNTER_EFFECT_CLASSNAME)
    counter.textContent = Number(value).toLocaleString()
  })
}

const listenAnsweredCorrect = () => {
  listenEvent(EVENTS.ANSWERED_CORRECT, (event) => {
    const { value } = event.detail
    cachedCounter.increment(value)
    updateAwakeningsCounter()
  })
}

export {
  listenAnsweredCorrect,
  updateAwakeningsCounter,
}
