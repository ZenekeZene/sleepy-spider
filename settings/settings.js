const SHAPES = {
  CIRCLE: 'circle',
  SQUARE: 'square',
}

const params = {
  columns: 5,
  rows: 5,
  shape: SHAPES.CIRCLE,
  totalEyesInCircle: 12,
  pupil: {
    color: '#f05',
    size: 0.1,
  },
  wave: false,
  sizeColision: 0.1,
  sound: false,
}

export default params

export {
  SHAPES
}
