const DELAY_MEGACOMBO_EFFECT_IN_MS = 1000
const MEGACOMBO_EFFECT_CLASSNAME = 'big-surprise'

function applyMegaComboEffect () {
  document.body.classList.add(MEGACOMBO_EFFECT_CLASSNAME)

  setTimeout(() => {
    document.body.classList.remove(MEGACOMBO_EFFECT_CLASSNAME)
  }, DELAY_MEGACOMBO_EFFECT_IN_MS)
}

export {
  applyMegaComboEffect
}
