import { listenFirstClick } from '@/adapter/events/listenFirstClick'
import { initModal } from '@/ui/components/modal/modal'
import { toggleInvisibleElements } from './invisibleElements/toggle.invisible.elements'
import { drawSettingsPanel } from './settings/drawSettingsPanel'
import { hideTitleOnFirstClick } from './hideTitle'

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
