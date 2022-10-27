import { Pane } from 'tweakpane'
import { SHAPES } from '../../settings/settings'

let showSettings = false
const pane = new Pane()
let columnsInput
let rowsInput
let totalEyesInCircleInput

const toggleParametersByShape = (shape) => {
  if (shape === SHAPES.SQUARE) {
    totalEyesInCircleInput.hidden = true
    columnsInput.hidden = false
    rowsInput.hidden = false
  } else if (shape === SHAPES.CIRCLE) {
    totalEyesInCircleInput.hidden = false
    columnsInput.hidden = true
    rowsInput.hidden = true
  }
}

const drawSettingButtons = () => {
  const settingsButton = document.getElementById('settings-icon')
  const settingsCloseButton = document.getElementById('settings-close-icon')

  settingsButton.addEventListener('click', function () {
    showSettings = true
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

const drawGUI = (params, callback) => {
  drawSettingButtons()
  const folder = pane.addFolder({ title: 'Grid' })

  const shapeInput = folder.addInput(params, 'shape', {
    options: { ...SHAPES }
  })

  shapeInput.on('change', () => {
    callback()
    toggleParametersByShape(params.shape)
  })
  columnsInput = folder.addInput(params, 'columns', { min: 2, max: 3, step: 1 })
  rowsInput = folder.addInput(params, 'rows', { min: 1, max: 3, step: 1 })
  totalEyesInCircleInput = folder.addInput(params, 'totalEyesInCircle', {
    label: 'number of eyes',
    min: 0,
    max: 9,
    step: 1
  })
  toggleParametersByShape(params.shape)
  columnsInput.on('change', callback)
  rowsInput.on('change', callback)
  totalEyesInCircleInput.on('change', callback)

  const folderEye = pane.addFolder({ title: 'Eye' })
  folderEye.addInput(params.pupil, 'color')
  console.log(params.pupil)
  folderEye.addInput(params.pupil, 'size', {
    min: params.pupil.minSize,
    max: params.pupil.maxSize,
    step: params.pupil.step
  })

  const folderSettings = pane.addFolder({ title: 'Settings' })
  folderSettings.addInput(params, 'wave')
  folderSettings.addInput(params, 'sizeColision', { min: 0.01, max: 3, step: 0.1 })
  folderSettings.addInput(params, 'sound')
}

const toggleGUI = (showSettings) => {
  pane.hidden = !showSettings
}

export {
  drawGUI,
  toggleGUI,
}
