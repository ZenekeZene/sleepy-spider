import { describe, test, expect } from 'vitest'
import calculateSpecificityCSS from './specificity.js'

describe('Specificity', () => {
  test.each([
    { actual: '#id .class', expected: '0110' },
    { actual: '#id', expected: '0100' },
    { actual: '.class', expected: '0010' },
    { actual: '[attribute]', expected: '0010' },
    { actual: ':pseudo-class', expected: '0010' },
    { actual: '::pseudo-element', expected: '0001' },
    { actual: 'element', expected: '0001' },
    { actual: 'img.class', expected: '0011' },
    { actual: 'img#id', expected: '0101' },
    { actual: 'img[attribute]', expected: '0011' },
    { actual: 'img:pseudo-class', expected: '0011' },
    { actual: 'img::pseudo-element', expected: '0002' },
    { actual: 'img.class#id', expected: '0111' },
    { actual: 'img.class[attribute]', expected: '0021' },
    { actual: 'img.class:pseudo-class', expected: '0021' },
    { actual: 'img#id[attribute]', expected: '0111' },
    { actual: 'img#id:pseudo-class', expected: '0111' },
    { actual: 'img#id::pseudo-element', expected: '0102' },
    { actual: 'img.class#id[attribute]:pseudo-class::pseudo-element', expected: '0132' },
    { actual: 'img.class#id[attribute]:pseudo-class > a::before:hover', expected: '0143' },
    { actual: '.\\--cool', expected: '0010' },
  ])('calculate($actual) -> $expected', ({ actual, expected }) => {
    const { specificity } = calculateSpecificityCSS(actual)
    expect(specificity).toBe(expected)
  })
})
