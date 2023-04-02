import {
  getGenerators,
  generateCombinator
} from './selectorsCSS.generators'
import { htmlTags, seed } from './selectorsCSS.constants'

function generateSelector() {
  let selector = ''

  selector += htmlTags[Math.floor(Math.random() * htmlTags.length)]

  getGenerators().forEach(({ name, generator }) => {
    if (!Math.random() < seed[name]) return
    selector += generator()
  })

  selector = generateCombinator(selector)
  return selector.trim()
}


export {
  generateSelector
}
