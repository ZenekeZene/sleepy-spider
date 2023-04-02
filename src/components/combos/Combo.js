import { createClicksPerSecCounter } from '../clicksPerSecond/clicksPerSecond'
import {
  SINGLE_COMBO_VALUE,
} from './combo.constants'
import { showComboMessage } from './combo.message'
import {
  isMegaComboByValue,
  scaleComboToMegaCombo
} from './combo.types'
import './combos.css'

function handleCombo (value, onCombo) {
  let finalComboValue = value
  showComboMessage(value)
  if (isMegaComboByValue(value)) {
    finalComboValue = scaleComboToMegaCombo(value)
  }
  console.log('combo value', finalComboValue)
  onCombo(finalComboValue)
}

function launchComboSystem ({ onCombo = () => null }) {
  const incrementClick = createClicksPerSecCounter({
    onAction: (value) => handleCombo(value, onCombo),
    minToAction: SINGLE_COMBO_VALUE,
  })
  return incrementClick
}

export {
  launchComboSystem,
}
