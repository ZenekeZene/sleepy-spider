import { areOptionsValid } from "./question.options"

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

export {
  isCorrectQuestion,
}
