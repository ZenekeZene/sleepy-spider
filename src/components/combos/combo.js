import { createClicksPerSecCounter } from '@/modules/clicksPerSecond/clicksPerSecond'
import { showComboMessage } from './combo.message'
import {
  isMegaComboByValue,
  scaleComboToMegaCombo
} from '@/domain/combo/combo'
import './combos.css'

const minComboToAction = 1

function handleCombo (value, onCombo) {
  let finalComboValue = value
  showComboMessage(value)
  if (isMegaComboByValue(value)) {
    finalComboValue = scaleComboToMegaCombo(value)
  }
  onCombo(finalComboValue)
}

function launchComboSystem ({ onCombo = () => null }) {
  const incrementClick = createClicksPerSecCounter({
    onAction: (value) => handleCombo(value, onCombo),
    minToAction: minComboToAction,
  })
  return incrementClick
}

export {
  launchComboSystem,
}
