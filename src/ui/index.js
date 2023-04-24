import { prepareGUI } from '@/ui/gui'
import { prepareFinalScreen } from '@/ui/screens/finalScreen/finalScreen'
import { prepareClock } from '@/ui/components/clock/clock'
import { loadSpiderSprite } from '@/ui/components/sleepy/spider/loadSpiderSprite'
import { prepareSignIn } from '@/ui/authentication/signIn'

const prepare = {
  gui: prepareGUI,
  finalScreen: prepareFinalScreen,
  clock: prepareClock,
  signIn: prepareSignIn,
}

export {
  prepare,
  loadSpiderSprite,
}
