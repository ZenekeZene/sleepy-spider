import { classHelper as $class, TOGGLE_TYPES } from 'sleepy-spider-lib'
import { HIDDEN_CLASS } from '@/ui/constants'
import { getSignInSelectors as $el } from './signIn.selectors'

const GREETING = 'Welcome, '

const toggleLeaderboardButton = (action) => {
  $class[action]($el().leaderboardButton, HIDDEN_CLASS)
}

const showUserTitle = ({ displayName }) => {
  $class.remove($el().userTitle, HIDDEN_CLASS)
  userTitle.textContent = `${GREETING}${displayName}`
}

const toggleUserTitle = (action) => {
  $class[action]($el().userTitle, HIDDEN_CLASS)
}

const toggleTitle = (action) => {
  $class[action]($el().title, HIDDEN_CLASS)
}

export default {
  show: {
    title: toggleTitle(TOGGLE_TYPES.SHOW),
    userTitle: showUserTitle,
    leaderboardButton: toggleLeaderboardButton(TOGGLE_TYPES.SHOW),
  },
  hide: {
    title: toggleTitle(TOGGLE_TYPES.HIDE),
    userTitle: toggleUserTitle(TOGGLE_TYPES.HIDE),
    leaderboardButton: toggleLeaderboardButton(TOGGLE_TYPES.HIDE),
  }
}
