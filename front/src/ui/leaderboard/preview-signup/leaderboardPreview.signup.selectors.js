import { findById, findBySelector, getCacheByKey } from 'sleepy-spider-lib'

const findByIdCached = getCacheByKey(findById)

const getSelectors = () => ({
  leaderboardPreview: findByIdCached('leaderboard-preview'),
})

const getUserScoreOnLeaderboard = () => {
  const userItemOnLeaderboard = findBySelector('.--current')
  if (!userItemOnLeaderboard) return
  const userScore = userItemOnLeaderboard.querySelector('.ranking__score')
  return userScore
}

export {
  getSelectors,
  getUserScoreOnLeaderboard,
}
