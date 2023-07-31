import { findById, getCacheByKey } from 'sleepy-spider-lib'

const findByIdCached = getCacheByKey(findById)

const getLeaderboardSelectors = () => ({
  leaderboardScreen: findByIdCached('leaderboard-screen'),
  ranking: findByIdCached('leaderboard-ranking'),
  podium: findByIdCached('leaderboard-podium'),
  closeButton: findByIdCached('leaderboard-close-button'),
})

export {
  getLeaderboardSelectors,
}
