import { MINIMUN_MEGACOMBO } from "./Combo"
const COMBO_CLASSNAME = 'combo'
const COMBO_TEXT = 'Combo X'
const DELAY_TO_BE_REMOVED_IN_MS = 3000

const wrapperCombos = document.getElementById('combos')

function createCombo (value) {
  const comboElement = document.createElement('span')
  comboElement.classList.add(COMBO_CLASSNAME)

  let className
  let text = `${COMBO_TEXT} ${value}`

  if (value <= 2) {
    className = 'mini'
  } else if (value > 2 && value <= 4) {
    className = 'normal'
  } else if (value > 4 && value < 7) {
    className = 'huge'
  } else if (value >= MINIMUN_MEGACOMBO) {
    className = 'monster'
    text = 'MEGACOMBO!'
  }
  comboElement.innerText = text
  comboElement.classList.add(`--${COMBO_CLASSNAME}-${className}`)
  wrapperCombos.append(comboElement)

  setTimeout(() => {
    comboElement.remove()
  }, DELAY_TO_BE_REMOVED_IN_MS)
}

export {
  createCombo,
}
