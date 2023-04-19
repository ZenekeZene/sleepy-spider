const CLASSNAMES = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  SHAKE_CORRECT: 'shakeY',
  SHAKE_INCORRECT: 'shakeX',
  VISIBLE: 'visible',
  DISABLED: 'disabled',
  get all () {
    return [
      this.CORRECT,
      this.INCORRECT,
      this.VISIBLE
    ]
  },
  get (value) {
    return value ? this.CORRECT : this.INCORRECT
  },
  getShake (value) {
    return value ? this.SHAKE_CORRECT : this.SHAKE_INCORRECT
  }
}

export {
  CLASSNAMES,
}
