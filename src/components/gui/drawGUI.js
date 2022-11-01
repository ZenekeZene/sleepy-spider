import { Pane } from 'tweakpane'
import { SHAPES } from '../../settings/settings'
import { numberWithCommas } from '../../lib/number'

let showSettings = false
const pane = new Pane()
let columnsInput
let rowsInput
let totalEyesInCircleInput

const INVISIBLE_CLASSNAME = 'invisible'
const TRANSPARENT_CLASSNAME = 'transparent'
const ENTRANCE_CLASSNAME = 'bounceInDown'

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

const drawGUI = ({ params, onChange }) => {
  toggleGUI()
  toggleInvisibleElements()
  drawSettingButtons()
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

const toggleElements = (elements, classname, callback) => {
  if (!elements || elements?.length === 0) return
  const collection = Array.from(elements)
  collection.forEach(element => {
    element.classList.toggle(classname)
    callback && callback(element)
  })
}

const toggleInvisibleElements = () => {
  setTimeout(() => {
    const invisibleElements = document.getElementsByClassName(INVISIBLE_CLASSNAME)
    const transparentElements = document.getElementsByClassName(TRANSPARENT_CLASSNAME)
    toggleElements(invisibleElements, INVISIBLE_CLASSNAME)
    toggleElements(transparentElements, TRANSPARENT_CLASSNAME, ({ classList }) => {
      classList.add(ENTRANCE_CLASSNAME)
    })
    const loaderElement = document.getElementById('loader')
    loaderElement.classList.add(INVISIBLE_CLASSNAME)
  }, 1000)
}

const TOTAL_TEXT = `Let’s wake up a million times, and a surprise will happen. We wake `

const updateDescription = (value) => {
  const description = `${TOTAL_TEXT} ${value} times.`
  document.querySelector('meta[name="description"]').setAttribute("content", description)
}

const updateCounters = (value) => {
  const counters = document.getElementsByClassName('counter')
  Array.from(counters).forEach((counter) => counter.textContent = value)
  return counters
}

const updateAwakeningsCounter = (value) => {
  updateCounters(value)
  updateDescription(value)
}

const updateAwakeningsCachedCounter = (value) => {
  const counters = document.getElementsByClassName('counter')
  const total = Number(counters[0].textContent) + Number(value)
  updateCounters(total)
  updateDescription(total)
}

export {
  drawGUI,
  toggleGUI,
  toggleInvisibleElements,
  updateAwakeningsCounter,
  updateAwakeningsCachedCounter,
}
