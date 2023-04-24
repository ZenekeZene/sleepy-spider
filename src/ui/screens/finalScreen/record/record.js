import { classHelper as $class, findById, findAllByClassName } from "sleepy-spider-lib"
import { VISIBLE_CLASS } from '@/ui/constants'
import * as localstorage from '@/infra/localstorage/localstorage'

const RECORD_KEY = 'record'
const RECORD_MESSAGE_ID = 'record-message'
const RECORD_COUNTER_CLASSNAME = 'record-counter'

function updateRecord ({ finalScore, record }) {
  if (finalScore < record) return
  localstorage.set(RECORD_KEY, finalScore)
}

function showRecord(record) {
  const recordMessageElement = findById(RECORD_MESSAGE_ID)
  const recordCounters = findAllByClassName(RECORD_COUNTER_CLASSNAME)
  if (!recordMessageElement || !recordCounters.length || !recordMessageElement) return
  $class.add(recordMessageElement, VISIBLE_CLASS)
  Array.from(recordCounters).forEach(async (counter) => {
    counter.textContent = Number(record).toLocaleString()
  })
}

function handlePersonalLocalRecord (finalScore) {
  const record = localstorage.get(RECORD_KEY)
  showRecord(Math.max(finalScore, record))
  updateRecord({ finalScore, record })
}

export {
  handlePersonalLocalRecord,
}
