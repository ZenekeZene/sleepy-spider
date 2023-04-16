import { Singleton } from './Singleton'

describe('Singleton', () => {
  const instance1 = new Singleton()
  const instance2 = new Singleton()

  it(`returns the same instance`, () => {
    expect(instance1).toBe(instance2)
  })

  it(`starts with value to zero`, () => {
    expect(instance1.value).toBe(0)
  })

  it(`given a value, 'increment' function increment the value`, () => {
    instance1.increment(5)
    expect(instance1.value).toBe(5)

    instance1.increment(5)
    expect(instance2.value).toBe(10)
  })

  it(`given a value, 'update' function update the value`, () => {
    instance1.update(3)
    expect(instance1.value).toBe(3)

    instance1.update(5)
    expect(instance2.value).toBe(5)
  })

})
