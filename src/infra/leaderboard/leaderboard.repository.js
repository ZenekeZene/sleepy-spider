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
  const rankingSliced = fakeRankingWithScore.slice(0, limit)
  const rankingSorted = rankingSliced.sort((a, b) => b.score - a.score)
  const rankingWithPosition = rankingSorted.map((item, index) => ({ ...item, position: index + 1 }))
  const rankingWithUser = rankingWithPosition.map((item) => {
    if (isOfUser(user, item)) {
      return createUserItem(user, item)
    }
    return item
  })
  return rankingWithUser
}

export {
  getLeaderboard,
}
