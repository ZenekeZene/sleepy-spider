import { sortRandomly } from "@/share"
import { query, collection, getDocs, limit } from "firebase/firestore"
import { getInfraServices } from "@/infra/infra"
import { parseMultiChoiceQuestion } from "./question.mapper"

const collectionName = "questionsCSS"

function retrieveQuestions (querySnapshot) {
  const questions = []
  querySnapshot.forEach((doc) => {
    questions.push(parseMultiChoiceQuestion(doc.data()))
  })
  return questions
}

async function getQuestionDocs () {
  const { database } = getInfraServices()
  const questionsRef = collection(database, collectionName)
  const q = query(questionsRef)
  return await getDocs(q)
}

async function getQuestions ({ size = 40 }) {
  try {
    const querySnapshot = await getQuestionDocs(size)
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
