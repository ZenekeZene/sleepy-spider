import { findById } from '@/lib'

const signInSubtitle = findById('sign-in-subtitle')
const userCounter = findById('user-counter')

async function renderLogin () {
  //signInSubtitle.style.display = 'none'
  userCounter.style.display = 'block'
}

function renderLogout () {
  //userCounter.style.display = 'none'
}

export {
  renderLogin,
  renderLogout,
}
