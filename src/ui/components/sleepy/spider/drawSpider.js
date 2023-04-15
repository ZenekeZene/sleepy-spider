import { findById } from 'sleepy-spider-lib'
import { listenTheSleepCycle } from '@/ui/components/sleep/sleepControl'
import { updateListenEyes } from '@/ui/components/sleep/sleepControl'
import { createEyesCanvas, createEyes } from '../eye/factory/eyeFactory'
import eyeWithMouse from '../eye/eyeWithMouse'
import { createSpiderBody } from './factory/spiderBodyFactory'

let body
let eyes = []
let eyesCanvas
let eyesContext

const drawSpiderEyes = async ({ params }) => {
  eyes = await createEyes({ context: eyesContext, canvas: eyesCanvas, params })
  eyeWithMouse({ eyes, context: eyesContext, canvas: eyesCanvas, sprite: eyes[0].sprite, params })
}

const onRefreshReferences = async ({ params, onInterruptedSleep = () => null }) => {
  eyes.forEach(({ pupil }) => { pupil.disable() })
  const { context, canvas } = createEyesCanvas()
  eyesCanvas = canvas
  eyesContext = context
  await drawSpiderEyes({ params })
  updateListenEyes({ eyesCanvas, eyes, body, onInterruptedSleep })
}

const drawSpiderBody = async ({ spiderImage, params }) => {
  const canvas = findById('body')
  const context = canvas.getContext('2d')
  body = await createSpiderBody({ spiderImage, context, canvas, eyes, params })
}

const drawSpider = async ({ spiderImage, params, onInterruptedSleep }) => {
  eyesCanvas = findById('eyes')
  eyesContext = eyesCanvas.getContext('2d')
  await drawSpiderEyes({ params })
  await drawSpiderBody({ spiderImage, params })
  const spider = { eyes, eyesCanvas, body, onInterruptedSleep }
  listenTheSleepCycle(spider)
  return spider
}

export {
  drawSpider,
  onRefreshReferences,
}
