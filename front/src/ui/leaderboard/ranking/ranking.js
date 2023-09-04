import { stores } from '@/adapter'
import * as Ranking from "./ranking.create"
import './ranking.css'

const showRanking = ({ players, wrapper }) => {
  wrapper.innerHTML = ''
  players.map((player) => Ranking.createItem({ ...player, wrapper }))
}

const showSkeletonRanking = ({ numPlayers, wrapper, withReset = false }) => {
  if (withReset) wrapper.innerHTML = ''
  for (let i = 0; i < numPlayers; i++) {
    Ranking.createSkeleton({ wrapper, insertMode: 'prepend' })
  }
  return Ranking.removeSkeletons
}

const prependRanking = ({ players, wrapper }) => {
  const playersReversed = [...players].reverse()
  playersReversed.map((player) => Ranking.createItem({ ...player, wrapper, insertMode: 'prepend' }))
}

const reasignPositions = ({ players, localUser }) => {
  const sortedPlayers = [...players, localUser].sort((a, b) => b.score - a.score)
  const indexOfUser = sortedPlayers.findIndex((player) => player.isUser)
  const userPosition = indexOfUser + 1
  sortedPlayers[indexOfUser].position = userPosition
  sortedPlayers.forEach((player, index) => {
    player.position = index + 1
  })
  return sortedPlayers.sort((a, b) => b.score - a.score)
}

const createLocalUser = ({ name, score }) => {
  const position = '?'
  const isUser = true
  return { name, score, position, isUser }
}

const appendUserRanking = ({ players, wrapper, score }) => {
  const { user } = stores.auth
  const localUser = createLocalUser({ name: user.displayName, score })
  const sortedPlayers = reasignPositions({ players, localUser, wrapper })
  showRanking({ players: sortedPlayers, wrapper })
}

export {
  showRanking,
  showSkeletonRanking,
  prependRanking,
  appendUserRanking,
}
