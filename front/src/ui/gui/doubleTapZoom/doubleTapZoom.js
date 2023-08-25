const handleDisableDoubleTapZoom = (event) => {
  event.preventDefault()
}

function enable() {
  document.removeEventListener('dblclick', handleDisableDoubleTapZoom, { passive: false })
}

function disable() {
  document.addEventListener('dblclick', handleDisableDoubleTapZoom, { passive: false })
}

export default {
  enable,
  disable,
}
