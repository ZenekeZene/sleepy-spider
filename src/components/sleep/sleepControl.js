import { startSleep, stopSleep } from '../sleep/sleep'

let sleepLaunched = false
let sleepTimer
let surpriseTimer
const spiderWrapper = document.getElementById('spider-wrapper')
const SURPRISE_CLASSNAME = 'surprise'

const searchEyesOpen = (eyes) => {
  let areAnyEyesOpen = false
  for (const eye of eyes) {
    if (!eye.isOpen()) continue
    areAnyEyesOpen = true
    break
  }
  return areAnyEyesOpen
}

const applySurprise = () => {
  if (spiderWrapper.classList.contains(SURPRISE_CLASSNAME)) return
  spiderWrapper.classList.add(SURPRISE_CLASSNAME)
}

const removeSurprise = () => {
  spiderWrapper.classList.remove(SURPRISE_CLASSNAME)
}

const handleSleep = (eyes, spider) => {
  const areAny = searchEyesOpen(eyes)
  if (areAny) {
    sleepLaunched && stopSleep()
    sleepLaunched = false
    spider.resume()
  } else {
    if (sleepLaunched) return
    sleepLaunched = true
    startSleep()
    spider.stop()
  }
}

const listenTheSleepCycle = (eyes, spider) => {
  clearInterval(sleepTimer)
  clearInterval(surpriseTimer)

  const checkSleep = () => {
    sleepTimer = setTimeout(() => {
      handleSleep(eyes, spider)
      checkSleep()
    }, 1000)
  }

  const checkSurprise = () => {
    surpriseTimer = setTimeout(() => {
      const areAny = searchEyesOpen(eyes)
      areAny ? applySurprise() : removeSurprise()
      checkSurprise()
    }, 100)
  }
  checkSurprise()
  checkSleep()
}

export default listenTheSleepCycle
