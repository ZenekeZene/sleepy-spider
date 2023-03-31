import { generateSelectors } from "@/domain/selectorsCSS/selectorsCSS"
import {
  calculateSpecificity,
  generateSimilarSpecificities,
} from "@/domain/specificity/specificity"

const title =  'Calculate the CSS specificity!'

function createQuestion () {
  const selector = generateSelectors()[0]
  const value = calculateSpecificity(selector).specificity
  const possibleOptions = generateSimilarSpecificities(value.toString())
  const options = possibleOptions.concat([value]).sort(() => Math.random() - 0.5)
  const question = {
    title,
    value: selector,
    answer: value,
    options,
  }
  return question
}

export {
  createQuestion,
}
