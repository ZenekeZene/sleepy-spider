import { findById, findAllBySelector } from 'sleepy-spider-lib'

const modalSelectors = {
  modal: findById('modal'),
  triggers: findAllBySelector(`.modal-trigger`),
  infoModal: findById('info-modal'),
  infoTriggers: findAllBySelector(`.info-modal-trigger`),
}

export {
  modalSelectors,
}
