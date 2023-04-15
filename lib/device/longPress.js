let timer
const touchduration = 800 // length of time we want the user to touch before we do something

const onlongtouch = (onLongPress) => {
  timer = null
  onLongPress()
}

const touchstart = (event, onLongPress) => {
  event.preventDefault()
  if (timer) return
  timer = setTimeout(() => {
    onlongtouch(onLongPress)
  }, touchduration)
}

const touchend = () => {
  // stops short touches from firing the event
  if (!timer) return
  clearTimeout(timer)
  timer = null
}

function handleLongTouch (onLongPress) {
  window.addEventListener("touchstart", (event) => {
    touchstart(event, onLongPress)
  }, false)
  window.addEventListener("touchend", touchend, false)
}

export {
  handleLongTouch,
}
