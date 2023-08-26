import { delay } from "sleepy-spider-lib"
import { getLeaderboard } from '@/infra/leaderboard/leaderboard.repository'
import { showRanking, showSkeletonRanking } from '@/ui/leaderboard/ranking/ranking'
import { getSelectors as $el, getUserScoreOnLeaderboard } from "./leaderboardPreview.selectors"
import './leaderboardPreview.css'

const createPreviewRanking = async (user) => {
  const { leaderboardPreview } = $el()
  showSkeletonRanking({ numPlayers: 3, wrapper: leaderboardPreview })
  const players = await getLeaderboard({ user, limit: 5 })
  showRanking({ players, wrapper: leaderboardPreview })
}

const updatePreviewRanking = (finalScore) => {
  const userScore = getUserScoreOnLeaderboard()
  userScore.textContent = finalScore
}

export {
  createPreviewRanking,
  updatePreviewRanking,
}
