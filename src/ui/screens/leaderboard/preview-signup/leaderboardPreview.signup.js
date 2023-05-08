import { getLeaderboard } from '@/infra/leaderboard/leaderboard.repository'
import { showRanking, prependRanking } from '@/ui/components/ranking/ranking'
import { getSelectors as $el } from "./leaderboardPreview.signup.selectors"

const createSignUpRanking = async () => {
  const { leaderboardPreview } = $el()
  const rankingWithTopThree = await getLeaderboard({ user: null, limit: 3 })
  prependRanking({ players: rankingWithTopThree, wrapper: leaderboardPreview })
}

const createPreviewRanking = async (user) => {
  const { leaderboardPreview } = $el()
  const rankingWithTopThree = await getLeaderboard({ user, limit: 5 })
  showRanking({ players: rankingWithTopThree, wrapper: leaderboardPreview })
}

export {
  createSignUpRanking,
  createPreviewRanking,
}
