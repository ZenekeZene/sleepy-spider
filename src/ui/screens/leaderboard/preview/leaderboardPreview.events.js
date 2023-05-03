import { dispatchEvent } from "sleepy-spider-lib"
import { EVENTS } from "@/adapter/events/events"

const dispatchUserLogged = (user) => {
  dispatchEvent(EVENTS.USER_LOGGED, { user })
}

const dispatchUserNotLogged = () => {
  dispatchEvent(EVENTS.USER_NOT_LOGGED)
}

const dispatchGoToLeaderboard = () => {
  dispatchEvent(EVENTS.GO_TO_LEADERBOARD)
}

export {
  dispatchUserLogged,
  dispatchUserNotLogged,
  dispatchGoToLeaderboard,
}
