import { findById } from "sleepy-spider-lib"

function prepareSignup () {
  const signupButton = findById('leaderboard-preview-signup')
  signupButton.addEventListener('click', () => {

  })
}

export {
  prepareSignup,
}
