import { classHelper as $class } from 'sleepy-spider-lib'
import { getSelectors as $el, show, hide } from './share.modal.selectors'

const listenElementsToCloseModal = (target, triggers) => {
  const handleClose = (event) => {
    event.stopPropagation()
    hide(target)
  }

  if (!triggers?.length || triggers.length === 0) return
  triggers.forEach(trigger => {
    trigger.addEventListener('click', handleClose)
  })
}

const handleClickOnShareButton = (event, context) => {
  const { modal } = $el()
  event.stopPropagation()
  show(modal)
  $class.add(modal, context)
}

function initModal () {
  const { modal, closers, trigger, trigger2 } = $el()
  listenElementsToCloseModal(modal, closers)
  trigger.addEventListener('click', (event) => handleClickOnShareButton(event, '--info-modal'))
  trigger2.addEventListener('click', (event) => handleClickOnShareButton(event, '--final-screen'))
}

export { initModal }
