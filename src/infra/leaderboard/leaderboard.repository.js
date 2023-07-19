import { query, collection, getDocs, orderBy, limit } from "firebase/firestore"
import {
  createLeaderboardItem as create,
} from '@/domain/leaderboard'
import { stores } from '@/adapter'
import { getInfraServices } from "@/infra/infra"

const isOfUser = (user, item) => {
  if (!user?.displayName) return false
  return user.displayName === item.displayName
}

const createUserItem = (item, value) => create({
  ...item,
  isUser: true,
  score: value,
})

function retrieveLeaderboard (querySnapshot) {
  const leaderboard = []
  querySnapshot.forEach((doc) => {
    leaderboard.push(doc.data())
  })
  return leaderboard
}

const getLeaderboardDocs = async (size) => {
  const { database } = getInfraServices()
  const leaderboardRef = collection(database, "awakenings")
  const q = query(leaderboardRef, orderBy("value", "desc"), limit(size))
  return await getDocs(q)
}

const slice = (limit) => (data) => data.slice(0, limit)
const sort = (data) => data.sort((a, b) => b.score - a.score)
const position = (data) => data.map((item, index) => ({ ...item, position: index + 1 }))

const getLeaderboard = ({ user, limit = 5 }) => {
  const awakeningStore = stores.awakening

  return getLeaderboardDocs(limit)
  .then(retrieveLeaderboard)
  .then(slice(limit))
  .then(sort)
  .then(position)
  .then(data => data.map((item) => {
    if (isOfUser(user, item)) {
      return createUserItem(item, awakeningStore.value)
    }
    return create(item)
  }))
}

export {
  getLeaderboard,
}
