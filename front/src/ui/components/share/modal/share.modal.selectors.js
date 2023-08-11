import { classHelper as $class, findById, findAllBySelector, getCacheByKey } from 'sleepy-spider-lib'
import { VISIBLE_CLASS } from '@/ui/constants'

const show = (element) => $class.add(element, VISIBLE_CLASS)
const hide = (element) => $class.remove(element, VISIBLE_CLASS)

const findByIdCached = getCacheByKey(findById)

const getSelectors = () => ({
  trigger: findByIdCached('share-info-modal'),
  trigger2: findByIdCached('share'),
  modal: findByIdCached('share-modal'),
  closers: findAllBySelector(`.share-modal-trigger`),
})

export {
  getSelectors,
  show,
  hide,
}
