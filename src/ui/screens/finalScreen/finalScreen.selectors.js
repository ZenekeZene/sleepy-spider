import { findById, getCacheByKey, findAllBySelector } from 'sleepy-spider-lib'

const findByIdCached = getCacheByKey(findById, false)

const getFinalSelectors = () => ({
  finalScreen: findByIdCached('final-screen'),
  elementsToHide: findAllBySelector('.hide-on-final-screen'),
  score: findByIdCached('final-score'),
  playAgainButton: findByIdCached('play-again'),
  goToLeaderboardButton: findByIdCached('go-leaderboard'),
})

export {
  getFinalSelectors,
}
