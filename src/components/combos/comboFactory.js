import { MINIMUN_MEGACOMBO } from "./Combo"

const COMBO_CLASSNAME = 'combo'
const COMBO_TEXT = 'Combo X'
const MEGACOMBO_TEXT = 'MEGACOMBO!'
const DELAY_TO_BE_REMOVED_IN_MS = 3000
const CLASSNAMES = {
  MINI: 'mini',
  SMALL: 'small',
  NORMAL: 'normal',
  HUGE: 'huge',
  MONSTER: 'monster'
}

const wrapperCombos = document.getElementById('combos')

function createCombo (value) {
  const comboElement = document.createElement('span')
  comboElement.classList.add(COMBO_CLASSNAME)

  let className
  let text = `${COMBO_TEXT} ${value}`

  if (value === 1) {
    text = '+1'
    className = CLASSNAMES.MINI
  } else if (value === 2) {
    className = CLASSNAMES.SMALL
    text = `DOUBLE!`
  } else if (value > 2 && value < 4) {
    className = CLASSNAMES.NORMAL
    text = `TRIPLE!`
  } else if (value > 4 && value < 7) {
    className = CLASSNAMES.HUGE
  } else if (value >= MINIMUN_MEGACOMBO) {
    className = CLASSNAMES.MONSTER
    text = MEGACOMBO_TEXT
    document.body.classList.add('big-surprise')

    setTimeout(() => {
      document.body.classList.remove('big-surprise')
    }, 3000)
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
