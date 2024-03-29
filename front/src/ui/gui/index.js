import { listenEvent } from 'sleepy-spider-lib'
import { params } from '@/domain/settings'
import { EVENTS } from '@/adapter'
import { listenFirstClick } from '@/adapter/events/listenFirstClick'
import { initModal as initInfoModal } from '@/ui/components/modal/modal'
import { initModal as initShareModal } from '@/ui/components/share/modal/share.modal'
import { initLogoutButton } from '@/ui/components/logout/logout'
import { initCallToTap } from '@/ui/gui/callToTap'
import { onRefreshReferences } from '@/ui/components/sleepy/spider/drawSpider'
import { toggleInvisibleElements } from '@/ui/gui/invisibleElements/toggle.invisible.elements'
import { hideGUIOnFirstClick } from '@/ui/gui/hideGUIFirstClick/hideGUIFirstClick'

const listenChangesInSettings = () => {
  listenEvent(EVENTS.CHANGES_IN_SETTINGS, () => {
    onRefreshReferences(params)
  })
}

const prepareGUI = () => {
  initInfoModal()
  initLogoutButton()
  initShareModal()
  toggleInvisibleElements()
  hideGUIOnFirstClick()
  listenFirstClick()
  listenChangesInSettings()
  initCallToTap()
}

export {
  prepareGUI,
}
