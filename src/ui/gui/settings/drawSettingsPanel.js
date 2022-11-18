import { Pane } from 'tweakpane'
import { SHAPES } from '../../../settings/settings'
import { drawSettingButtons } from './drawSettingsButtons'

const toggleParametersByShape = ({ shape, inputs }) => {
  const { columns, rows, totalEyesInCircle } = inputs
  if (shape === SHAPES.SQUARE) {
    totalEyesInCircle.hidden = true
    columns.hidden = false
    rows.hidden = false
  } else if (shape === SHAPES.CIRCLE) {
    totalEyesInCircle.hidden = false
    columns.hidden = true
    rows.hidden = true
  } else {
    throw new Error('Error with unknown shape')
  }
}

const toggleSettingsPanel = ({ showSettings = false, panel }) => {
  panel.hidden = !showSettings
}

const drawGridFolder = ({ params, onChange }) => {
  const panel = new Pane()
  const gridFolder = panel.addFolder({ title: 'Grid' })
  const { inputs } = drawGridInputs({ params, onChange, folder: gridFolder })
  drawShapeInput({ params, onChange, folder: gridFolder, inputs })
  toggleParametersByShape({ shape: params.shape, inputs })
  return { panel }
}

const drawShapeInput = ({ params, onChange, folder, inputs }) => {
  const shapeInput = folder.addInput(params, 'shape', { options: { ...SHAPES }, index: 0, })
  shapeInput.on('change', () => {
    onChange()
    toggleParametersByShape({ shape: params.shape, inputs })
  })
}

const drawGridInputs = ({ params, onChange, folder }) => {
  const inputs = {}
  inputs.columns = folder.addInput(params, 'columns', { min: 2, max: 3, step: 1 })
  inputs.rows = folder.addInput(params, 'rows', { min: 1, max: 3, step: 1 })
  inputs.totalEyesInCircle = folder.addInput(params, 'totalEyesInCircle', {
    label: 'number of eyes',
    min: 0,
    max: 9,
    step: 1
  })
  Object.values(inputs).forEach((input) => input.on('change', onChange))
  return { inputs }
}

const drawEyeFolder = ({ params, panel }) => {
  const eyeFolder = panel.addFolder({ title: 'Eye' })
  eyeFolder.addInput(params.pupil, 'color')
  eyeFolder.addInput(params.pupil, 'size', {
    min: params.pupil.minSize,
    max: params.pupil.maxSize,
    step: params.pupil.step
  })
}

const drawSettingsFolder = ({ params, panel }) => {
  const settingsFolder = panel.addFolder({ title: 'Settings' })
  settingsFolder.addInput(params, 'wave')
  settingsFolder.addInput(params, 'sizeColision', { min: 0.01, max: 3, step: 0.1 })
  settingsFolder.addInput(params, 'sound')
}

const drawSettingsPanel = ({ params, onChange }) => {
  const { panel } = drawGridFolder({ params, onChange })
  drawSettingButtons({ panel, onClick: toggleSettingsPanel })
  drawEyeFolder({ params, panel })
  drawSettingsFolder({ params, panel })
}

export {
  drawSettingsPanel,
}
