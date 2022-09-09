import { startSleep, stopSleep } from '../sleep/sleep'

let sleepLaunched = false

const searchEyesOpen = (eyes) => {
  let areAnyEyesOpen = false
  for (const eye of eyes) {
    if (!eye.isOpen()) continue
    areAnyEyesOpen = true
    break
  }
  return areAnyEyesOpen
}

const controlSleep = (eyes) => {
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

export default controlSleep
