const LIMIT_TO_SHOW_QUESTION =  import.meta.env.VITE_LIMIT_TO_SHOW_QUESTION || 40
const SPECIFICITY_PROBABILITY_PERCENTAGE = import.meta.env.VITE_SPECIFICITY_PROBABILITY_PERCENTAGE || 20
const CORRECT_QUESTION_VALUE = 1000
const QUESTIONS_MAX_PER_QUIZ = 20

export {
  LIMIT_TO_SHOW_QUESTION,
  SPECIFICITY_PROBABILITY_PERCENTAGE,
  CORRECT_QUESTION_VALUE,
  QUESTIONS_MAX_PER_QUIZ,
}
