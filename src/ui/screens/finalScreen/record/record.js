import { findById } from "sleepy-spider-lib"
import * as localstorage from '@/infra/localstorage/localstorage'

const RECORD_KEY = 'record'

function updateRecord ({ finalScore, record }) {
  if (finalScore < record) return
  localstorage.set(RECORD_KEY, finalScore)
}

function showRecord(record) {
  const recordMessageElement = findById('record-message')
  const recordMessageValue = findById('record-message-value')
  if (!recordMessageElement || !recordMessageValue) return
  recordMessageElement.classList.add('visible')
  recordMessageValue.textContent = record
}

function handlePersonalLocalRecord (finalScore) {
  const record = localstorage.get(RECORD_KEY)
  showRecord(Math.max(finalScore, record))
  updateRecord({ finalScore, record })
}

export {
  handlePersonalLocalRecord,
}
