import { classHelper as $class, listenEvent, getBody } from 'sleepy-spider-lib'
import { EVENTS } from '@/adapter'
import { getAwakeningsOfUser } from '@/infra/awakening/awakening.repository'
import { changeAllShareLinks } from '@/ui/components/share/share'
import { HIDDEN_CLASS } from '@/ui/constants'
import { updatePreviewRanking } from '@/ui/leaderboard/preview/leaderboardPreview'
import { handlePersonalLocalRecord, removePersonalLocalRecord } from './record/record'
import { getSelectors as $el } from './finalScreen.selectors'
import { AwakeningStore } from '@/adapter/stores/awakening/awakening.store'
import { AuthStore } from '@/adapter/stores/authentication.store'
import './finalScreen.css'

const { auth } = new AuthStore()
const awakeningStore = new AwakeningStore(0)

function hideElements () {
  const { elementsToHide } = $el()
  elementsToHide.forEach(element => {
    $class.add(element, HIDDEN_CLASS)
  })
}

function updateRecordAndPreviewRanking (record) {
  handlePersonalLocalRecord(record)
  updatePreviewRanking(record)
}

function updateRecordWithMaxScore () {
  getAwakeningsOfUser()
  .then(({ awakenings }) => {
    const record = Math.max(awakenings, awakeningStore.value)
    updateRecordAndPreviewRanking(record)
  })
}

function updateRecord () {
  if (auth.isLogged) {
    updateRecordWithMaxScore()
  } else {
    updateRecordAndPreviewRanking(awakeningStore.value)
  }
}

function toggleLeaderboardButton () {
  const { goToLeaderboardButton} = $el()
  const toggle = auth.isLogged ? $class.remove : $class.add
  toggle(goToLeaderboardButton, HIDDEN_CLASS)
}

function listenPlayAgainButton () {
  const { playAgainButton } = $el()
  playAgainButton.addEventListener('click', () => {
    window.location.reload()
  })
}

function showFinalScreen() {
  const { finalScreen, score } = $el()
  $class.remove(finalScreen, HIDDEN_CLASS)
  hideElements()
  score.textContent = awakeningStore.value

  changeAllShareLinks(awakeningStore.value)
  toggleLeaderboardButton()
  updateRecord()
  listenPlayAgainButton()
}

const handleEndTimer = () => {
  showFinalScreen()
  $class.remove(getBody(), 'headShakeHard')
}

function handleUserLogged () {
  removePersonalLocalRecord()
  getAwakeningsOfUser()
  .then(({ existsDocument, awakenings }) => {
    if (!existsDocument) return
    if (awakeningStore.value > awakenings) return
    updateRecordAndPreviewRanking(awakenings)
  })
}

function prepareFinalScreen () {
  listenEvent(EVENTS.USER_LOGGED, handleUserLogged)
  listenEvent(EVENTS.END_TIMER, handleEndTimer)
}

export {
  prepareFinalScreen
}
