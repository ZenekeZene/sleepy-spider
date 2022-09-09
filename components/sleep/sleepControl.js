import _ from 'lodash'
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

const handleSleep = (eyes) => {
  const areAny = searchEyesOpen(eyes)
  if (areAny) {
    sleepLaunched && stopSleep()
    sleepLaunched = false
  } else {
    if (sleepLaunched) return
    sleepLaunched = true
    startSleep()
  }
}

const listenTheSleepCycle = (eyes) => {
  clearInterval(sleepTimer)
  const checkSleep = () => {
    sleepTimer = _.delay(() => {
      handleSleep(eyes)
      checkSleep()
    }, 1000)
  }
  checkSleep()
}

export default listenTheSleepCycle
