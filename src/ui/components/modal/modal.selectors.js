import { findById, findAllBySelector } from 'sleepy-spider-lib'

function getSelectors () {
  const modalSelectors = {
    modal: findById('modal'),
    triggers: findAllBySelector(`.modal-trigger`),
    infoModal: findById('info-modal'),
    infoTriggers: findAllBySelector(`.info-modal-trigger`),
  }
  return modalSelectors
}


export {
  getSelectors,
}
