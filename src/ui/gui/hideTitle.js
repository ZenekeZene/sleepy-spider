import { delay } from '@/lib/time'
import isMobile from '@/lib/device/isMobile'

const TITLE_ID = 'title'
const HIDE_TITLE_CLASSNAME = 'title-hidden'
const HIDE_CLASSNAME = 'hide-auto'
const HIDE_TITLE_DELAY_IN_MS = 3000

const hideTitleOnFirstClick = () => {
  const title = document.getElementById(TITLE_ID)
  const hidesAuto = document.getElementsByClassName(HIDE_CLASSNAME)

  document.addEventListener('firstClick', async () => {
    if (!isMobile()) return

    await delay(HIDE_TITLE_DELAY_IN_MS)
    title.classList.add(HIDE_TITLE_CLASSNAME)

    for (var i = 0; i < hidesAuto.length; i++) {
      hidesAuto[i].classList.add('invisible')
    }
  })
}

const showTitle = () => {
  const title = document.getElementById(TITLE_ID)
  const hidesAuto = document.getElementsByClassName(HIDE_CLASSNAME)

  title.classList.remove(HIDE_TITLE_CLASSNAME)

  for (var i = 0; i < hidesAuto.length; i++) {
    hidesAuto[i].classList.remove('invisible')
  }
}

export {
  hideTitleOnFirstClick,
  showTitle,
}
