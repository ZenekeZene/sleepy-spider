import {
  createLeaderboardItem as create,
} from '@/domain/leaderboard'

const isOfUser = (user, item) => user?.displayName === item.name

const createUserItem = (user, item) => create({
  ...item,
  isUser: true,
  score: user.score
})

const getLeaderboard = async ({ user, limit = 5 }) => {
  return fetch('./leaderboard.fake.json')
  .then(response => response.json())
  .then(data => {
    const sliced = data.slice(0, limit)
    const sorted = sliced.sort((a, b) => b.score - a.score)
    const withPosition = sorted.map((item, index) => ({ ...item, position: index + 1 }))
    const withUser = withPosition.map((item) => {
      if (isOfUser(user, item)) {
        return createUserItem(user, item)
      }
      return create(item)
    })
    return withUser
  })
}

export {
  getLeaderboard,
}
