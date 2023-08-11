function isMobile () {
  return "ontouchstart" in document.documentElement
}

export {
  isMobile,
}
