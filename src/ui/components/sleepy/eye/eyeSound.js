import sound1 from '@/ui/assets/sounds/sound.mp3'
import sound2 from '@/ui/assets/sounds/sound2.mp3'

const audio = new Audio(sound1)
const audio2 = new Audio(sound2)

const playSound = (eye) => {
  const audioTarget = eye.isBigEye ? audio : audio2
  audioTarget.play()
}

export {
  playSound
}
