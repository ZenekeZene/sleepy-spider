class Spritesheet {
  constructor (numColumns, numRows, image) {
    this.numColumns = numColumns
    this.numRows = numRows
    this.image = image
    this.width = image.width
    this.height = image.height
    this.setDimensions()
  }

  setDimensions () {
    this.frameWidth = this.width / this.numColumns
    this.frameHeight = this.height / this.numRows
  }

  get numFrames () {
    return this.numColumns * this.numRows
  }

  get length () {
    return this.numFrames - 1
  }

  getSlide (value) {
    const column = value % this.numColumns
    const row = Math.floor(value / this.numColumns)
    return { column, row }
  }
}

export {
  Spritesheet
}
