import { calculateCombo, isMegaComboById } from "./combo.types"
import { applyMegaComboEffect } from './combo.effect'

const COMBO_CLASSNAME = 'combo'
const DELAY_TO_BE_REMOVED_IN_MS = 3000

const wrapperCombos = document.getElementById('combos')

function appendComboElement ({ text, classname }) {
  const comboElement = document.createElement('span')
  comboElement.classList.add(COMBO_CLASSNAME, `--${COMBO_CLASSNAME}-${classname}`)
  comboElement.innerText = text
  wrapperCombos.appendChild(comboElement)
  return comboElement
}

function removeComboElement (comboElement) {
  setTimeout(() => {
    wrapperCombos.removeChild(comboElement)
  }, DELAY_TO_BE_REMOVED_IN_MS)
}

function showComboMessage (value) {
  const { id: comboId, classname, getText } = calculateCombo(value)
  const text = getText(value)
  const comboElement = appendComboElement({ text, classname })
  if (isMegaComboById(comboId)) { applyMegaComboEffect() }
  removeComboElement(comboElement)
}

export {
  showComboMessage,
}
