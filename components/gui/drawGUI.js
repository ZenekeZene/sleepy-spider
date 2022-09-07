import { Pane } from 'tweakpane'

const drawGUI = (params, callback) => {
  const pane = new Pane()
  const folder = pane.addFolder({ title: 'Grid' })
  const columnsInput = folder.addInput(params, 'columns', { min: 1, max: 5, step: 1 })
  const rowsInput = folder.addInput(params, 'rows', { min: 1, max: 5, step: 1 })

  const folderEye = pane.addFolder({ title: 'Eye' })
  folderEye.addInput(params.pupil, 'color')
  folderEye.addInput(params.pupil, 'size', { min: 0.1, max: 0.3, step: 0.1 })

  const folderSettings = pane.addFolder({ title: 'Settings' })
  folderSettings.addInput(params, 'wave')
  folderSettings.addInput(params, 'sizeColision', { min: 0.01, max: 3, step: 0.1 })

  columnsInput.on('change', callback)
  rowsInput.on('change', callback)
}

export default drawGUI
