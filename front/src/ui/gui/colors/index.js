import { getRoot } from 'sleepy-spider-lib'

const colors = Object.freeze({
  primary: import.meta.env.VITE_PRIMARY_COLOR || '#b95377',
  secondary: import.meta.env.VITE_SECONDARY_COLOR || '#ee9fad',
  tertiary: import.meta.env.VITE_TERTIARY_COLOR || 'pink',
  background: import.meta.env.VITE_BACKGROUND_COLOR || '#cd87a0',
  point: import.meta.env.VITE_POINT_COLOR || '#f7d4e8',
})

window.colors = colors

const updateCSSVariable = ([name, value]) => {
  getRoot().style.setProperty(`--${name}-color`, value);
}

const prepareColors = () => {
  Object.entries(colors).forEach(updateCSSVariable)
}

export { prepareColors }
