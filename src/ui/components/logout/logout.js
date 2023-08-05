import { classHelper as $class, listenEvent, dispatchEvent } from 'sleepy-spider-lib'
import { logout } from '@/infra/services/authentication/authentication'
import { EVENTS, stores } from '@/adapter'
import { HIDDEN_CLASS } from '@/ui/constants'
import { getSelectors as $el } from './logout.selectors'

function handleLogout () {
  const { button, successMessage } = $el()
  logout()
  .then(() => {
    dispatchEvent(EVENTS.USER_NOT_LOGGED)
    $class.add(button, HIDDEN_CLASS)
    $class.remove(successMessage, HIDDEN_CLASS)
  })
}

function listenLogoutButton () {
  const { button } = $el()
  button.addEventListener('click', handleLogout)
}

const renderLogoutButtonTemplate = ({ displayName }) => `
  LOGOUT <span class='user'>(
    <span>${displayName}</span>
  )</span>
`

const showLogoutButton = () => {
  const { button } = $el()
  $class.remove(button, HIDDEN_CLASS)
  const { user } = stores.auth
  button.innerHTML = renderLogoutButtonTemplate(user)
  listenLogoutButton()
}

const hideLogoutButton = () => {
  const { button } = $el()
  $class.add(button, HIDDEN_CLASS)
}

function initLogoutButton () {
  const { isLogged } = stores.auth
  isLogged ? showLogoutButton() : hideLogoutButton()
  listenEvent(EVENTS.USER_LOGGED, showLogoutButton)
}

export { initLogoutButton }
