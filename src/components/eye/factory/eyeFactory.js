import { SHAPES } from '../../../settings/settings'
import Spritesheet from '../../../lib/animation/spritesheet/spritesheet'
import createEyesInCircleShape from './eyeFactory.circle'
import createEyesInSquareShape from './eyeFactory.square'

const url = new URL('../../../assets/sprites/eye/eye-spritesheet.png', import.meta.url).href
const NUM_FRAMES = 10
const SIZE = 3000
let eyesCanvas = document.getElementById('eyes')
let eyesContext = eyesCanvas.getContext('2d')

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

const removeEyesCanvas = () => {
  document.getElementById('eyes').remove()
}

const createEyesCanvas = () => {
  removeEyesCanvas()
  const spiderElement = document.getElementById('spider')
  eyesCanvas = document.createElement('canvas')
  eyesCanvas.width = SIZE
  eyesCanvas.height = SIZE
  eyesCanvas.id = 'eyes'
  eyesCanvas.className = 'eyes'
  spiderElement.append(eyesCanvas)
  eyesContext = eyesCanvas.getContext('2d')

  return {
    canvas: eyesCanvas,
    context: eyesContext,
  }
}


export {
  createEyes,
  createEyesCanvas,
}
