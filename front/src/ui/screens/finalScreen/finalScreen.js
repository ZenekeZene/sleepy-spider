import { classHelper as $class, listenEvent, getBody, delay } from 'sleepy-spider-lib'
import { EVENTS, stores } from '@/adapter'
import { HIDDEN_CLASS } from '@/ui/constants'
import { launchConfetti } from '@/ui/components/confetti/confetti'
import { updateRecordOfUser } from '@/infra/awakening/awakening.repository'
import { listenBuyMeCoffeeOnAvatar } from '@/ui/components/buyMeCoffee/buyMeCoffee'
import { createPreviewRanking } from '@/ui/leaderboard/preview/leaderboardPreview'
import { createSignUpRanking } from '@/ui/leaderboard/preview-signup/leaderboardPreview.signup'
import { getSelectors as $el } from './finalScreen.selectors'
import './finalScreen.css'

function hide (element) {
  $class.add(element, HIDDEN_CLASS)
}

function show (element) {
  $class.remove(element, HIDDEN_CLASS)
}

function hideElements () {
  const { elementsToHide, spider } = $el()
  elementsToHide.forEach(element => {
    hide(element)
  })
  hide(spider)
}

function toggleLeaderboardButton () {
  const { isLogged } = stores.auth
  const { goToLeaderboardButton, recordMessage } = $el()
  const toggle = isLogged ? show : hide
  toggle(goToLeaderboardButton)
  if (isLogged) return
  hide(recordMessage)
}

function reload () {
  window.location.reload()
}

function listenPlayAgainButton () {
  const { playAgainButton } = $el()
  playAgainButton.addEventListener('click', reload)
}

function disablePointerEvents () {
  $class.add(getBody(), 'no-pointer')
}

function enablePointerEvents () {
  $class.remove(getBody(), 'no-pointer')
}

function showFinalScreen() {
  const { finalScreen } = $el()
  show(finalScreen)

  disablePointerEvents()

  hideElements()
  toggleLeaderboardButton()
  listenPlayAgainButton()
  listenBuyMeCoffeeOnAvatar()

  delay(2000).then(() => {
    enablePointerEvents()
  })

  $class.remove(getBody(), 'headShakeHard')
}

const handleNewRecord = () => {
  const { newRecordMessage, recordMessage } = $el()
  show(newRecordMessage)
  hide(recordMessage)
  // launchConfetti()
}

const updateScoreText = () => {
	const awakeningStore = stores.awakening
  const { score } = $el()
	score.textContent = awakeningStore.value
}

const handleScoreOfUserNotLogged = async () => {
	updateScoreText()
	createSignUpRanking()
}

const handleScoreOfUserLogged = async () => {
	await updateRecordOfUser()
  createPreviewRanking()
	updateScoreText()
}

const handleEndTimer = async () => {
  showFinalScreen()
  stores.auth.isLogged ? handleScoreOfUserLogged() : handleScoreOfUserNotLogged()
}

function prepareFinalScreen () {
  listenEvent(EVENTS.END_TIMER, handleEndTimer)
  listenEvent(EVENTS.NEW_RECORD, handleNewRecord)
}

export { prepareFinalScreen }
