import { initModal } from '@/components/modal/modal'
import { toggleInvisibleElements } from './invisibleElements/toggleInvisibleElements'
import { drawSettingsPanel } from './settings/drawSettingsPanel'

const drawGUI = ({ params, onSettingsChanges }) => {
  initModal()
  toggleInvisibleElements()
  drawSettingsPanel({ params, onSettingsChanges })
}

export {
  drawGUI,
}
