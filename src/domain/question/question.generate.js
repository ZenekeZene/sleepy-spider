import { generateSelector } from "@/domain/selectorsCSS/selectorsCSS"
import { calculateSpecificity } from "@/domain/specificity/specificity"
import { generateOptions } from "./question.options"
import { isCorrectQuestion } from "./question.correct"

function generateQuestion() {
  const selector = generateSelector()
  const { specificity } = calculateSpecificity(selector)
  const options = generateOptions(specificity)
  const question = isCorrectQuestion({
    value: selector,
    answer: specificity,
    options,
  })
  return question
}

export {
  generateQuestion,
}
