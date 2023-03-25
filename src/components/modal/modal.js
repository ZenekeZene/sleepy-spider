import './modal.css'

const VISIBLE_CLASSNAME = 'visible'
const TRIGGERS_CLASSNAME = 'modal-trigger'
const INFO_TRIGGERS_CLASSNAME = 'info-modal-trigger'
const QUESTION_TRIGGERS_CLASSNAME = 'question-modal-trigger'

function toggleElement (element) {
  const contains = element.classList.contains(VISIBLE_CLASSNAME)
  const toggle = contains ? 'remove' : 'add'
  element.classList[toggle](VISIBLE_CLASSNAME)
}

function listenTriggers (target, triggers) {
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      event.stopPropagation()
      toggleElement(target)
    })
  })
}

function handleModal () {
  const modal = document.getElementById('modal')
  const triggers = document.querySelectorAll(`.${TRIGGERS_CLASSNAME}`)

  const infoModal = document.getElementById('info-modal')
  const infoTriggers = document.querySelectorAll(`.${INFO_TRIGGERS_CLASSNAME}`)

  const questionModal = document.getElementById('question-modal')
  const questionTriggers = document.querySelectorAll(`.${QUESTION_TRIGGERS_CLASSNAME}`)

  listenTriggers(modal, triggers)
  listenTriggers(infoModal, infoTriggers)
  listenTriggers(questionModal, questionTriggers)
}

function launchQuestionModal () {
  const questionModal = document.getElementById('question-modal')
  toggleElement(questionModal)
}

function initModal () {
  handleModal()
}

export {
  initModal,
  launchQuestionModal,
}
