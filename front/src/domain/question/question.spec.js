import { generateOptions, areOptionsValid } from './question.options'

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
