const SHAPES = Object.freeze({
  CIRCLE: 'circle',
  SQUARE: 'square',
})

const params = {
  columns: 3,
  rows: 3,
  shape: SHAPES.SQUARE,
  totalEyesInCircle: 9,
  pupil: {
    color: '#b95377',
    size: 0.2,
    minSize: 0.1,
    maxSize: 0.2,
    step: 0.05,
  },
  wave: false,
  sizeColision: 0.1,
  sound: false,
}

export {
  params,
  SHAPES
}
