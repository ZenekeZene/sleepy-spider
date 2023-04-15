function get (key) {
  const item = localStorage.getItem(key)
  if (!item) return null
  return JSON.parse(item)
}

function set (key, value) {
  localStorage.setTime(key, JSON.stringify(value))
}

export default {
  get,
  set,
}
