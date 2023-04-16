import { generateQuestion } from './index'
import { generateOptions, areOptionsValid } from './question.options'

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

describe('generateOptions', () => {
  it(`given a answer, generate 4 options
    (the answer in string format and 3 similar options)`, () => {
    const answer = 1
    const options = generateOptions(answer)

    expect(options).toContain(answer.toString())
    expect(Array.isArray(options)).toBe(true)
    expect(options).toHaveLength(4)
  })

  it(`given a answer, generate 4 options with
    specificity format`, () => {
    const answer = '0111'
    const options = generateOptions(answer)

    options.forEach(option => {
      const [a, b, c, d] = option.split('')
      expect(a).toBe('0')
      expect(b).toBeDefined()
      expect(c).toBeDefined()
      expect(d).toBeDefined()
    })
  })

  describe('areOptionsValid', () => {
    it(`given an options, return true if the length is four`, () => {
      const options = ['1', '2', '3', '4']
      expect(areOptionsValid(options)).toBe(true)
    })

    it(`given an options, return false if the length is not four`, () => {
      const options = ['1', '2', '3']
      expect(areOptionsValid(options)).toBe(false)
    })
  })
})
