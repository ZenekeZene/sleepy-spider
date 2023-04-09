import { initModal } from '@/components/modal/modal'
import { toggleInvisibleElements } from './invisibleElements/toggleInvisibleElements'
import { drawSettingsPanel } from './settings/drawSettingsPanel'
import { hideTitleOnFirstClick } from './hideTitle'
import { listenFirstClick } from './listenFirstClick'

const drawGUI = ({ params, onSettingsChanges }) => {
  initModal()
  toggleInvisibleElements()
  drawSettingsPanel({ params, onSettingsChanges })
  hideTitleOnFirstClick()
  listenFirstClick()
}

export {
  drawGUI,
}
