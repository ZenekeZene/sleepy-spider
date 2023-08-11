import { Pane } from 'tweakpane'
import { dispatchEvent } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { SHAPES } from '@/domain/settings'

const onSettingsChanges = () => {
  dispatchEvent(EVENTS.CHANGES_IN_SETTINGS)
}

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

const drawShapeInput = ({ params, folder, inputs }) => {
  const shapeInput = folder.addInput(params, 'shape', { options: { ...SHAPES }, index: 0 })
  shapeInput.on('change', () => {
    onSettingsChanges()
    toggleParametersByShape({ shape: params.shape, inputs })
  })
}

const drawGridInputs = ({ params, folder }) => {
  const inputs = {}
  inputs.columns = folder.addInput(params, 'columns', { min: 2, max: 3, step: 1 })
  inputs.rows = folder.addInput(params, 'rows', { min: 1, max: 3, step: 1 })
  inputs.totalEyesInCircle = folder.addInput(params, 'totalEyesInCircle', {
    label: 'number of eyes',
    min: 0,
    max: 9,
    step: 1
  })
  Object.values(inputs).forEach((input) => input.on('change', onSettingsChanges))
  return { inputs }
}

const drawGridFolder = (params) => {
  const panel = new Pane()
  const gridFolder = panel.addFolder({ title: 'Grid' })
  const { inputs } = drawGridInputs({ params, folder: gridFolder })
  drawShapeInput({ params, folder: gridFolder, inputs, })
  toggleParametersByShape({ shape: params.shape, inputs })
  return { panel }
}

export {
  drawGridFolder,
}
