import { MEGACOMBO_BONUS } from "./combo.constants"
import { COMBO_TYPES } from "./combo.types"

function calculateCombo (value) {
  const combos = Object.entries(COMBO_TYPES)
  const [id, currentCombo] = combos.find(combo => combo[1].condition(value))

  if (!id || !currentCombo) {
    throw new Error('[Combo] Error with value: ', value)
  }
  return { id, ...currentCombo }
}

const scaleComboToMegaCombo = (combo) => combo *= (MEGACOMBO_BONUS / combo)

export {
  calculateCombo,
  scaleComboToMegaCombo,
}
