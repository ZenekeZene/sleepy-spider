function get (key) {
  const item = localStorage.getItem(key)
  if (!item) return null
  return JSON.parse(item)
}

function set (key, value) {
  if (!key) throw new Error('key is required')
  if (!value) throw new Error('value is required')
  localStorage.setItem(key, JSON.stringify(value))
}

export {
  get,
  set,
}
