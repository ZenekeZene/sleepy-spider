import { delay } from "sleepy-spider-lib"
import { getLeaderboard } from '@/infra/leaderboard/leaderboard.repository'
import { prependRanking, showSkeletonRanking, removeSkeletonRanking } from '@/ui/leaderboard/ranking/ranking'
import { getSelectors as $el, getUserScoreOnLeaderboard } from "./leaderboardPreview.signup.selectors"

const createSignUpRanking = async () => {
  const { leaderboardPreview } = $el()
  showSkeletonRanking({ numPlayers: 3, wrapper: leaderboardPreview })
  const rankingWithTopThree = await getLeaderboard({ user: null, limit: 3 })
  removeSkeletonRanking({ wrapper: leaderboardPreview })
  prependRanking({ players: rankingWithTopThree, wrapper: leaderboardPreview })
}

const updateSignUpRanking = (finalScore) => {
  const userScore = getUserScoreOnLeaderboard()
  userScore.textContent = finalScore
}

export {
  createSignUpRanking,
  updateSignUpRanking,
}
