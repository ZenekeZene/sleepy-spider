const signInSubtitle = document.getElementById('sign-in-subtitle')
const userCounter = document.getElementById('user-counter')

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
