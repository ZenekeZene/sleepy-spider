import { toggleElement } from 'sleepy-spider-lib'
import { getSelectors } from './modal.selectors'
import './modal.css'

function listenTriggers (target, triggers) {
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      event.stopPropagation()
      toggleElement(target)
    })
  })
}

function initModal () {
  const $el = getSelectors()
  listenTriggers($el.shareModal, $el.triggers)
  listenTriggers($el.infoModal, $el.infoTriggers)
}

export {
  initModal,
  toggleElement,
}
