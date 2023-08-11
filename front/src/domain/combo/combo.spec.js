import { calculateCombo, isMegaComboById, isMegaComboByValue } from './index'

describe('calculateCombo', () => {
  it.each([
    [1, 'MINI'],
    [2, 'SMALL'],
    [3, 'NORMAL'],
    [4, 'HUGE'],
    [5, 'HUGE'],
    [6, 'HUGE'],
    [7, 'MONSTER'],
    [8, 'MONSTER'],
    [1005, 'MONSTER'],
  ])('calculateCombo returns %s for input %s', (input, expected) => {
    expect(calculateCombo(input).id).toBe(expected);
  });

  it('calculateCombo throws an error for invalid input', () => {
    expect(() => calculateCombo(0)).toThrow();
  })
})

describe('isMegaComboById', () => {
  it.each([
    ['MINI', false],
    ['SMALL', false],
    ['NORMAL', false],
    ['HUGE', false],
    ['MONSTER', true],
  ])('isMegaComboById returns %s for input %s', (input, expected) => {
    expect(isMegaComboById(input)).toBe(expected);
  });
})

describe('isMegaComboByValue', () => {
  it.each([
    [1, false],
    [2, false],
    [3, false],
    [4, false],
    [5, false],
    [6, false],
    [7, true],
    [8, true],
    [1005, true],
  ])('isMegaComboByValue returns %s for input %s', (input, expected) => {
    expect(isMegaComboByValue(input)).toBe(expected);
  });
})
