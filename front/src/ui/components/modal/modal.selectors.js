import { classHelper as $class, findById, findAllBySelector, getCacheByKey } from 'sleepy-spider-lib'
import { VISIBLE_CLASS } from '@/ui/constants'

const findByIdCached = getCacheByKey(findById)

const show = (element) => $class.add(element, VISIBLE_CLASS)
const hide = (element) => $class.remove(element, VISIBLE_CLASS)

const info = {
  trigger: findByIdCached('info-icon'),
  modal: findByIdCached('info-modal'),
  closers: findAllBySelector(`.info-modal-trigger`),
}

const logout = {
  button: findByIdCached('logout-info-modal'),
  successMessage: findByIdCached('logout-success-info-modal'),
}

const getSelectors = () => ({
  backdrop: findByIdCached('modal-backdrop'),
  info,
  logout,
})

export {
  getSelectors,
  show,
  hide,
}
