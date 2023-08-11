import { generateSelector } from './selectorsCSS'
import { getGenerators } from './selectorsCSS.generators'

vi.mock('./selectorsCSS.generators', async () => {
  const actual = await vi.importActual('./selectorsCSS.generators')
  return {
    ...actual,
    getGenerators: vi.fn(),
  }
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('SelectorsCSS', () => {
  it('generateSelector return a valid selector with all generators possibles', () => {
    Math.random = vi.fn().mockReturnValue(0.9)
    getGenerators.mockReturnValue([
      { name: 'id', generator: () => '#id' },
      { name: 'classname', generator: () => '.class' },
      { name: 'attribute', generator: () => '[attribute]' },
      { name: 'pseudoElement', generator: () => '::pseudo-element' },
    ])
    const selector = generateSelector()
    expect(selector).toBe('header#id.class[attribute]::pseudo-element')
  })
})
