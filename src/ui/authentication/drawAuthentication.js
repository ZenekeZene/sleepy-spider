const drawUserIcon = ({ onClick }) => {
  const userIcon = document.getElementById('user-icon')
  userIcon.addEventListener('click', onClick)
}

const drawLogout = ({ onClick }) => {
  const userIcon = document.getElementById('logout-icon')
  userIcon.addEventListener('click', onClick)
}

function drawAuthentication ({ onLogin, onLogout }) {
  drawUserIcon({ onClick: onLogin })
  drawLogout({ onClick: onLogout })
}

export {
  drawAuthentication
}
