const EVENT_NAME = 'firstClick'

function dispatchFirstClickEvent() {
  const event = new Event(EVENT_NAME)
  document.dispatchEvent(event)
}

let isFirstClick = false

function listenFirstClick() {
  document.addEventListener('click', async () => {
    if (isFirstClick) return
    isFirstClick = true
    dispatchFirstClickEvent()
  })
}

export {
  listenFirstClick,
}
