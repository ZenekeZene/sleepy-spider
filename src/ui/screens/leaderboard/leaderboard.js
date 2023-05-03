import { listenEvent } from "sleepy-spider-lib"
import { EVENTS } from "@/adapter/events/events"

const listenLeaderboard = () => {
  listenEvent(EVENTS.GO_TO_LEADERBOARD, () => {
    console.log('show leaderboard')
  })
}

const prepareLeaderboard = () => {
  listenLeaderboard()
}

export {
  prepareLeaderboard,
}
