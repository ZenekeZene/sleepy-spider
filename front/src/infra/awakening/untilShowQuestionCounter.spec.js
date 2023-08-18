import { untilShowQuestionCounter } from './untilShowQuestionCounter'

describe('untilShowQuestionCounter', () => {

  afterEach(() => {
    untilShowQuestionCounter.reset()
  })

  it(`starts with a value to zero`, () => {
    expect(untilShowQuestionCounter.value).toBe(0)
  })

  it(`given a value, 'increment' function increment the value`, () => {
    untilShowQuestionCounter.increment(5)
    expect(untilShowQuestionCounter.value).toBe(5)

    untilShowQuestionCounter.increment(5)
    expect(untilShowQuestionCounter.value).toBe(10)
  })

  it(`given a value, 'isLimitReachedByValue' function return
    true if the value is greater than the limit.`, () => {
    untilShowQuestionCounter.value = 5
    expect(untilShowQuestionCounter.isLimitReachedByValue(35)).toBe(true)
    expect(untilShowQuestionCounter.value).toBe(0)

    untilShowQuestionCounter.reset()

    untilShowQuestionCounter.value = 1
    expect(untilShowQuestionCounter.isLimitReachedByValue(2)).toBe(false)
    expect(untilShowQuestionCounter.value).toBe(3)
  })

})
