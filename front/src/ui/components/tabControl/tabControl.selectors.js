import { findById, findAllBySelector, getCacheByKey } from 'sleepy-spider-lib'

const findByIdCached = getCacheByKey(findById)
const findBySelectorCached = getCacheByKey(findAllBySelector)

const getSelectors = () => ({
  spider: findByIdCached('spider-wrapper'),
  inactiveTabModal: findByIdCached('inactive-tab-modal'),
  playAgainButton: findByIdCached('ups-play-again'),
  triggers: findBySelectorCached('.inactive-tab-modal-trigger'),
})

export {
  getSelectors,
}
