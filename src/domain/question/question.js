import { generateSelectors } from "@/domain/selectorsCSS/selectorsCSS"
import {
  calculateSpecificity,
  generateSimilarSpecificities,
} from "@/domain/specificity/specificity"

const MAX_OPTIONS = 4

function areOptionsValid(options) {
  const rules = [
    options && options.length,
    Array.isArray(options),
    options.length <= MAX_OPTIONS,
  ]
  return rules.every(Boolean)
}

function isCorrectQuestion(props) {
  if (!props) {
    throw new Error("Props are required")
  }
  const { value, answer, options } = props
  if (!value) {
    throw new Error("Value is required")
  }
  if (!answer) {
    throw new Error("Answer is required")
  }
  if (!areOptionsValid(options)) {
    throw new Error("Options are invalid")
  }

  return {
    value,
    answer,
    options,
  }
}

function sortOptions(options) {
  return options.sort(() => Math.random() - 0.5)
}

function generateOptions(answer) {
  const possibleOptions = generateSimilarSpecificities(answer.toString())
  const options = sortOptions(possibleOptions.concat([answer]))
  return options
}

function generateQuestion() {
  const selector = generateSelectors()[0]
  const { specificity } = calculateSpecificity(selector)
  const options = generateOptions(specificity)
  const question = isCorrectQuestion({
    value: selector,
    answer: specificity,
    options,
  })
  return question
}

export default generateQuestion
