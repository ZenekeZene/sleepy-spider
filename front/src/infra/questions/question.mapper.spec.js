import { afterEach } from "vitest"
import { parseSpecificityQuestion, parseMultiChoiceQuestion } from "./question.mapper"

describe("Question Mapper", () => {
  describe('parseSpecificityQuestion', () => {
    it(`given a question, return a question with specificity type`, () => {
      expect(parseSpecificityQuestion({ question: 'question' })).toEqual({
        type: 'SPECIFICITY',
        question: { question: 'question' },
      })
    })

    it(`given a null question, return null`, () => {
      expect(parseSpecificityQuestion(null)).toBeNull()
      expect(parseSpecificityQuestion(undefined)).toBeNull()
    })
  })

  describe('parseMultiChoiceQuestion', () => {
    afterEach(() => {
       vi.restoreAllMocks()
    })

    it(`given a question, return a question with multi choice type`, () => {
      Math.random = vi.fn().mockReturnValue(0.5)
      const question = {
        'question-en': 'question',
        option1: 'option1',
        option2: 'option2',
        option3: 'option3',
        option4: 'option4',
        correct: 'option1'
      }
      expect(parseMultiChoiceQuestion(question)).toEqual({
        type: 'MULTICHOICE',
        question: {
          title: 'question',
          answer: 'option1',
          options: ['option1', 'option2', 'option3', 'option4']
        }
      })
    })
  })
})
