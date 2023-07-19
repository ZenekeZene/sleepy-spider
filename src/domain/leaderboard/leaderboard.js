const createLeaderboardItemRaw = (player) => ({
  name: player.displayName,
  score: player.value,
})

const createLeaderboardItem = (player) => ({
  ...createLeaderboardItemRaw(player),
  position: player.position,
  isUser: player.isUser || false,
})

export {
  createLeaderboardItemRaw,
  createLeaderboardItem,
}
