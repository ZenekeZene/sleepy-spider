import Spritesheet from '../../lib/spritesheet/spritesheet'
import Spider from './spider'

const url = new URL('../../assets/sprites/spider/spider-spritesheet.png', import.meta.url).href
const NUM_FRAMES = 5

const createSpider = async (props) =>
  new Promise((resolve, reject) => {
    const { context, canvas } = props
    const image = new Image()
    image.src = url

    try {
      const onload = () => {
        const sprite = new Spritesheet(NUM_FRAMES, 1, image)
        const { frameWidth, frameHeight } = sprite

        const x = (canvas.width / 2) - (frameWidth / 2)
        const y = (canvas.height / 2) - (frameHeight / 2)

        context.clearRect(0, 0, canvas.width, canvas.height)
        const spider = new Spider({ sprite, context, canvas, frame: 0, x, y })
        spider.play()
        resolve(spider)
      }

      image.onload = onload
    } catch (error) {
      console.error(error)
      reject(new Error('Error loading the image', error))
    }
  })

export default createSpider
