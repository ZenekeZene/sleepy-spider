import { startSleep, stopSleep } from '../sleep/sleep'

let sleepLaunched = false
let activeCheckSurprise = false
const spiderWrapper = document.getElementById('spider-wrapper')
const SURPRISE_CLASSNAME = 'surprise'
const CHECK_SLEEP_INTERVAL_IN_MS = 1000
const CHECK_SURVIVE_INTERVAL_IN_MS = 100

const closeEyes = (eyes) => {
  eyes.forEach((eye) => eye.close())
}

const openEyes = (eyes) => {
  eyes.forEach((eye) => eye.open())
}

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

const setChecker = (onCheck, interval = 100) => {
  setTimeout(() => {
    onCheck()
  }, interval)
}

const checkSleep = (eyes, spider) => {
  setChecker(() => {
    handleSleep(eyes, spider)
    checkSleep(eyes, spider)
  }, CHECK_SLEEP_INTERVAL_IN_MS)
}

const checkSurprise = (eyes, onSleepInterrupted) => {
  setChecker(() => {
    const areAny = searchEyesOpen(eyes)
    if (areAny) {
      applySurprise()
      !activeCheckSurprise && onSleepInterrupted()
      activeCheckSurprise = true
    } else {
      removeSurprise()
      activeCheckSurprise = false
    }
    checkSurprise(eyes, onSleepInterrupted)
  }, CHECK_SURVIVE_INTERVAL_IN_MS)
}

const checkBodyClicked = (eyes, spider, onSleepInterrupted) => {
  const handleClickOnBodyCollider = () => {
    spiderWrapper.classList.add(SURPRISE_CLASSNAME)
    applySurprise()
    onSleepInterrupted()
    stopSleep()
    openEyes(eyes)
    spider.stop()

    setTimeout(() => {
      spiderWrapper.classList.remove(SURPRISE_CLASSNAME)
      checkSurprise(eyes, onSleepInterrupted)
      closeEyes(eyes)
      spider.resume()
    }, 250)
  }

  const bodyCollider = document.getElementById('body-collider')
  bodyCollider.addEventListener('click', handleClickOnBodyCollider)
}

const listenTheSleepCycle = (eyes, spider, onSleepInterrupted) => {
  checkSleep(eyes, spider)
  checkSurprise(eyes, onSleepInterrupted)
  checkBodyClicked(eyes, spider, onSleepInterrupted)
}

export default listenTheSleepCycle
export { applySurprise, removeSurprise }
