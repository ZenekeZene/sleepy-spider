class Singleton {
  constructor (value) {
    this.value = value

    if (typeof Singleton.instance === 'object') {
      return Singleton.instance
    }

    Singleton.instance = this
    return this
  }

  increment (value = 1) {
    this.value += value
  }

  update (value) {
    this.value = value
  }
}

export { Singleton }
