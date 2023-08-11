import { findById, findAllBySelector, getCacheByKey } from 'sleepy-spider-lib'

const findByIdCached = getCacheByKey(findById)
const findBySelectorCached = getCacheByKey(findAllBySelector)

const getSelectors = () => ({
  noInternetModal: findByIdCached('no-internet-modal'),
  playAgainButton: findByIdCached('no-internet-play-again'),
  triggers: findBySelectorCached('.no-internet-modal-trigger'),
})

export {
  getSelectors,
}
