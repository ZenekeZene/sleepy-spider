const url = new URL('../../../assets/sounds/bubble-sound2.mp3', import.meta.url).href
const url2 = new URL('../../../assets/sounds/bubble-sound3.mp3', import.meta.url).href

const audio = new Audio(url)
const audio2 = new Audio(url2)

const playSound = (eye) => {
  const audioTarget = eye.isBigEye ? audio : audio2
  audioTarget.play()
}

export {
  playSound
}
