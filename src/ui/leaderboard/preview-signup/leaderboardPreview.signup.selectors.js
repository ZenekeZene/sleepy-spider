import { findById, getCacheByKey } from 'sleepy-spider-lib'

const findByIdCached = getCacheByKey(findById)

const getSelectors = () => ({
  leaderboardPreview: findByIdCached('leaderboard-preview'),
})

export {
  getSelectors,
}
