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

function remove (key) {
  if (!key) throw new Error('key is required')
  localStorage.removeItem(key)
}

export {
  get,
  set,
  remove,
}
