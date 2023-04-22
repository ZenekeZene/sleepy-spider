import { drawSettingButtons } from './drawSettingsButtons'
import { drawGridFolder } from './drawGridSettings'

const toggleSettingsPanel = ({ showSettings = false, panel }) => {
  panel.hidden = !showSettings
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

const drawSettingsPanel = (params) => {
  const { panel } = drawGridFolder(params)
  drawSettingButtons({ panel, onClick: toggleSettingsPanel })
  drawEyeFolder({ params, panel })
  drawSettingsFolder({ params, panel })
}

export {
  drawSettingsPanel,
}
