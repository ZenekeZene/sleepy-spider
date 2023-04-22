import { createClicksChecker } from 'clicks-checker'
import { showComboMessage } from './combo.message'
import {
  isMegaComboByValue,
  scaleComboToMegaCombo
} from '@/domain/combo'
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
  const incrementClick = createClicksChecker({
    onAction: (value) => handleCombo(value, onCombo),
    minToAction: minComboToAction,
  })
  return incrementClick
}

export {
  launchComboSystem,
}
