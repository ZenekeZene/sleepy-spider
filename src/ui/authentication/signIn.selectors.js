import { findById, getCacheByKey } from 'sleepy-spider-lib'

const findByIdCached = getCacheByKey(findById)

const getSelectors = () => ({
  title: findByIdCached('title'),
  userTitle: findByIdCached('user-title'),
  finalScreen: findByIdCached('final-screen'),
  leaderboardPreview: findByIdCached('leaderboard-preview'),
  signInButton: findByIdCached('leaderboard-preview-signup'),
  goToLeaderboardButton: findByIdCached('go-leaderboard'),
  leaderboardScreen: findByIdCached('leaderboard-screen'),
})

export {
  getSelectors,
}
