import { SHAPES } from '../../../settings/settings'
import Spritesheet from '../../../lib/spritesheet/spritesheet'
import createEyesInCircleShape from './eyeFactory.circle'
import createEyesInSquareShape from './eyeFactory.square'

const url = new URL('../../../sprites/eye/eye-spritesheet.png', import.meta.url).href
const NUM_FRAMES = 10

const createEyes = async (props) =>
  new Promise ((resolve, reject) => {
    const { params } = props
    const { shape } = params
    const image = new Image()
    image.src = url

    try {
      const onload = () => {
        const sprite = new Spritesheet(NUM_FRAMES, 1, image)
        let eyes
        if (shape === SHAPES.SQUARE) {
          eyes = createEyesInSquareShape({ ...props, sprite })
        } else if (shape === SHAPES.CIRCLE) {
          eyes = createEyesInCircleShape({ ...props, sprite })
        }
        resolve(eyes)
      }
      image.onload = onload
    } catch (error) {
      console.error(error)
      reject(new Error('Error loading the image', error))
    }
  })

export default createEyes
