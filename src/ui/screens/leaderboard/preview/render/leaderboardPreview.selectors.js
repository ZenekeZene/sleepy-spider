import { findById, getCacheByKey } from 'sleepy-spider-lib'

const findByIdCached = getCacheByKey(findById)

const getLeaderboardPreviewSelectors = () => ({
  finalScreen: findByIdCached('final-screen'),
  leaderboardPreview: findByIdCached('leaderboard-preview'),
  signInButton: findByIdCached('leaderboard-preview-signup'),
})

export {
  getLeaderboardPreviewSelectors,
}
