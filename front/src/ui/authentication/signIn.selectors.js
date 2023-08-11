import { findById, findAllBySelector, getCacheByKey } from 'sleepy-spider-lib'

const findByIdCached = getCacheByKey(findById)

const getSelectors = () => ({
  title: findByIdCached('title'),
  userTitle: findByIdCached('user-title'),
  finalScreen: findByIdCached('final-screen'),
  leaderboardPreview: findByIdCached('leaderboard-preview'),
  signInButton: findByIdCached('leaderboard-preview-signup'),
  goToLeaderboardButton: findByIdCached('go-leaderboard'),
  leaderboardScreen: findByIdCached('leaderboard-screen'),
  errorWithSignIn: findByIdCached('error-with-sign-in-modal'),
  errorWithSignInTriggers: findAllBySelector('.error-with-sign-in-trigger'),
})

export {
  getSelectors,
}
