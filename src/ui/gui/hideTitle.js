import { delay } from '@/lib/time'

const HIDE_TITLE_DELAY_IN_MS = 3000

const hideTitle = () => {
  const title = document.getElementById('title')
  let isFirstClick = false

  document.addEventListener('click', async () => {
    if (isFirstClick) return
    isFirstClick = true

    await delay(HIDE_TITLE_DELAY_IN_MS)
    title.classList.add('title-hidden')
   })
}

export {
  hideTitle,
}
