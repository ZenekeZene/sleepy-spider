function dispatchEvent (eventName, payload) {
  if (typeof eventName !== 'string') {
    throw new Error('Event name must be a string')
  }
  const event = new CustomEvent(eventName, { detail: payload })
  document.dispatchEvent(event)
}

function listenEvent (eventName, callback) {
  if (typeof eventName !== 'string') {
    throw new Error('Event name must be a string')
  }
  document.addEventListener(eventName, callback)
}

export {
  dispatchEvent,
  listenEvent,
}
