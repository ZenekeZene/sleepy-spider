import { toggleElement } from 'sleepy-spider-lib'
import { modalSelectors as $el } from './modal.selectors'
import './modal.css'

function listenTriggers (target, triggers) {
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      event.stopPropagation()
      toggleElement(target)
    })
  })
}

function handleModal () {
  listenTriggers($el.modal, $el.triggers)
  listenTriggers($el.infoModal, $el.infoTriggers)
}

function initModal () {
  handleModal()
}

export {
  initModal,
  toggleElement,
}
