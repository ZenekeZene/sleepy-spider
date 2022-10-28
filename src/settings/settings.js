const SHAPES = {
  CIRCLE: 'circle',
  SQUARE: 'square',
}

const params = {
  columns: 3,
  rows: 3,
  shape: SHAPES.SQUARE,
  totalEyesInCircle: 9,
  pupil: {
    color: '#f05',
    size: 0.1,
    minSize: 0.1,
    maxSize: 0.2,
    step: 0.05,
  },
  wave: false,
  sizeColision: 0.1,
  sound: false,
}

export default params

export {
  SHAPES
}
