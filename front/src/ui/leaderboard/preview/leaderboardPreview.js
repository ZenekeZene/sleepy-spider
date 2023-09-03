import { getLeaderboard } from '@/infra/leaderboard/leaderboard.repository'
import { showRanking, showSkeletonRanking } from '@/ui/leaderboard/ranking/ranking'
import { getSelectors as $el, getUserScoreOnLeaderboard } from "./leaderboardPreview.selectors"
import './leaderboardPreview.css'

const createPreviewRanking = async (user) => {
  const { leaderboardPreview } = $el()
  showSkeletonRanking({ numPlayers: 3, wrapper: leaderboardPreview })
  const players = await getLeaderboard({ user, limit: 5 })
  showRanking({ players, user, wrapper: leaderboardPreview })
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
