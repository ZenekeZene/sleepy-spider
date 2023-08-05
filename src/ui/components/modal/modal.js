import { toggleElement, dispatchEvent, listenEvent, classHelper as $class, findById } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { HIDDEN_CLASS } from '@/ui/constants'
import { getSelectors as $el, show, hide } from './modal.selectors'
import './modal.css'

let isModalOpen = false

const listenElementsToCloseModal = (target, triggers) => {
  const handleClose = (event) => {
    event.stopPropagation()
    hide(target)
    dispatchEvent(EVENTS.MODAL_CLOSE)
  }

  if (!triggers?.length || triggers.length === 0) return
  triggers.forEach(trigger => {
    trigger.addEventListener('click', handleClose)
  })
}

const handleModalOpen = () => {
  if (isModalOpen) return
  const { backdrop } = $el()
  isModalOpen = true
  $class.remove(backdrop, HIDDEN_CLASS)
}

const handleModalClose = () => {
  if (!isModalOpen) return
  const { backdrop, logout } = $el()
  isModalOpen = false
  $class.add(backdrop, HIDDEN_CLASS)
  $class.add(logout.successMessage, HIDDEN_CLASS)
}

const listenElementsToClose = () => {
  const { info } = $el()
  listenElementsToCloseModal(info.modal, info.closers)
}

const handleClickOnInfoIcon = (event) => {
  const { info } = $el()
  event.stopPropagation()
  dispatchEvent(EVENTS.MODAL_OPEN)
  show(info.modal)
}

function initModal () {
  const { info } = $el()
  listenElementsToClose()
  info.trigger.addEventListener('click', handleClickOnInfoIcon)

  listenEvent(EVENTS.MODAL_OPEN, handleModalOpen)
  listenEvent(EVENTS.MODAL_CLOSE, handleModalClose)
}

export {
  initModal,
  toggleElement,
}
