import { startSleep, stopSleep } from '../sleep/sleep'

let sleepLaunched = false
let sleepTimer

const searchEyesOpen = (eyes) => {
  let areAnyEyesOpen = false
  for (const eye of eyes) {
    if (!eye.isOpen()) continue
    areAnyEyesOpen = true
    break
  }
  return areAnyEyesOpen
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
  const checkSleep = () => {
    sleepTimer = setTimeout(() => {
      handleSleep(eyes, spider)
      checkSleep()
    }, 1000)
  }
  checkSleep()
}

export default listenTheSleepCycle
