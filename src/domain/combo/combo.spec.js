import { calculateCombo } from './index'

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
