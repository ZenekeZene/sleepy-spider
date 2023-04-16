import { QUESTION_TYPES } from '@/domain/question'

const sortOptions = (options) => options.sort(() => Math.random() - 0.5)

function parseOptions (question) {
  return [
    question.option1,
    question.option2,
    question.option3,
    question.option4,
  ]
}

function parseMultiChoiceQuestion (question) {
  const title = question['question-en']
  const options = parseOptions(question)
  const sortedOptions = sortOptions(options)
  const answer = question.correct

  return {
    type: QUESTION_TYPES.MULTICHOICE,
    question: {
      title,
      answer,
      options: sortedOptions,
    },
  }
}

function parseSpecificityQuestion (question) {
  if (!question) {
    return null
  }
  return {
    type: QUESTION_TYPES.SPECIFICITY,
    question,
  }
}

export {
  parseMultiChoiceQuestion,
  parseSpecificityQuestion,
}
