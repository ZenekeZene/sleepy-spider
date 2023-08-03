import { findById, findAllBySelector } from 'sleepy-spider-lib'

function getSelectors () {
  const modalSelectors = {
    shareModal: findById('share-modal'),
    triggers: findAllBySelector(`.modal-trigger`),
    infoModal: findById('info-modal'),
    infoTriggers: findAllBySelector(`.info-modal-trigger`),
    shareInfoModal: findById('share-info-modal'),
    logoutInfoModal: findById('logout-info-modal'),
    logoutSuccessInfoModal: findById('logout-success-info-modal'),
  }
  return modalSelectors
}


export {
  getSelectors,
}
