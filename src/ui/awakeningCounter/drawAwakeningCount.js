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
  const valueParsed = value || 0
  const counters = document.getElementsByClassName('counter')
  let lastTest = counters[0].textContent || 0
  const lastNumber = Number(lastTest)
  const total = lastNumber + Number(valueParsed)
  updateCounters(total)
  updateDescription(total)
}

export {
  updateAwakeningsCounter,
  updateAwakeningsCachedCounter,
}
