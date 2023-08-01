import { classHelper as $class, findById, findAllByClassName, dispatchEvent } from "sleepy-spider-lib"
import { EVENTS } from '@/adapter'
import * as localstorage from '@/infra/localstorage/localstorage'
import { VISIBLE_CLASS } from '@/ui/constants'

const RECORD_KEY = 'record'
const RECORD_MESSAGE_ID = 'record-message'
const RECORD_COUNTER_CLASSNAME = 'record-counter'

function updateRecord (lastScore, localScore) {
  if (lastScore <= localScore) return
  localstorage.set(RECORD_KEY, lastScore)
  if (!localScore) return
  dispatchEvent(EVENTS.NEW_RECORD)
}

function showRecord(record) {
  const recordMessageElement = findById(RECORD_MESSAGE_ID)
  const recordCounters = findAllByClassName(RECORD_COUNTER_CLASSNAME)
  if (!recordMessageElement || !recordCounters.length) return
  $class.add(recordMessageElement, VISIBLE_CLASS)
  Array.from(recordCounters).forEach((counter) => {
    counter.textContent = Number(record).toLocaleString()
  })
}

function handlePersonalLocalRecord (lastScore) {
  const localRecord = localstorage.get(RECORD_KEY)
  showRecord(Math.max(lastScore, localRecord))
  updateRecord(lastScore, localRecord)
}

function removePersonalLocalRecord () {
  localstorage.remove(RECORD_KEY)
}

export {
  handlePersonalLocalRecord,
  removePersonalLocalRecord,
}
