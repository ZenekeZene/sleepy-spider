import {
  findAllByClassName,
  findById,
  getCacheByKey,
} from 'sleepy-spider-lib'

const findByIdCached = getCacheByKey(findById)

const getSelectors = () => ({
  mobileTitle: findById('title-mobile'),
  hidesAuto: findAllByClassName('hide-auto'),
  userCounter: findById('user-counter'),
  infoIconWrapper: findById('info-icon-wrapper'),
  infoIcon: findById('info-icon'),
  clock: findById('clock'),
  sponsor: findByIdCached('sponsor'),
})

export {
  getSelectors,
}
