import { findById, getCacheByKey } from 'sleepy-spider-lib'

const findByIdCached = getCacheByKey(findById)

const getSignInSelectors = () => ({
  title: findByIdCached('title'),
  userTitle: findByIdCached('user-title'),
  leaderboardButton: findByIdCached('go-leaderboard'),
})

export {
  getSignInSelectors,
}
