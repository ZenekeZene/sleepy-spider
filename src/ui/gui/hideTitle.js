import { delay } from '@/lib/time'

const HIDE_TITLE_DELAY_IN_MS = 3000

const hideTitle = () => {
  const title = document.getElementById('title')
  const hidesAuto = document.getElementsByClassName('hide-auto')

  let isFirstClick = false

  document.addEventListener('click', async () => {
    if (isFirstClick) return
    isFirstClick = true

    await delay(HIDE_TITLE_DELAY_IN_MS)
    title.classList.add('title-hidden')

    for (var i = 0; i < hidesAuto.length; i++) {
      hidesAuto[i].classList.add('invisible')
    }
   })
}

const showTitle = () => {
  const title = document.getElementById('title')
  const hidesAuto = document.getElementsByClassName('hide-auto')

  title.classList.remove('title-hidden')

  for (var i = 0; i < hidesAuto.length; i++) {
    hidesAuto[i].classList.remove('invisible')
  }
}

export {
  showTitle,
  hideTitle,
}
