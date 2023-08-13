import { screen, fireEvent } from '@testing-library/dom'
import { initModal } from "./modal"

const getModals = () => {
  const modal = screen.getByText('Modal')
  const infoModal = screen.getByText('Info Modal')
  return { modal, infoModal }
}

const doClickOnTriggerByText = (text, { times } = { times: 1 }) => {
  const [trigger] = screen.getAllByText(text)

  Array.from({ length: times }).forEach(() => {
    fireEvent.click(trigger)
  })
}

let body = null
const stubModal = () => {
  document.body.innerHTML = `
    <div id="modal">Modal</div>
    <div id="info-modal">Info Modal</div>
    <div id="info-icon">info icon</div>
    <div class="modal-trigger">trigger</div>
    <div class="modal-trigger">trigger</div>
    <div class="info-modal-trigger">info trigger</div>
    <div class="info-modal-trigger">info trigger</div>
    <div id="modal-backdrop"></div>
    <div id="logout-success-info-modal"></div>
  `
  return document.body
}

afterEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = '<body></body>';
});

describe('Modal', () => {
  it('is not shown to user by default', () => {
    stubModal()
    initModal()

    const { infoModal } = getModals()
    expect(infoModal.classList).not.toContain(['visible'])
  })

  it('is shown to user when trigger is clicked', () => {
    body = stubModal()
    initModal()
    const { infoModal } = getModals()

    doClickOnTriggerByText('info icon')

    expect(infoModal.classList).toContain(['visible'])
  })

  it('is hidden to user when trigger is clicked twice', () => {
    body = stubModal()
    initModal()
    const { infoModal } = getModals()

    doClickOnTriggerByText('info trigger', { times: 2 })
    expect(infoModal.classList).not.toContain(['visible'])
  })
})
