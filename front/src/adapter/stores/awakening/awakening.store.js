const round = (value) => Number(Math.round(value))

const AwakeningStore = (function() {
  let instance

  function AwakeningStore() {
    if (instance) {
      return instance
    }
    instance = this
    this.value = 0

    this.increment = function(newValue = 1) {
      this.value += round(newValue)
    }

    this.update = function(newValue) {
      this.value = round(newValue)
    }
  }

  return AwakeningStore
})()

export { AwakeningStore }
