import {
  generateSimilarSpecificities,
} from "@/domain/specificity/specificity"

const MAX_OPTIONS = 4

function sortOptions(options) {
  return options.sort(() => Math.random() - 0.5)
}

function generateOptions(answer) {
  const answerString = answer.toString()
  const possibleOptions = generateSimilarSpecificities(answerString)
  const options = sortOptions(possibleOptions.concat([answerString]))
  return options
}

function areOptionsValid(options) {
  const rules = [
    options && options.length,
    Array.isArray(options),
    options.length === MAX_OPTIONS,
  ]
  return rules.every(Boolean)
}

export {
  generateOptions,
  areOptionsValid,
}

