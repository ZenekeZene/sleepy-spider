import { Spritesheet } from 'sleepy-spider-lib'
import Spider from '@/ui/components/sleepy/spider/spider.js'

const NUM_FRAMES = 5

const createSpiderBody = async (props) =>
  new Promise((resolve, reject) => {
    const { context, canvas } = props
    const { image, eyes } = props

    try {
      const sprite = new Spritesheet(NUM_FRAMES, 1, image)
      const { frameWidth, frameHeight } = sprite

      const x = (canvas.width / 2) - (frameWidth / 2)
      const y = (canvas.height / 2) - (frameHeight / 2)

      context.clearRect(0, 0, canvas.width, canvas.height)
      const spider = new Spider({ sprite, eyes,context, canvas, frame: 0, x, y })
      spider.play()
      resolve(spider)
    } catch (error) {
      console.error(error)
      reject(new Error('Error loading the image', error))
    }
  })

export {
  createSpiderBody,
}
