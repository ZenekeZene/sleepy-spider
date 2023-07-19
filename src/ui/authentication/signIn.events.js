import { dispatchEvent } from "sleepy-spider-lib"
import { EVENTS } from "@/adapter"

const dispatchUserLogged = (user) => {
  dispatchEvent(EVENTS.USER_LOGGED, { user })
}

const dispatchUserNotLogged = () => {
  dispatchEvent(EVENTS.USER_NOT_LOGGED)
}

const dispatchGoToLeaderboard = (user) => {
  dispatchEvent(EVENTS.GO_TO_LEADERBOARD, { user })
}

export {
  dispatchUserLogged,
  dispatchUserNotLogged,
  dispatchGoToLeaderboard,
}
