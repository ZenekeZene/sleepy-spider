import { createClicksPerSecCounter } from '../clicksPerSecond/clicksPerSecond'
import { showComboMessage } from './combo.message'
import {
  isMegaComboByValue,
  scaleComboToMegaCombo
} from '@/domain/combo/combo'
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
    minToAction: 1,
  })
  return incrementClick
}

export {
  launchComboSystem,
}
