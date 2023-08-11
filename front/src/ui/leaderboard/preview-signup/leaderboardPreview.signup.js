import { getLeaderboard } from '@/infra/leaderboard/leaderboard.repository'
import { prependRanking } from '@/ui/leaderboard/ranking/ranking'
import { getSelectors as $el, getUserScoreOnLeaderboard } from "./leaderboardPreview.signup.selectors"

const createSignUpRanking = async () => {
  const { leaderboardPreview } = $el()
  const rankingWithTopThree = await getLeaderboard({ user: null, limit: 3 })
  prependRanking({ players: rankingWithTopThree, wrapper: leaderboardPreview })
}

const updateSignUpRanking = (finalScore) => {
  getUserScoreOnLeaderboard().textContent = finalScore
}

export {
  createSignUpRanking,
  updateSignUpRanking,
}
