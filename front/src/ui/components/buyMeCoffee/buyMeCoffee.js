import { findById, isMobile } from 'sleepy-spider-lib'

const url = 'https://www.buymeacoffee.com/zeneke'
const MAX_TAP = 1
let tap = 0

const goToUrl = () => {
  window.open(url)
}

const handleOnMobile = () => {
  if (tap === MAX_TAP) {
    goToUrl()
    tap = 0
  }
  tap++
}

const handleClickOnAvatar = () => {
  if (isMobile()) {
    handleOnMobile()
    return
  }
  goToUrl()
}

const listenBuyMeCoffeeOnAvatar = () => {
  const avatar = findById('final-screen-avatar')
  avatar.addEventListener('click', handleClickOnAvatar)
}

export {
  listenBuyMeCoffeeOnAvatar,
}
