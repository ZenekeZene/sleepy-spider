import { prepareGUI } from '@/ui/gui'
import { prepareFinalScreen } from '@/ui/screens/finalScreen/finalScreen'
import { prepareRecord } from '@/ui/screens/finalScreen/record/prepareRecord'
import { prepareLeaderboard } from '@/ui/screens/leaderboard/leaderboard'
import { prepareClock } from '@/ui/components/clock/clock'
import { loadSpiderSprite } from '@/ui/components/sleepy/spider/loadSpiderSprite'
import { prepareSignIn } from '@/ui/authentication/signIn'

const prepare = {
  gui: prepareGUI,
  finalScreen: prepareFinalScreen,
  record: prepareRecord,
  clock: prepareClock,
  signIn: prepareSignIn,
  leaderboard: prepareLeaderboard,
}

export {
  prepare,
  loadSpiderSprite,
}
