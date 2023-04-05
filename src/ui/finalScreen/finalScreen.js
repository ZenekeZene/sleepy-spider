import './finalScreen.css'

function hideElements () {
  const elements = document.querySelectorAll('.hide-on-final-screen')
  if (!elements) return
  elements.forEach(element => {
    element.classList.add('hidden')
  })
}

function showFinalScreen(finalScore) {
  const finalScreen = document.getElementById('final-screen')
  finalScreen.classList.remove('hidden')
  hideElements()
  const finalScoreElement = document.getElementById('final-score')
  finalScoreElement.textContent = finalScore

  const record = localStorage.getItem('record')
  const recordElement = document.getElementById('record')
  if (record) {
    // document.getElementById('record-message').classList.add('visible')
    recordElement.textContent = record
  }

  if (finalScore > record) {
    localStorage.setItem('record', finalScore)
    recordElement.textContent = finalScore
  }

  const playAgainButton = document.getElementById('play-again')
  playAgainButton.addEventListener('click', () => {
    window.location.reload()
  })
}

export {
  showFinalScreen
}
