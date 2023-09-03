import {
  findAllByClassName,
  findById,
} from 'sleepy-spider-lib'

const getSelectors = () => ({
  mobileTitle: findById('title-mobile'),
  hidesAuto: findAllByClassName('hide-auto'),
  userCounter: findById('user-counter'),
  infoIconWrapper: findById('info-icon-wrapper'),
  infoIcon: findById('info-icon'),
  clock: findById('clock'),
})

export {
  getSelectors,
}
