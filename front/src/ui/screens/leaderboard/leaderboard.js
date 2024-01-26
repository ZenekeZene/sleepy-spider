import { listenEvent, classHelper as $class } from "sleepy-spider-lib"
import { getLeaderboard, getLeaderboardByOffset } from '@/infra/leaderboard/leaderboard.repository'
import { EVENTS } from "@/adapter"
import { HIDDEN_CLASS } from '@/ui/constants'
import { showRanking, showSkeletonRanking, appendRanking } from '@/ui/leaderboard/ranking/ranking'
import * as Ranking from "@/ui/leaderboard/ranking/ranking.create"
import { showPodium } from '@/ui/leaderboard/podium/podium'
import { getLeaderboardSelectors as $el } from "./leaderboard.selectors"
import './leaderboard.css'

const createPodium = (players) => {
	const { podium } = $el()
	showPodium({ players, wrapper: podium })
}

const createRanking = (players) => {
	const { ranking } = $el()
	showRanking({ players, wrapper: ranking })
}

const showLeaderboard = async ({ user, limit }) => {
	const players = await getLeaderboard({ user, limit })
	createPodium(players.slice(0, 3))
	createRanking(players.slice(3))
}

const appendLeaderboard = async ({ user, limit, offset }) => {
	const players = await getLeaderboardByOffset({ user, limit, offset });
	const { ranking } = $el();
	appendRanking({ players, wrapper: ranking });
};

const handleCloseScreen = () => {
	const { leaderboardScreen, finalScreenAvatar } = $el()
	$class.add(leaderboardScreen, HIDDEN_CLASS)
	$class.remove(finalScreenAvatar, HIDDEN_CLASS)
}

const loadMoreLeaders = () => {
	const numPlayersPerPage = 10
	const { ranking } = $el()
	let currentPage = 0
	let offset = numPlayersPerPage

	ranking.addEventListener('scroll', async () => {
		if (ranking.scrollTop + ranking.clientHeight >= ranking.scrollHeight) {
			currentPage++;
			offset = numPlayersPerPage * currentPage
			await appendLeaderboard({ user, limit: numPlayersPerPage, offset });
		}
	});
}

const handleOpenScreen = async (detail) => {
	const { leaderboardScreen, closeButton, ranking, finalScreenAvatar } = $el()
	const { user } = detail
	const removeSkeletonRanking = showSkeletonRanking({ numPlayers: 5, wrapper: ranking, withReset: true })
	Ranking.createLoading({ wrapper: ranking })
	await showLeaderboard({ user, limit: 50 })
	removeSkeletonRanking({ wrapper: ranking })
	$class.remove(leaderboardScreen, HIDDEN_CLASS)
	$class.add(finalScreenAvatar, HIDDEN_CLASS)
	closeButton.addEventListener('click', handleCloseScreen)
	// loadMoreLeaders();
}

const listenLeaderboard = () => {
	listenEvent(EVENTS.GO_TO_LEADERBOARD, async ({ detail }) => {
		await handleOpenScreen(detail)
	})
}

const prepareLeaderboard = () => {
	listenLeaderboard()
}

export {
	prepareLeaderboard,
}
