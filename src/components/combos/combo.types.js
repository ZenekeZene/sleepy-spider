import {
  SINGLE_COMBO_VALUE,
  DOUBLE_COMBO_VALUE,
  TRIPLE_COMBO_VALUE,
  MEGACOMBO_VALUE,
  MEGACOMBO_BONUS,
} from "./combo.constants"

const COMBO_TEXT = 'Combo X'
const MEGACOMBO_TEXT = 'MEGACOMBO!'
const MONSTER_ID = 'MONSTER'

function calculateCombo (value) {
  const combos = Object.entries(COMBO_TYPES)
  const [id, currentCombo] = combos.find(combo => combo[1].condition(value))

  if (!id || !currentCombo) {
    throw new Error('[Combo] Error with value: ', value)
  }
  return { id, ...currentCombo }
}

const COMBO_TYPES = {
  MINI: {
    classname: 'mini',
    getText: () => '+1',
    condition: (value) => value === SINGLE_COMBO_VALUE,
  },
  SMALL: {
    classname: 'small',
    getText: () => 'DOUBLE!',
    condition: (value) => value === DOUBLE_COMBO_VALUE,
  },
  NORMAL: {
    classname: 'normal',
    getText: () => 'TRIPLE!',
    condition: (value) => value === TRIPLE_COMBO_VALUE,
  },
  HUGE: {
    classname: 'huge',
    getText: (value) => `${COMBO_TEXT} ${value}`,
    condition: (value) => value > TRIPLE_COMBO_VALUE && value < MEGACOMBO_VALUE,
  },
  [MONSTER_ID]: {
    classname: 'monster',
    getText: () => MEGACOMBO_TEXT,
    condition: (value) => value >= MEGACOMBO_VALUE,
  }
}

const isMegaComboById = (id) => id.localeCompare(MONSTER_ID) === 0
const isMegaComboByValue = (combo) => COMBO_TYPES[MONSTER_ID].condition(combo)
const scaleComboToMegaCombo = (combo) => combo *= (MEGACOMBO_BONUS / combo)

export {
  calculateCombo,
  isMegaComboByValue,
  scaleComboToMegaCombo,
  isMegaComboById,
}
