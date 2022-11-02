import { evalCombo, isMegaCombo } from "./combo.types"
const COMBO_CLASSNAME = 'combo'
const DELAY_TO_BE_REMOVED_IN_MS = 3000
const DELAY_MEGACOMBO_EFFECT_IN_MS = 3000
const MEGACOMBO_EFFECT_CLASSNAME = 'big-surprise'

const wrapperCombos = document.getElementById('combos')

function applyMegaComboEffect () {
  document.body.classList.add(MEGACOMBO_EFFECT_CLASSNAME)

  setTimeout(() => {
    document.body.classList.remove(MEGACOMBO_EFFECT_CLASSNAME)
  }, DELAY_MEGACOMBO_EFFECT_IN_MS)
}

function createCombo (value) {
  const comboElement = document.createElement('span')
  comboElement.classList.add(COMBO_CLASSNAME)

  const { id, classname, getText } = evalCombo(value)

  if (id === isMegaCombo()) { applyMegaComboEffect() }

  comboElement.innerText = getText(value)
  comboElement.classList.add(`--${COMBO_CLASSNAME}-${classname}`)
  wrapperCombos.appendChild(comboElement)

  setTimeout(() => {
    wrapperCombos.removeChild(comboElement)
  }, DELAY_TO_BE_REMOVED_IN_MS)
}

export {
  createCombo,
}
