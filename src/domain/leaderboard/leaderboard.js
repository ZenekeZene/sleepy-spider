const createLeaderboardItemRaw = (player) => ({
  name: player.name,
  score: player.score,
})

const createLeaderboardItem = (player) => ({
  ...createLeaderboardItemRaw(player),
  position: player.position,
  isUser: player.isUser,
})

export {
  createLeaderboardItemRaw,
  createLeaderboardItem,
}
