import { findById, findAllBySelector } from '@/lib'

const finalSelectors = {
  finalScreen: findById('final-screen'),
  elementsToHide: findAllBySelector('.hide-on-final-screen'),
  score: findById('final-score'),
  playAgainButton: findById('play-again'),
}

export {
  finalSelectors,
}
