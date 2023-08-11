function shuffle (array, seed = 0.5) {
  if (!Array.isArray(array)) throw new TypeError('Input are not an array')
  return array.sort(() => Math.random() - seed)
}

export {
  shuffle,
}
