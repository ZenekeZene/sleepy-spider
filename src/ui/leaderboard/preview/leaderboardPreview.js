import { getLeaderboard } from '@/infra/leaderboard/leaderboard.repository'
import { showRanking } from '@/ui/leaderboard/ranking/ranking'
import { getSelectors as $el, getUserScoreOnLeaderboard } from "./leaderboardPreview.selectors"
import './leaderboardPreview.css'

const createPreviewRanking = async (user) => {
  const { leaderboardPreview } = $el()
  const rankingWithTopThree = await getLeaderboard({ user, limit: 5 })
  showRanking({ players: rankingWithTopThree, wrapper: leaderboardPreview })
}

const updatePreviewRanking = (finalScore) => {
  getUserScoreOnLeaderboard().textContent = finalScore
}

export {
  createPreviewRanking,
  updatePreviewRanking,
}
