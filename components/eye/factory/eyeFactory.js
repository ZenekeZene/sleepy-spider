import load from 'load-asset'
import Spritesheet from '../../../lib/spritesheet/spritesheet'
import createEyesInCircleShape from './eyeFactory.circle'
import createEyesInSquareShape from './eyeFactory.square'

const createEyes = async (props) => {
  const { params } = props
  const image = await load('/sprites/eye/eye-spritesheet.png')
  const sprite = new Spritesheet(10, 1, image)

  let eyes
  if (params.shape === 'square') {
    eyes = createEyesInSquareShape({ ...props, sprite })
  } else if (params.shape === 'circle') {
    eyes = createEyesInCircleShape({ ...props, sprite })
  }
  return eyes
}

export default createEyes
