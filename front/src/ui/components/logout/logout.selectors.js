import { classHelper as $class, findById, getCacheByKey } from 'sleepy-spider-lib'
import { VISIBLE_CLASS } from '@/ui/constants'

const findByIdCached = getCacheByKey(findById)

const show = (element) => $class.add(element, VISIBLE_CLASS)
const hide = (element) => $class.remove(element, VISIBLE_CLASS)

const logout = {
  button: findByIdCached('logout-info-modal'),
  successMessage: findByIdCached('logout-success-info-modal'),
}

const getSelectors = () => ({
  ...logout,
})

export {
  getSelectors,
  show,
  hide,
}
