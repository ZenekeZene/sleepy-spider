function loadSpiderSprite (onload) {
  const url = new URL('/sprites/spider/spider-spritesheet.webp', import.meta.url).href
  const spiderImage = new Image()
  spiderImage.src = url
  spiderImage.onload = () => {
    onload(spiderImage)
  }
}

export {
  loadSpiderSprite,
}
