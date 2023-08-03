import { toggleElement, dispatchEvent, listenEvent, classHelper as $class } from 'sleepy-spider-lib'
import { EVENTS, stores } from '@/adapter'
import { HIDDEN_CLASS } from '@/ui/constants'
import { logout } from '@/infra/services/authentication/authentication'
import { getSelectors as $el} from './modal.selectors'
import './modal.css'

function listenTriggers (target, triggers) {
  if (!triggers.length || triggers.length === 0) return
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      event.stopPropagation()
      toggleElement(target)
    })
  })
}

function listenBuyMeCoffeButton () {
  const { buyMeCoffeInfoModal } = $el()
  buyMeCoffeInfoModal.addEventListener('click', (event) => {
    console.log('Compremos un coffe para Zeneke!')
  })
}

function listenLogoutButton () {
  const { logoutInfoModal } = $el()
  logoutInfoModal.addEventListener('click', (event) => {
    logout()
    .then(() => {
      dispatchEvent(EVENTS.USER_NOT_LOGGED)
      $class.add(logoutInfoModal, HIDDEN_CLASS)
    })
  })
}

const showLogoutButton = () => {
  const { logoutInfoModal } = $el()
  $class.remove(logoutInfoModal, HIDDEN_CLASS)
  const { user } = stores.auth
  logoutInfoModal.innerHTML = `LOGOUT <span class='user'>(<span>${user.displayName}</span>)</span>`
  listenLogoutButton()
}

const hideLogoutButton = () => {
  const { logoutInfoModal } = $el()
  $class.add(logoutInfoModal, HIDDEN_CLASS)
}

function initModal () {
  const { infoModal, shareModal, triggers, infoTriggers } = $el()
  listenTriggers(shareModal, triggers)
  listenTriggers(infoModal, infoTriggers)
  listenBuyMeCoffeButton(infoModal)

  const { isLogged } = stores.auth
  isLogged ? showLogoutButton() : hideLogoutButton()
  listenEvent(EVENTS.USER_LOGGED, showLogoutButton)
}

export {
  initModal,
  toggleElement,
}
