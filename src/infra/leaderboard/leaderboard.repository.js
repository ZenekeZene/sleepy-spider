import { query, collection, getDocs, orderBy, limit } from "firebase/firestore"
import {
  createLeaderboardItem as create,
} from '@/domain/leaderboard'
import { stores } from '@/adapter'
import { getInfraServices } from "@/infra/infra"

const isOfUser = (item) => {
  const { user } = stores.auth
  if (!user?.uid) return false
  return user.uid === item.userUid
}

const createUserPlayer = (item, value) => create({
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

const parseLeader = (player) => {
  const { value } = stores.awakening
  const createLeader = isOfUser(player) ? createUserPlayer : create
  return createLeader(player, value)
}
const parseLeaders = (leaders) => leaders.map(parseLeader)

const getLeaderboard = ({ limit = 5 }) =>
  getLeaderboardDocs(limit)
  .then(retrieveLeaderboard)
  .then(slice(limit))
  .then(position)
  .then(parseLeaders)
  .then(sort)

export {
  getLeaderboard,
}
