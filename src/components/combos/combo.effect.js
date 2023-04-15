import { findById } from "@/lib/dom/dom"

const DELAY_MEGACOMBO_EFFECT_IN_MS = 1000
const MEGACOMBO_EFFECT_CLASSNAME = 'big-surprise'

const element = findById('spider-wrapper')

function applyMegaComboEffect () {
  element.classList.add(MEGACOMBO_EFFECT_CLASSNAME)

  setTimeout(() => {
    element.classList.remove(MEGACOMBO_EFFECT_CLASSNAME)
  }, DELAY_MEGACOMBO_EFFECT_IN_MS)
}

export {
  applyMegaComboEffect
}
