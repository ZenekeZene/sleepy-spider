function sortRandomly (array) {
  if (!Array.isArray(array)) throw new TypeError('Input are not an array')
  return array.sort(() => Math.random() - 0.5)
}

export {
  sortRandomly,
}
