import { prepareGUI } from '@/ui/gui'
import { prepareFinalScreen } from '@/ui/screens/finalScreen/finalScreen'
import { prepareClock } from '@/ui/components/clock/clock'
import { loadSpiderSprite } from '@/ui/components/sleepy/spider/loadSpiderSprite'

const prepare = {
  gui: prepareGUI,
  finalScreen: prepareFinalScreen,
  clock: prepareClock
}

export {
  prepare,
  loadSpiderSprite,
}
