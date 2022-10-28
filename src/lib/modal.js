function listenTriggers (target, triggers) {
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      event.stopPropagation()
      if (target.classList.contains('visible')) {
        target.classList.remove('visible')
      } else {
        target.classList.add('visible')
      }
    })
  })
}

function handleModal () {
  const modal = document.getElementById('modal')
  const triggers = document.querySelectorAll('.modal-trigger')

  const infoModal = document.getElementById('info-modal')
  const infoTriggers = document.querySelectorAll('.info-modal-trigger')

  listenTriggers(modal, triggers)
  listenTriggers(infoModal, infoTriggers)
}

function initModal () {
  document.addEventListener("DOMContentLoaded", handleModal)
}

export default initModal
