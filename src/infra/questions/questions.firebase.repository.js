import { sortRandomly } from "@/share"
import { query, collection, getDocs, limit } from "firebase/firestore"
import { parseMultiChoiceQuestion } from "./question.mapper"

const collectionName = "questionsCSS"

function retrieveQuestions (querySnapshot) {
  const questions = []
  querySnapshot.forEach((doc) => {
    questions.push(parseMultiChoiceQuestion(doc.data()))
  })
  return questions
}

async function getQuestionDocs (database) {
  const questionsRef = collection(database, collectionName)
  const q = query(questionsRef)
  return await getDocs(q)
}

async function getQuestions ({ database, size = 40 }) {
  try {
    const querySnapshot = await getQuestionDocs(database, size)
    const questions = retrieveQuestions(querySnapshot)
    return sortRandomly(questions).splice(0, size)
  } catch (error) {
    console.error("Error getting documents: ", error)
    throw error
  }
}

export {
  getQuestions,
}
