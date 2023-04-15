import { range, findById } from "@/lib"
import { calculateCombo, isMegaComboById } from "@/domain/combo/combo"
import { applyMegaComboEffect } from './combo.effect'

const TAG_NAME = 'span'
const COMBO_CLASSNAME = 'combo'
const DELAY_TO_BE_REMOVED_IN_MS = 2000

const wrapperCombos = findById('combos')

const $el = (element) => ({
  setRandomPosition() {
    element.style.left = `${range(45, 60)}%`
    element.style.top = `${range(40, 35)}%`
    return this
  },
  applyStyle(classname) {
    element.classList.add(COMBO_CLASSNAME, `--${COMBO_CLASSNAME}-${classname}`)
    return this
  },
  setMessage(text) {
    element.innerText = text
    return this
  }
})

function appendComboElement({ text, classname }) {
  const comboElement = document.createElement(TAG_NAME)
  $el(comboElement).applyStyle(classname).setMessage(text).setRandomPosition()
  wrapperCombos.appendChild(comboElement)
  return comboElement
}

function removeComboElement(comboElement) {
  setTimeout(() => {
    wrapperCombos.removeChild(comboElement)
  }, DELAY_TO_BE_REMOVED_IN_MS)
}

function showComboMessage(value) {
  const { id: comboId, classname, getText } = calculateCombo(value)
  const text = getText(value)
  const comboElement = appendComboElement({ text, classname })
  if (isMegaComboById(comboId)) { applyMegaComboEffect() }
  removeComboElement(comboElement)
}

export {
  showComboMessage,
}
