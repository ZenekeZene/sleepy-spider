import { classHelper as $class, findById, findAllByClassName } from "sleepy-spider-lib"
import { stores } from '@/adapter'
import { HIDDEN_CLASS } from '@/ui/constants'

const RECORD_MESSAGE_ID = 'record-message'
const RECORD_COUNTER_CLASSNAME = 'record-counter'

function updateRecordMessages(record) {
  const recordMessageElement = findById(RECORD_MESSAGE_ID)
  const recordCounters = findAllByClassName(RECORD_COUNTER_CLASSNAME)
  if (!recordMessageElement || !recordCounters.length) return

	if (stores.auth.isLogged) {
  	$class.remove(recordMessageElement, HIDDEN_CLASS)
	}

  Array.from(recordCounters).forEach((counter) => {
    counter.textContent = Number(record).toLocaleString()
  })
}

export {
  updateRecordMessages,
}
