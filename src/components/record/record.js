import { findById } from "@/lib"
import localstorage from '@/infra/localstorage/localstorage'

const RECORD_KEY = 'record'

function handlePersonalLocalRecord (finalScore) {
  const record = localstorage.get(RECORD_KEY)
  const recordElement = findById('record')
  if (!recordElement) return

  if (record) {
    findById('record-message').classList.add('visible')
    recordElement.textContent = record
  }

  if (finalScore > record) {
    localstorage.set(RECORD_KEY, finalScore)
    recordElement.textContent = finalScore
  }
}

export {
  handlePersonalLocalRecord,
}
