import { handlePersonalLocalRecord } from "./record"

const stubDocumentBody = () => {
  document.body.innerHTML =
    `<div>
      <span id="record-message-value"></span>
      <span id="record-message"></span>
      <span class="record-counter"></span>
      <span class="record-counter"></span>
    </div>`;
}

const getById = (id) => document.getElementById(id)
const findAllByClassName = (selector) => document.getElementsByClassName(selector)

describe("handlePersonalLocalRecord", () => {
  afterEach(() => {
    localStorage.clear()
  })

  it(`given a last score not greater than personal record,
    when handlePersonalLocalRecord is called,
    then it should not update the record`, () => {
    localStorage.setItem('record', 20)
    const lastScore = 10

    handlePersonalLocalRecord(lastScore)

    expect(localStorage.getItem('record')).toBe(20)
  })

  it(`given a last score greater than personal record,
    when handlePersonalLocalRecord is called,
    then it should update the record`, () => {
    localStorage.setItem('record', 10)
    const lastScore = 20

    handlePersonalLocalRecord(lastScore)

    expect(localStorage.getItem('record')).toBe('20')
  })

  it(`given a last score greater than local record,
    when handlePersonalLocalRecord is called,
    then it should show the record`, () => {
    stubDocumentBody()

    localStorage.setItem('record', 10)
    const lastScore = 20

    handlePersonalLocalRecord(lastScore)

    expect(getById('record-message').classList.contains('visible')).toBe(true)
    expect(findAllByClassName('record-counter')[0].textContent).toBe('20')
  })

  it(`given a last score not greater than personal record,
    when handlePersonalLocalRecord is called,
    then it should show the last score`, async () => {
    stubDocumentBody()

    localStorage.setItem('record', 20)
    const lastScore = 10

    handlePersonalLocalRecord(lastScore)

    expect(getById('record-message').classList.contains('visible')).toBe(true)
    expect(findAllByClassName('record-counter')[0].textContent).toBe('10')
  })
})
