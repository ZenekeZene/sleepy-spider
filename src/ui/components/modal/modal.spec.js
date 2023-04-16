import { screen, fireEvent } from '@testing-library/dom'
import { initModal } from "./modal"

const stubModal = () => {
  document.body.innerHTML = `
    <div id="modal">Modal</div>
    <div id="info-modal">Info Modal</div>
    <div class="modal-trigger">trigger</div>
    <div class="modal-trigger">trigger</div>
    <div class="info-modal-trigger">info trigger</div>
    <div class="info-modal-trigger">info trigger</div>
  `
}

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

describe('Modal', () => {
  it('is not shown to user by default', () => {
    stubModal()
    initModal()
    const { modal, infoModal } = getModals()

    expect(modal.classList).not.toContain(['visible'])
    expect(infoModal.classList).not.toContain(['visible'])
  })

  it('is shown to user when trigger is clicked', () => {
    stubModal()
    initModal()
    const { modal, infoModal } = getModals()

    doClickOnTriggerByText('trigger')
    expect(modal.classList).toContain(['visible'])

    doClickOnTriggerByText('info trigger')
    expect(infoModal.classList).toContain(['visible'])
  })

  it('is hidden to user when trigger is clicked twice', () => {
    stubModal()
    initModal()
    const { modal, infoModal } = getModals()

    doClickOnTriggerByText('trigger', { times: 2 })
    expect(modal.classList).not.toContain(['visible'])

    doClickOnTriggerByText('info trigger', { times: 2 })
    expect(infoModal.classList).not.toContain(['visible'])
  })
})
