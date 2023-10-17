import { getLeaderboard } from '@/infra/leaderboard/leaderboard.repository'
import { showRanking, showSkeletonRanking } from '@/ui/leaderboard/ranking/ranking'
import { getSelectors as $el, getUserScoreOnLeaderboard } from "./leaderboardPreview.selectors"
import './leaderboardPreview.css'

const NUM_PLAYERS = 5

const createPreviewRanking = async () => {
  const { leaderboardPreview } = $el()
  showSkeletonRanking({ numPlayers: NUM_PLAYERS, wrapper: leaderboardPreview })
  const players = await getLeaderboard({ limit: NUM_PLAYERS })
  showRanking({ players, wrapper: leaderboardPreview })
}

const updatePreviewRanking = async (finalScore) => {
  const userScore = getUserScoreOnLeaderboard()
  if (!userScore) return
  userScore.textContent = finalScore
}

export {
  createPreviewRanking,
  updatePreviewRanking,
}
