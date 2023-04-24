import { classHelper as $class, findById } from "sleepy-spider-lib"

const DELAY_MEGACOMBO_EFFECT_IN_MS = 1000
const MEGACOMBO_EFFECT_CLASSNAME = 'big-surprise'

function applyMegaComboEffect () {
  const element = findById('spider-wrapper')
  $class.add(element, MEGACOMBO_EFFECT_CLASSNAME)

  setTimeout(() => {
    $class.remove(element, MEGACOMBO_EFFECT_CLASSNAME)
  }, DELAY_MEGACOMBO_EFFECT_IN_MS)
}

export {
  applyMegaComboEffect
}
