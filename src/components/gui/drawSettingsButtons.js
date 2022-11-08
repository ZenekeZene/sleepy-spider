let showSettings = false

const drawSettingButtons = ({ toggleGUI }) => {
  const settingsButton = document.getElementById('settings-icon')
  const settingsCloseButton = document.getElementById('settings-close-icon')

  settingsButton.addEventListener('click', function () {
    showSettings = true
    document.querySelector('.tp-dfwv').style.display = 'block'
    this.style.display = 'none'
    settingsCloseButton.style.display = 'block'
    toggleGUI(showSettings)
  })

  settingsCloseButton.addEventListener('click', function () {
    showSettings = false
    this.style.display = 'none'
    settingsButton.style.display = 'block'
    toggleGUI(showSettings)
  })
}

export {
  drawSettingButtons,
}
