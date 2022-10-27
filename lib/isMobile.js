export default function isMobile () {
  return "ontouchstart" in document.documentElement
}
