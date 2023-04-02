const Singleton = (function() {
  let instance

  function Singleton() {
    if (instance) {
      return instance
    }
    instance = this
    this.value = 0
    this.increment = function() {
      this.value++
    }
    this.update = function(newValue) {
      this.value = newValue
    }
  }

  return Singleton
})()

export { Singleton }
