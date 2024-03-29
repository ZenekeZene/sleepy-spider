import { findById, Spritesheet } from 'sleepy-spider-lib'
import { SHAPES } from '@/domain/settings'
import createEyesInCircleShape from './eyeFactory.circle'
import createEyesInSquareShape from './eyeFactory.square'

const url = new URL('/sprites/eye/eye-spritesheet2.webp', import.meta.url).href
const NUM_FRAMES = 10
const SIZE = 3000
let eyesCanvas = findById('eyes')
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
  eyesCanvas.remove()
}

const createEyesCanvas = () => {
  removeEyesCanvas()
  const spiderElement = findById('spider')
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
