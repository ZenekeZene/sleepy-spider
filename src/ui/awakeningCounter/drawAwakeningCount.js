import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'

const cachedCounter = new CachedCounter()

const TOTAL_TEXT = `Let’s wake up a million times, and a surprise will happen. We wake `
export const COUNTER_CLASSNAME = 'counter'
const COUNTER_EFFECT_CLASSNAME = 'counter-effect'

const updateDescription = () => {
  const value = cachedCounter.value
  const description = `${TOTAL_TEXT} ${value} times.`
  document.querySelector('meta[name="description"]').setAttribute("content", description)
}

const updateCounters = () => {
  const value = cachedCounter.value
  const counters = document.getElementsByClassName(COUNTER_CLASSNAME)
  Array.from(counters).forEach((counter) => {
    counter.classList.add(COUNTER_EFFECT_CLASSNAME)
    setTimeout(() => {
      counter.classList.remove(COUNTER_EFFECT_CLASSNAME)
    }, 250)
    counter.textContent = value
  })
  return counters
}

const updateAwakeningsCounter = () => {
  updateCounters()
  updateDescription()
}

export {
  updateAwakeningsCounter,
}
