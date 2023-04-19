import { onShowQuestion } from "./question"

const expectThrowError = (fn) => {
  try {
    fn()
  } catch (error) {
    expect(error).toBeInstanceOf(Error)
  }
}

describe('Question', () => {
  describe('onShowQuestion', () => {
    it('given zero o nully questions, throw error', () => {
      expectThrowError(() => onShowQuestion())
      expectThrowError(() => onShowQuestion([]))
    })

    it('given one question, launch question', () => {
      const question = { id: 1 }
      const questions = [question]
      onShowQuestion(questions)
      expect(questions).toEqual([])
    })
  })
})
