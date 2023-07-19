import { listenEvent, findAllByClassName, classHelper as $class, delay } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { AwakeningStore } from '@/adapter/stores/awakening/awakening.store'

export const COUNTER_CLASSNAME = 'counter'
const COUNTER_EFFECT_CLASSNAME = 'counter-effect'

const updateAwakeningsCounter = () => {
  const { value } = new AwakeningStore()
  const counters = findAllByClassName(COUNTER_CLASSNAME)
  Array.from(counters).forEach(async (counter) => {
    $class.toggle(counter, COUNTER_EFFECT_CLASSNAME)
    await delay(250)
    $class.toggle(counter, COUNTER_EFFECT_CLASSNAME)
    counter.textContent = Number(value).toLocaleString()
  })
}

const listenAnsweredCorrect = () => {
  const awakeningStore = new AwakeningStore(0)
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
