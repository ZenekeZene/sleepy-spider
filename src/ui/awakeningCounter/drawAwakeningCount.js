import { listenEvent, findBySelector, findAllByClassName } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'

const cachedCounter = new CachedCounter()

const TOTAL_TEXT = `Let’s wake up a million times, and a surprise will happen. We wake `
export const COUNTER_CLASSNAME = 'counter'
const COUNTER_EFFECT_CLASSNAME = 'counter-effect'

const updateDescription = () => {
  const value = cachedCounter.value
  const description = `${TOTAL_TEXT} ${value} times.`
  findBySelector('meta[name="description"]').setAttribute("content", description)
}

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
    updateDescription()
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
