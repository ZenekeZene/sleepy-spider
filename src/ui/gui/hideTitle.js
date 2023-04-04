import { delay } from '@/lib/time'

const TITLE_ID = 'title'
const HIDE_TITLE_DELAY_IN_MS = 3000
const EVENT_NAME = 'firstClick'

function dispatchFirstClickEvent() {
  const event = new Event(EVENT_NAME)
  document.dispatchEvent(event)
}

const hideTitle = () => {
  const title = document.getElementById(TITLE_ID)
  const hidesAuto = document.getElementsByClassName('hide-auto')

  let isFirstClick = false

  document.addEventListener('click', async () => {
    if (isFirstClick) return
    isFirstClick = true
    dispatchFirstClickEvent()

    await delay(HIDE_TITLE_DELAY_IN_MS)
    title.classList.add('title-hidden')

    for (var i = 0; i < hidesAuto.length; i++) {
      hidesAuto[i].classList.add('invisible')
    }
  })
}

const showTitle = () => {
  const title = document.getElementById(TITLE_ID)
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
