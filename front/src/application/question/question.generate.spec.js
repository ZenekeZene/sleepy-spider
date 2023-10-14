import { generateQuestion } from './question.generate'

describe('generateQuestion', () => {
  it('generates a valid question', () => {
    const question = generateQuestion()
    expect(question).toBeDefined()
    expect(question.value).toBeDefined()
    expect(question.answer).toBeDefined()
    expect(question.options).toBeDefined()
    expect(question.options.length).toBeLessThanOrEqual(4)
  })

  it('generates valid options for the answer', () => {
    const question = generateQuestion()
    const { answer, options } = question
    expect(options).toContain(answer)
    expect(Array.isArray(options)).toBe(true)
    expect(options.length).toBeGreaterThan(0)
    expect(options.length).toBeLessThanOrEqual(4)
  })
})
