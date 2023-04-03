import generateQuestion from "@/domain/question/question"

const title =  'Calculate the CSS specificity!'

function createSpecificityQuestion () {
  const question = generateQuestion()
  const finalQuestion = {
    title,
    ...question,
  }
  return finalQuestion
}

export {
  createSpecificityQuestion,
}
