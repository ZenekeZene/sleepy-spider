import { findById, findAllBySelector, toggleElement } from '@/lib'
import { launchQuestion } from '../question/question'
import './modal.css'

const TRIGGERS_CLASSNAME = 'modal-trigger'
const INFO_TRIGGERS_CLASSNAME = 'info-modal-trigger'
const QUESTION_TRIGGERS_CLASSNAME = 'question-modal-trigger'

function listenTriggers (target, triggers) {
  triggers.forEach(trigger => {
    console.log(typeof trigger)
    trigger.addEventListener('click', (event) => {
      event.stopPropagation()
      toggleElement(target)
    })
  })
}

function listenQuestionTriggers (target, triggers) {
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      event.stopPropagation()
      toggleElement(target)
      launchQuestion()
    })
  })
}

function handleModal () {
  const modal = findById('modal')
  const triggers = findAllBySelector(`.${TRIGGERS_CLASSNAME}`)

  const infoModal = findById('info-modal')
  const infoTriggers = findAllBySelector(`.${INFO_TRIGGERS_CLASSNAME}`)

  const questionModal = findById('question-modal')
  const questionTriggers = findAllBySelector(`.${QUESTION_TRIGGERS_CLASSNAME}`)

  listenTriggers(modal, triggers)
  listenTriggers(infoModal, infoTriggers)
  listenQuestionTriggers(questionModal, questionTriggers)
}

function initModal () {
  handleModal()
}

export {
  initModal,
  toggleElement,
}
