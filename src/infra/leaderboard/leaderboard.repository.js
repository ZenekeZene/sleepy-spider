import {
  createLeaderboardItem as create,
} from '@/domain/leaderboard'

const isOfUser = (user, item) => user?.displayName === item.name

const createUserItem = (user, item) => create({
  ...item,
  isUser: true,
  score: user.score
})

const slice = (limit) => (data) => data.slice(0, limit)
const sort = (data) => data.sort((a, b) => b.score - a.score)
const position = (data) => data.map((item, index) => ({ ...item, position: index + 1 }))

const getLeaderboard = ({ user, limit = 5 }) => {
  return fetch('./leaderboard.fake.json')
  .then(response => response.json())
  .then(slice(limit))
  .then(sort)
  .then(position)
  .then(data => data.map((item) => {
    if (isOfUser(user, item)) {
      return createUserItem(user, item)
    }
    return create(item)
  }))
}

export {
  getLeaderboard,
}
