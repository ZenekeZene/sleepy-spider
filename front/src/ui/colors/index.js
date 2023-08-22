import { getRoot } from 'sleepy-spider-lib'

const colors = Object.freeze({
  primary: import.meta.env.VITE_PRIMARY_COLOR,
  secondary: import.meta.env.VITE_SECONDARY_COLOR,
  tertiary: import.meta.env.VITE_TERTIARY_COLOR,
  background: import.meta.env.VITE_BACKGROUND_COLOR,
})

const updateCSSVariable = ([name, value]) => {
  getRoot().style.setProperty(`--${name}-color`, value);
}

const prepareColors = () => {
  Object.entries(colors).forEach(updateCSSVariable)
}

export { prepareColors }
