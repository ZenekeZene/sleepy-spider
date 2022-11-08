const VISIBLE_CLASSNAME = 'visible'
const TRIGGERS_CLASSNAME = 'modal-trigger'
const INFO_TRIGGERS_CLASSNAME = 'info-modal-trigger'

function listenTriggers (target, triggers) {
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      event.stopPropagation()

      const contains = target.classList.contains(VISIBLE_CLASSNAME)
      const toggle = contains ? 'remove' : 'add'
      target.classList[toggle](VISIBLE_CLASSNAME)
    })
  })
}

function handleModal () {
  const modal = document.getElementById('modal')
  const triggers = document.querySelectorAll(`.${TRIGGERS_CLASSNAME}`)

  const infoModal = document.getElementById('info-modal')
  const infoTriggers = document.querySelectorAll(`.${INFO_TRIGGERS_CLASSNAME}`)

  listenTriggers(modal, triggers)
  listenTriggers(infoModal, infoTriggers)
}

function initModal () {
  handleModal()
}

export {
  initModal
}
