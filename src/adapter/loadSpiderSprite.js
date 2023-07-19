const loadSpiderSprite = () => {
  return new Promise((resolve, reject) => {
    const url = new URL('/sprites/spider/spider-spritesheet.webp', import.meta.url).href
    const image = new Image()
    image.src = url
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
  })
}

export {
 loadSpiderSprite,
}
