import { initModal } from '@/components/modal/modal'
import { toggleInvisibleElements } from './invisibleElements/toggleInvisibleElements'
import { drawSettingsPanel } from './settings/drawSettingsPanel'
import { hideTitle } from './hideTitle'

const drawGUI = ({ params, onSettingsChanges }) => {
  initModal()
  toggleInvisibleElements()
  drawSettingsPanel({ params, onSettingsChanges })
  hideTitle()
}

export {
  drawGUI,
}
