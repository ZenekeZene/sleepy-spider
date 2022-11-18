const TOTAL_TEXT = `Let’s wake up a million times, and a surprise will happen. We wake `

const updateDescription = (value) => {
  const description = `${TOTAL_TEXT} ${value} times.`
  document.querySelector('meta[name="description"]').setAttribute("content", description)
}

const updateCounters = (value) => {
  const counters = document.getElementsByClassName('counter')
  Array.from(counters).forEach((counter) => counter.textContent = value)
  return counters
}

const updateAwakeningsCounter = (value) => {
  updateCounters(value)
  updateDescription(value)
}

const updateAwakeningsCachedCounter = (value) => {
  const counters = document.getElementsByClassName('counter')
  const total = Number(counters[0].textContent) + Number(value)
  updateCounters(total)
  updateDescription(total)
}

export {
  updateAwakeningsCounter,
  updateAwakeningsCachedCounter,
}
