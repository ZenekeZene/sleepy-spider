import { listenEvent } from 'sleepy-spider-lib'
import { getBestScoreOfUser } from '@/infra/awakening/awakening.repository'
import { EVENTS } from '@/adapter'
import { changeAllShareLinks } from '@/ui/components/share/share'
import { updatePreviewRanking } from '@/ui/leaderboard/preview/leaderboardPreview'
import { updateSignUpRanking } from '@/ui/leaderboard/preview-signup/leaderboardPreview.signup'

async function updateRecord () {
  const { record } = await getBestScoreOfUser()
	updateSignUpRanking(record)
	changeAllShareLinks(record)
	updatePreviewRanking(record)
}

function prepareRecord () {
  listenEvent(EVENTS.END_TIMER, updateRecord)
  listenEvent(EVENTS.USER_LOGGED, updateRecord)
}

export { prepareRecord }
