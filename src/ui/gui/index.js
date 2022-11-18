import { initModal } from '../../components/modal/modal'
import { toggleInvisibleElements } from './invisibleElements/toggleInvisibleElements'
import { drawSettingsPanel } from './settings/drawSettingsPanel'

const drawGUI = ({ params, onChange }) => {
  initModal()
  toggleInvisibleElements()
  drawSettingsPanel({ params, onChange })
}

export {
  drawGUI,
}
