import {
  createLeaderboardItemRaw as createRaw,
  createLeaderboardItem as create,
} from '@/domain/leaderboard'

const fakeRankingWithScore = [
  createRaw({ name: 'Foo', score: 100 }),
  createRaw({ name: 'Bar', score: 50 }),
  createRaw({ name: 'Baz', score: 25 }),
  createRaw({ name: 'Qux', score: 10 }),
  createRaw({ name: 'Zeneke Zene', score: 9 }),
  createRaw({ name: 'Michale', score: 5 }),
  createRaw({ name: 'Corge', score: 1 }),
  createRaw({ name: 'Michale', score: 5 }),
  createRaw({ name: 'Corge', score: 1 }),
  createRaw({ name: 'Michale', score: 5 }),
  createRaw({ name: 'Corge', score: 1 }),
  createRaw({ name: 'Michale', score: 5 }),
  createRaw({ name: 'Corge', score: 1 }),
  createRaw({ name: 'Michale', score: 5 }),
  createRaw({ name: 'Corge', score: 1 }),
]

const isOfUser = (user, item) => user.displayName === item.name

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
      return item
    })
    return withUser
  })
}

export {
  getLeaderboard,
}
