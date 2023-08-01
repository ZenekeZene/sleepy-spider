import { findById, getCacheByKey, findAllBySelector } from 'sleepy-spider-lib'

const findByIdCached = getCacheByKey(findById, false)

const getSelectors = () => ({
  finalScreen: findByIdCached('final-screen'),
  backdrop: findByIdCached('final-backdrop'),
  elementsToHide: findAllBySelector('.hide-on-final-screen'),
  score: findByIdCached('final-score'),
  playAgainButton: findByIdCached('play-again'),
  goToLeaderboardButton: findByIdCached('go-leaderboard'),
  previewRanking: findByIdCached('leaderboard-preview'),
  recordMessage: findByIdCached('record-message'),
})

export {
  getSelectors,
}
