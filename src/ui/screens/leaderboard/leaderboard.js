import { listenEvent, classHelper as $class } from "sleepy-spider-lib"
import { getLeaderboard } from '@/infra/leaderboard/leaderboard.repository'
import { EVENTS } from "@/adapter/events/events"
import { HIDDEN_CLASS } from '@/ui/constants'
import { showRanking } from '@/ui/leaderboard/ranking/ranking'
import { getLeaderboardSelectors as $el } from "./leaderboard.selectors"
import './leaderboard.css'

const createRanking = async (user) => {
  const { ranking } = $el()
  const players = await getLeaderboard({ user, limit: 20 })
  showRanking({ players, wrapper: ranking })
}

const handleCloseScreen = () => {
  const { leaderboardScreen } = $el()
  $class.add(leaderboardScreen, HIDDEN_CLASS)
}

const handleOpenScreen = (detail) => {
  const { leaderboardScreen, closeButton } = $el()
  const { user } = detail
  $class.remove(leaderboardScreen, HIDDEN_CLASS)
  createRanking(user)
  closeButton.addEventListener('click', handleCloseScreen)
}

const listenLeaderboard = () => {
  listenEvent(EVENTS.GO_TO_LEADERBOARD, async ({ detail }) => {
    handleOpenScreen(detail)
  })
}

const prepareLeaderboard = () => {
  listenLeaderboard()
}

export {
  prepareLeaderboard,
}
