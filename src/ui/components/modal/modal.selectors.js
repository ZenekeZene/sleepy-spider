import { findById, findAllBySelector } from 'sleepy-spider-lib'

function getSelectors () {
  const modalSelectors = {
    shareModal: findById('share-modal'),
    triggers: findAllBySelector(`.modal-trigger`),
    infoModal: findById('info-modal'),
    infoTriggers: findAllBySelector(`.info-modal-trigger`),
  }
  return modalSelectors
}


export {
  getSelectors,
}
