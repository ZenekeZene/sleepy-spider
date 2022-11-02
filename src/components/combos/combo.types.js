import { MINIMUN_MEGACOMBO } from "./Combo"
const COMBO_TEXT = 'Combo X'
const MEGACOMBO_TEXT = 'MEGACOMBO!'

function calculateCombo ({ value }) {
  const combos = Object.entries(COMBO_TYPES)
  const [id, currentCombo] = combos.find(combo => combo[1].condition(value))

  if (!id || !currentCombo) {
    throw new Error('[Combo Error] Error with value: ', value)
  }
  return {
    id,
    ...currentCombo,
  }
}

const COMBO_TYPES = {
  MINI: {
    classname: 'mini',
    getText: () => '+1',
    condition: (value) => value === 1,
  },
  SMALL: {
    classname: 'small',
    getText: () => 'DOUBLE!',
    condition: (value) => value === 2,
  },
  NORMAL: {
    classname: 'normal',
    getText: () => 'TRIPLE!',
    condition: (value) => value > 2 && value < 4,
  },
  HUGE: {
    classname: 'huge',
    getText: (value) => `${COMBO_TEXT} ${value}`,
    condition: (value) => value >= 4 && value < 7,
  },
  MONSTER: {
    classname: 'monster',
    getText: () => MEGACOMBO_TEXT,
    condition: (value) => value >= MINIMUN_MEGACOMBO,
  }
}

const isMegaCombo = ({ comboId }) => comboId === COMBO_TYPES.MONSTER

export {
  calculateCombo,
  isMegaCombo,
}
