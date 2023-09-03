import { getLeaderboard } from '@/infra/leaderboard/leaderboard.repository'
import { prependRanking, showSkeletonRanking } from '@/ui/leaderboard/ranking/ranking'
import { getSelectors as $el, getUserScoreOnLeaderboard } from "./leaderboardPreview.signup.selectors"

const NUM_PLAYERS = 3

const createSignUpRanking = async () => {
  const { leaderboardPreview } = $el()
  const removeSkeletonRanking = await showSkeletonRanking({ numPlayers: NUM_PLAYERS, wrapper: leaderboardPreview })
  const rankingWithTopThree = await getLeaderboard({ user: null, limit: NUM_PLAYERS })
  removeSkeletonRanking({ wrapper: leaderboardPreview })
  prependRanking({ players: rankingWithTopThree, wrapper: leaderboardPreview })
}

const updateSignUpRanking = (finalScore) => {
  const userScore = getUserScoreOnLeaderboard()
  if (!userScore) return
  userScore.textContent = finalScore
}

export {
  createSignUpRanking,
  updateSignUpRanking,
}
