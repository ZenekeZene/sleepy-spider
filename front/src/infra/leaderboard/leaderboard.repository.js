import {
	createLeaderboardItem as create,
} from '@/domain/leaderboard'
import { stores } from '@/adapter'
import { fakePlayers } from '@/infra/leaderboard/fake.players'
import { getAllAwakeningsWithLimit } from '@/infra/awakening/awakening.repository'

const editionId = import.meta.env.VITE_EDITION_ID

const isOfUser = (item) => {
	const { user } = stores.auth
	if (!user?.uid) return false
	return user.uid === item.userUid && editionId === item.editionId
}

const createUserPlayer = (item) => create({
	...item,
	isUser: true,
})

const slice = (limit) => (data) => data.slice(0, limit)
const sort = (data) => data.sort((a, b) => b.score - a.score)
const position = (data) => data.map((item, index) => ({ ...item, position: index + 1 }))

const parsePlayer = (player) => {
	const createLeader = isOfUser(player) ? createUserPlayer : create
	const leader = createLeader(player)
  return leader
}

const parsePlayers = (players) => players.map(parsePlayer)

const getAllPlayers = (players, limit) => {
	if (players.length === 0) return fakePlayers
	else if (players.length < limit) {
		return [...fakePlayers, ...players]
	}
	return players
}

const getPlayers = (limit) => async (players) => {
	const allPlayers = getAllPlayers(players, limit)

	return Promise.resolve(allPlayers)
		.then(parsePlayers)
    .then(sort)
		.then(position)
		.then(slice(limit))
}

const getLeaderboard = async ({ limit = 5 }) => {
	return getAllAwakeningsWithLimit(limit)
		.then(getPlayers(limit))
}

export {
	getLeaderboard
}
