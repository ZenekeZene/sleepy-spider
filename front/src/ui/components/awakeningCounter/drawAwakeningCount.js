import { listenEvent, findAllByClassName, classHelper as $class, delay } from 'sleepy-spider-lib'
import { EVENTS, stores } from '@/adapter'

export const COUNTER_CLASSNAME = 'counter'
const COUNTER_EFFECT_CLASSNAME = 'counter-effect'

const updateAwakeningsCounter = async () => {
  const { value } = stores.awakening;
  const counters = findAllByClassName(COUNTER_CLASSNAME);

  for (const counter of counters) {
    $class.toggle(counter, COUNTER_EFFECT_CLASSNAME);
    await delay(250);
    $class.toggle(counter, COUNTER_EFFECT_CLASSNAME);
    counter.textContent = Number(value).toLocaleString();
  }
};

const listenAnsweredCorrect = () => {
  const awakeningStore = stores.awakening
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
