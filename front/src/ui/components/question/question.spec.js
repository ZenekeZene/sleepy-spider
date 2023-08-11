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

    it('given two questions, remove the last one of the total of questions', () => {
      const question1 = { id: 1 }
      const question2 = { id: 2 }
      const questions = [question1, question2]
      onShowQuestion(questions)
      expect(questions).toEqual([question1])
    })
  })
})
