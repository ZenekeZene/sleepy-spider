import { findById, findBySelector } from "sleepy-spider-lib"

let showSettings = false
const VENDOR_PANE_CLASSNAME = 'tp-dfwv'

const drawSettingButtons = ({ panel, onClick }) => {
  const settingsButton = findById('settings-icon')
  const settingsCloseButton = findById('settings-close-icon')

  settingsButton.addEventListener('click', function () {
    showSettings = true
    findBySelector(`.${VENDOR_PANE_CLASSNAME}`).style.display = 'block'
    this.style.display = 'none'
    settingsCloseButton.style.display = 'block'
    onClick({ showSettings, panel })
  })

  settingsCloseButton.addEventListener('click', function () {
    showSettings = false
    this.style.display = 'none'
    settingsButton.style.display = 'block'
    onClick({ showSettings, panel })
  })
}

export {
  drawSettingButtons,
}
