import { listenEvent, classHelper as $class } from "sleepy-spider-lib"
import { getLeaderboard } from '@/infra/leaderboard/leaderboard.repository'
import { EVENTS } from "@/adapter"
import { HIDDEN_CLASS } from '@/ui/constants'
import { showRanking, showSkeletonRanking } from '@/ui/leaderboard/ranking/ranking'
import * as Ranking from "@/ui/leaderboard/ranking/ranking.create"
import { showPodium } from '@/ui/leaderboard/podium/podium'
import { getLeaderboardSelectors as $el } from "./leaderboard.selectors"
import './leaderboard.css'

const createPodium = (players) => {
  const { podium } = $el()
  showPodium({ players, wrapper: podium })
}

const createRanking = (players) => {
  const { ranking } = $el()
  showRanking({ players, wrapper: ranking })
}

const showLeaderboard = async ({ user, limit }) => {
  const players = await getLeaderboard({ user, limit })
  createPodium(players.slice(0, 3))
  createRanking(players.slice(3))
}

const handleCloseScreen = () => {
  const { leaderboardScreen } = $el()
  $class.add(leaderboardScreen, HIDDEN_CLASS)
}

const handleOpenScreen = async (detail) => {
  const { leaderboardScreen, closeButton, ranking } = $el()
  const { user } = detail
  const removeSkeletonRanking = showSkeletonRanking({ numPlayers: 5, wrapper: ranking })
  Ranking.createLoading({ wrapper: ranking })
  await showLeaderboard({ user, limit: 10 })
  removeSkeletonRanking({ wrapper: ranking })
  $class.remove(leaderboardScreen, HIDDEN_CLASS)
  closeButton.addEventListener('click', handleCloseScreen)
}

const listenLeaderboard = () => {
  listenEvent(EVENTS.GO_TO_LEADERBOARD, async ({ detail }) => {
    await handleOpenScreen(detail)
  })
}

const prepareLeaderboard = () => {
  listenLeaderboard()
}

export {
  prepareLeaderboard,
}
