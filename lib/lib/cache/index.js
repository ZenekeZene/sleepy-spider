const getCacheByKey = (cb, isDebug = false) => {
  const cache = {}
  const doCache = (key) => {
    if (!cache[key]) {
      isDebug && console.log('cache miss', key)
      cache[key] = cb(key)
      return cache[key]
    }
    isDebug && console.log('cache hit', key)
    return cache[key]
  }
  return doCache
}

export { getCacheByKey }

