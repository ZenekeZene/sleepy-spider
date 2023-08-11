import { screen } from '@testing-library/dom'
import { toggleInvisibleElements } from './toggle.invisible.elements'
import * as stubDocument  from './__mocks__/stubs'

describe('toggleInvisibleElements', () => {
  it(`when is called, the loader is hidden `, () => {
    stubDocument.regular()
    toggleInvisibleElements()

    const loader = screen.getByText('Loader')
    expect(loader.classList).toContain(['invisible'])
  })

  it(`when is called, it the loader is not found, throw error `, () => {
    stubDocument.withoutLoader()

    expect(() => toggleInvisibleElements()).toThrow()
  })

  it(`when is called, the invisible elements are shown `, () => {
    stubDocument.regular()
    toggleInvisibleElements()

    const invisibleElements = screen.getAllByText('invisible')
    invisibleElements.forEach(element => {
      expect(element.classList).not.toContain(['invisible'])
    })
  })

  it(`when is called, the transparent elements are shown with animation`, () => {
    stubDocument.regular()
    toggleInvisibleElements()

    const transparentElements = screen.getAllByText('transparent')
    transparentElements.forEach(element => {
      expect(element.classList).not.toContain(['transparent'])
      expect(element.classList).toContain(['bounceInDown'])
    })
  })

  it('when is called, if there are no elements to be toggled, throw error', () => {
    stubDocument.withoutElements()

    expect(() => toggleInvisibleElements()).toThrow()
  })
})
