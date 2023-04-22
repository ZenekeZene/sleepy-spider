import { listenEvent, findAllByClassName } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'

const cachedCounter = new CachedCounter()

export const COUNTER_CLASSNAME = 'counter'
const COUNTER_EFFECT_CLASSNAME = 'counter-effect'

const updateCounters = () => {
  const value = cachedCounter.value
  const counters = findAllByClassName(COUNTER_CLASSNAME)
  Array.from(counters).forEach((counter) => {
    counter.classList.add(COUNTER_EFFECT_CLASSNAME)
    setTimeout(() => {
      counter.classList.remove(COUNTER_EFFECT_CLASSNAME)
    }, 250)
    counter.textContent = Number(value).toLocaleString()
  })
  return counters
}

const listenAnsweredCorrect = () => {
  listenEvent(EVENTS.ANSWERED_CORRECT, (event) => {
    const { value } = event.detail
    cachedCounter.increment(value)
    updateCounters()
  })
}

const updateAwakeningsCounter = () => {
  updateCounters()
  updateDescription()
}

export {
  listenAnsweredCorrect,
  updateAwakeningsCounter,
}
