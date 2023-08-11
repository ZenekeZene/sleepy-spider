import * as localstorage from './localstorage'

describe('localstorage', () => {
  const getItemSpy = vi.spyOn(localStorage, 'getItem')
  const setItemSpy = vi.spyOn(localStorage, 'setItem')

  afterEach(() => {
    localStorage.clear()
    getItemSpy.mockClear()
    setItemSpy.mockClear()
  })

  it(`given a key existing in localStorage, 'get' function return his value `, () => {
    localStorage.setItem('foo', '"value"')

    expect(localstorage.get('foo')).toBe('value')
    expect(getItemSpy).toHaveBeenCalledWith('foo')
  })

  it(`given a key not existing in localStorage, 'get' function return null`, () => {
    localStorage.setItem('bar', '"value"')
    expect(localstorage.get('foo')).toBe(null)
  })

  it(`given a key and a value, 'set' function set the value in localStorage`, () => {
    localstorage.set('foo', 'value')
    expect(setItemSpy).toHaveBeenCalledWith('foo', '"value"')
    expect(localstorage.get('foo')).toBe('value')
  })

  it(`given a nully key, 'set' function throw an error`, () => {
    expect(() => localstorage.set(null, 'value')).toThrow()
  })

  it(`given a nully value, 'set' function throw an error`, () => {
    expect(() => localstorage.set('foo', null)).toThrow()
  })

})
