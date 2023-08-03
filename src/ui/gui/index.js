import { listenEvent } from 'sleepy-spider-lib'
import { params } from '@/domain/settings'
import { EVENTS } from '@/adapter'
import { listenFirstClick } from '@/adapter/events/listenFirstClick'
import { initModal } from '@/ui/components/modal/modal'
import { onRefreshReferences } from '@/ui/components/sleepy/spider/drawSpider'
import { toggleInvisibleElements } from './invisibleElements/toggle.invisible.elements'
// import { drawSettingsPanel } from './settings/drawSettingsPanel'
import { hideTitleOnFirstClick } from './hideTitle'

const listenChangesInSettings = () => {
  listenEvent(EVENTS.CHANGES_IN_SETTINGS, () => {
    onRefreshReferences(params)
  })
}

const prepareGUI = () => {
  initModal()
  toggleInvisibleElements()
  // drawSettingsPanel(params)
  hideTitleOnFirstClick()
  listenFirstClick()
  listenChangesInSettings()
}

export {
  prepareGUI,
}
