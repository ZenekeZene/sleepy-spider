import { prepareGUI } from '@/ui/gui'
import { prepareFinalScreen } from '@/ui/screens/finalScreen/finalScreen'
import { prepareRecord } from '@/ui/screens/finalScreen/record/prepareRecord'
import { prepareLeaderboard } from '@/ui/screens/leaderboard/leaderboard'
import { prepareClock } from '@/ui/components/clock/clock'
import { prepareSignIn } from '@/ui/authentication/signIn'
import { prepareTabControl } from '@/ui/components/tabControl/tabControl'
import { prepareNoInternet } from '@/ui/components/noInternet/noInternet'
import { prepareColors } from '@/ui/colors'

const sections = [
  prepareGUI,
  prepareFinalScreen,
  prepareRecord,
  prepareClock,
  prepareSignIn,
  prepareLeaderboard,
  prepareTabControl,
  prepareNoInternet,
  prepareColors,
]

const prepareSections = () => {
  sections.forEach(section => section())
}

export {
  prepareSections,
}
