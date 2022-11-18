import { updateListenEyes } from '../../sleep/sleepControl'
import { createEyesCanvas, createEyes } from '../eye/factory/eyeFactory'
import eyeWithMouse from '../eye/eyeWithMouse'
import createSpider from '../spider/spiderFactory'

let body
let eyes = []
let eyesCanvas
let eyesContext

const onRefreshReferences = async (addAwakening, params) => {
  eyes.forEach(({ pupil }) => { pupil.disable() })
  const { context, canvas } = createEyesCanvas()
  eyesCanvas = canvas
  eyesContext = context
  await sketchEyes(params)
  updateListenEyes(eyesCanvas, eyes, spider, addAwakening)
}

const sketchEyes = async (params) => {
  eyes = await createEyes({ context: eyesContext, canvas: eyesCanvas, params })
  eyeWithMouse({ eyes, context: eyesContext, canvas: eyesCanvas, sprite: eyes[0].sprite, params })
}

const sketchSpider = async (params) => {
  const canvas = document.getElementById('body')
  const context = canvas.getContext('2d')
  body = await createSpider({ context, canvas, eyes, params })
}

const sketchSpiderWithEyes = async (params) => {
  eyesCanvas = document.getElementById('eyes')
  eyesContext = eyesCanvas.getContext('2d')
  await sketchEyes(params)
  await sketchSpider(params)
  return {
    eyes,
    body,
    eyesCanvas
  }
}

export {
  sketchSpiderWithEyes,
  onRefreshReferences,
}
