import { query, collection, getDocs, limit } from "firebase/firestore"
import { parseMultiChoiceQuestion } from "./question.mapper"

const collectionName = "questionsCSS"

function sortQuestionsRandomly (questions) {
  return questions.sort(() => Math.random() - 0.5)
}

function retrieveQuestions (querySnapshot) {
  const questions = []
  querySnapshot.forEach((doc) => {
    questions.push(parseMultiChoiceQuestion(doc.data()))
  })
  return questions
}

async function getQuestionDocs (database, size) {
  const questionsRef = collection(database, collectionName)
  const q = query(questionsRef, limit(size))
  return await getDocs(q)
}

async function getQuestions ({ database, size = 40 }) {
  const querySnapshot = await getQuestionDocs(database, size)
  const questions = retrieveQuestions(querySnapshot)
  return sortQuestionsRandomly(questions)
}

export {
  getQuestions,
}
