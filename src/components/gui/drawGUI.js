import { Pane } from 'tweakpane'
import { SHAPES } from '../../settings/settings'
import { initModal } from '../modal/modal'
import { drawSettingButtons } from './drawSettingsButtons'
import { toggleInvisibleElements } from './toggleInvisibleElements'

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

const drawUserIcon = ({ onClick }) => {
  const userIcon = document.getElementById('user-icon')
  userIcon.addEventListener('click', () => {
    onClick()
  })
}

const drawGUI = ({ params, onChange }) => {
  initModal()
  toggleGUI()
  toggleInvisibleElements()
  drawSettingButtons({ toggleGUI })

  const folder = pane.addFolder({ title: 'Grid' })
  const shapeInput = folder.addInput(params, 'shape', {
    options: { ...SHAPES }
  })

  shapeInput.on('change', () => {
    onChange()
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
  columnsInput.on('change', onChange)
  rowsInput.on('change', onChange)
  totalEyesInCircleInput.on('change', onChange)

  const folderEye = pane.addFolder({ title: 'Eye' })
  folderEye.addInput(params.pupil, 'color')
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
  drawUserIcon,
}
