import load from 'load-asset'
import Spritesheet from '../../lib/spritesheet/spritesheet'
import Spider from './spider'

const createSpider = async (props) => {
  const { context, canvas } = props
  const image = await load('../sprites/spider/spider-spritesheet.png')
  const sprite = new Spritesheet(9, 1, image)

  const { frameWidth, frameHeight } = sprite

  const x = (canvas.width / 2) - (frameWidth / 2)
  const y = (canvas.height / 2) - (frameHeight / 2)

  context.clearRect(0, 0, canvas.width, canvas.height)
  const spider = new Spider({ sprite, context, canvas, frame: 0, x, y })
  spider.play()
  return spider
}

export default createSpider
